import type { CollectionConfig } from "payload"

export const MediaCollection: CollectionConfig = {
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
}
