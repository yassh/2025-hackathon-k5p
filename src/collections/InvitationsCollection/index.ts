import type { CollectionConfig } from "payload"
import { MediaCollection } from "../MediaCollection"
import { UsersCollection } from "../UsersCollection"
import { createGoogleCalendarEvent } from "../../services/google-calendar"
import { auth } from "../../auth"

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
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req, data }) => {
      if (!req.user) {
        return false
      }

      if (req.user.role === "admin") {
        return true
      }

      return req.user.id === data?.createdBy
    },
    delete: ({ req, data }) => {
      if (!req.user) {
        return false
      }

      if (req.user.role === "admin") {
        return true
      }

      return req.user.id === data?.createdBy
    },
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
    afterChange: [
      async ({ operation, doc, req }) => {
        if (operation === "create") {
          // Alexa通知の処理（既存）
          if (process.env.ALEXA_SPEECH_API_URL && process.env.ALEXA_SPEECH_API_KEY) {
            const message = `${doc.title}のお誘いです。${doc.message}`

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
              console.error("Alexa API Error:", responseData)
            }
          }

          // Google Calendar連携の処理（新規）
          try {
            if (req.user && req.user.accounts?.length > 0) {
              // Google アカウントのアクセストークンを取得
              const googleAccount = req.user.accounts.find(account => account.provider === "google")
              
              if (googleAccount && googleAccount.access_token) {
                await createGoogleCalendarEvent(
                  {
                    title: doc.title,
                    message: doc.message,
                    startDate: doc.startDate,
                    endDate: doc.endDate,
                    createdBy: doc.createdBy,
                  },
                  googleAccount
                )
                console.log("Google Calendar event created successfully")
              } else {
                console.log("Google account or access token not found for user")
              }
            }
          } catch (error) {
            console.error("Error creating Google Calendar event:", error)
          }
        }
      },
    ],
  },
} as const satisfies CollectionConfig
