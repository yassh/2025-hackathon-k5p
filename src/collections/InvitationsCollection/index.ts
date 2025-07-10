import type { CollectionConfig } from "payload"

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
      type: "text",
      label: "タイトル",
      required: true,
    },
    {
      name: "message",
      type: "textarea",
      label: "メッセージ",
      required: true,
    },
    {
      name: "startDate",
      type: "date",
      label: "開始日時",
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
      type: "date",
      label: "終了日時",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
          displayFormat: "yyyy年MM月dd日 HH:mm",
        },
      },
    },
    {
      name: "maxParticipants",
      type: "number",
      label: "上限人数",
      min: 1,
      admin: {
        description: "設定しないと無制限になります。",
      },
    },
    {
      name: "deadline",
      type: "date",
      label: "締切日時",
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
      type: "relationship",
      relationTo: "users",
      label: "参加者",
      hasMany: true,
    },
    {
      name: "createdBy",
      type: "relationship",
      relationTo: "users",
      label: "作成者",
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
