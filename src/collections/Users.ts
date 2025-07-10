import type { CollectionConfig } from "payload"

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "ユーザー",
    plural: "ユーザー",
  },
  admin: {
    useAsTitle: "name",
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed

    // ☞ https://github.com/CrawlerCode/payload-authjs?tab=readme-ov-file#%EF%B8%8F-customize-existing-fields
    {
      name: "id",
      type: "text",
      label: "Identifier",
      admin: {
        hidden: true,
      },
    },
    {
      name: "accounts",
      type: "array",
      fields: [
        {
          name: "provider",
          type: "text",
          label: "Account Provider",
        },
      ],
    },

    {
      name: "role",
      type: "select",
      options: [
        {
          label: "管理者",
          value: "admin",
        },
        {
          label: "ユーザー",
          value: "user",
        },
      ],
      defaultValue: "user",
      required: true,
    },
  ],
}
