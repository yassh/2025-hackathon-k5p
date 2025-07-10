// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres"
import { payloadCloudPlugin } from "@payloadcms/payload-cloud"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { ja } from "@payloadcms/translations/languages/ja"
import path from "path"
import { buildConfig } from "payload"
import { authjsPlugin } from "payload-authjs"
import sharp from "sharp"
import { fileURLToPath } from "url"
import { authConfig } from "./auth.config"
import { Media } from "./collections/Media"
import { Users } from "./collections/Users"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  i18n: {
    supportedLanguages: { ja },
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    dateFormat: "yyyy-MM-dd HH:mm",
  },
  collections: [Users, Media],
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
  ],
})
