import type { Access, CollectionConfig } from "payload"
import { MediaCollection } from "../MediaCollection"
import { UsersCollection } from "../UsersCollection"
import { createCalendarEvent, getUserGoogleTokens } from "../../utils/google-calendar"

const allowIfCreateByMe: Access = ({ req }) => {
  if (!req.user) {
    return false
  }

  if (req.user.role === "admin") {
    return true
  }

  return {
    createdBy: {
      equals: req.user.id,
    },
  }
}

export const InvitationsCollection = {
  slug: "invitations",
  labels: {
    singular: "お誘い",
    plural: "お誘い",
  },
  admin: {
    useAsTitle: "title",
  },
  access: {
    create: ({ req }) => Boolean(req.user),

    // 自分の作ったお誘いのみ閲覧・更新・削除可能にする
    read: allowIfCreateByMe,
    update: allowIfCreateByMe,
    delete: allowIfCreateByMe,
  },
  fields: [
    {
      name: "title",
      label: "タイトル",
      type: "text",
      required: true,
    },
    {
      name: "message",
      label: "メッセージ",
      type: "textarea",
      required: true,
    },
    {
      name: "image",
      label: "画像",
      type: "upload",
      relationTo: MediaCollection.slug,
    },
    {
      name: "startDate",
      label: "開始日時",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
          displayFormat: "yyyy年MM月dd日 HH:mm",
        },
      },
    },
    {
      name: "endDate",
      label: "終了日時",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
          displayFormat: "yyyy年MM月dd日 HH:mm",
        },
      },
    },
    {
      name: "maxParticipants",
      label: "上限人数",
      type: "number",
      min: 1,
      admin: {
        description: "設定しないと無制限になります。",
      },
    },
    {
      name: "closingDate",
      label: "締切日時",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
          displayFormat: "yyyy年MM月dd日 HH:mm",
        },
      },
    },
    {
      name: "participants",
      label: "参加者",
      type: "relationship",
      relationTo: UsersCollection.slug,
      hasMany: true,
    },
    {
      name: "createdBy",
      label: "作成者",
      type: "relationship",
      relationTo: UsersCollection.slug,
      required: true,
      admin: {
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === "create") {
          if (req.user) {
            data.createdBy = req.user.id
          }
        }
        return data
      },
    ],
    // 👇 ここから下を修正
    afterChange: [
      async ({ operation, doc }) => {
        if (
          operation === "create" &&
          process.env.ALEXA_SPEECH_API_URL &&
          process.env.ALEXA_SPEECH_API_KEY
        ) {
          /**
           * ISO形式の日時文字列（UTC）を日本時間（JST）の読み上げ形式に変換します。
           * @param isoString - `2024-01-01T15:00:00.000Z` のようなUTCの日時文字列
           * @returns `2025年1月2日 0時0分` のようなJSTの文字列
           */
          const formatToJSTSpeech = (isoString?: string): string => {
            if (!isoString) {
              return "未定"
            }
            // 元のUTC日時から9時間後のタイムスタンプを計算
            const jstDate = new Date(
              new Date(isoString).getTime() + 9 * 60 * 60 * 1000,
            )

            // UTCメソッドを使ってJSTの日時を取得
            const year = jstDate.getUTCFullYear()
            const month = jstDate.getUTCMonth() + 1
            const day = jstDate.getUTCDate()
            const hours = jstDate.getUTCHours()
            const minutes = jstDate.getUTCMinutes()

            return `${year}年${month}月${day}日 ${hours}時${minutes}分`
          }

          // 各日時をJSTに変換
          const startDateJST = formatToJSTSpeech(doc.startDate)
          const pause = `<break time="700ms"/>`

          const message = `予定が作成されました。${pause}${doc.title}のお誘いです${pause}${doc.message}${pause}日時は${startDateJST}です。参加お待ちしてます。`

          const response = await fetch(process.env.ALEXA_SPEECH_API_URL, {
            method: "POST",
            headers: {
              "X-API-KEY": process.env.ALEXA_SPEECH_API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
          })

          if (!response.ok) {
            const responseData = await response.json()
            console.error("Error:", responseData)
          }
        }

        // Google Calendar 連携
        if (operation === "create" && doc.createdBy && doc.startDate) {
          try {
            console.log('Creating Google Calendar event for invitation:', doc.id)
            
            // 作成者のGoogle OAuth トークンを取得
            const tokens = await getUserGoogleTokens(doc.createdBy)
            
            if (tokens && tokens.accessToken && tokens.refreshToken) {
              const calendarEvent = {
                title: doc.title,
                description: doc.message,
                startDate: doc.startDate,
                endDate: doc.endDate || doc.startDate,
              }

              const result = await createCalendarEvent({
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                event: calendarEvent,
              })

              if (result.success) {
                console.log('Google Calendar event created successfully:', result.eventId)
              } else {
                console.error('Failed to create Google Calendar event:', result.error)
              }
            } else {
              console.log('Google OAuth tokens not available for user:', doc.createdBy)
              console.log('User may not have connected their Google account or tokens may be expired')
            }
          } catch (error) {
            console.error('Error creating Google Calendar event:', error)
          }
        }
      },
    ],
    // 👆 ここまでを修正
  },
} as const satisfies CollectionConfig
