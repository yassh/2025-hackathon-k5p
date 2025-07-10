import type { CollectionConfig } from "payload"

export const MediaCollection = {
  slug: "media",
  labels: {
    singular: "メディア",
    plural: "メディア",
  },
  access: {
    read: () => true,
  },
  fields: [],
  upload: true,
} as const satisfies CollectionConfig
