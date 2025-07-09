import type { CollectionConfig } from "payload"

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
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
