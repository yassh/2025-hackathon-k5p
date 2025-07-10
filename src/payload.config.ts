// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres"
import { payloadCloudPlugin } from "@payloadcms/payload-cloud"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob"
import { ja } from "@payloadcms/translations/languages/ja"
import path from "path"
import { buildConfig } from "payload"
import { authjsPlugin } from "payload-authjs"
import sharp from "sharp"
import { fileURLToPath } from "url"
import { authConfig } from "./auth.config"
import { InvitationsCollection } from "./collections/InvitationsCollection"
import { MediaCollection } from "./collections/MediaCollection"
import { UsersCollection } from "./collections/UsersCollection"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  i18n: {
    supportedLanguages: { ja },
  },
  admin: {
    user: UsersCollection.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    dateFormat: "yyyy-MM-dd HH:mm",
  },
  collections: [InvitationsCollection, MediaCollection, UsersCollection],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),

    authjsPlugin({
      authjsConfig: authConfig,
    }),

    // ☞ https://payloadcms.com/docs/upload/storage-adapters#vercel-blob-storage
    vercelBlobStorage({
      enabled: process.env.VERCEL_BLOB_ENABLED === "true",
      collections: {
        [MediaCollection.slug]: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
