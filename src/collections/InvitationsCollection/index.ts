import type { CollectionConfig } from "payload"
import { MediaCollection } from "../MediaCollection"
import { UsersCollection } from "../UsersCollection"

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
      name: "deadline",
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
  },
} as const satisfies CollectionConfig
