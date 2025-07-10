import configPromise from "@payload-config"
import { headers as getHeaders } from "next/headers.js"
import Link from "next/link"
import { getPayload } from "payload"
import { FC } from "react"

const Page: FC = async () => {
  const payloadConfig = await configPromise
  const payload = await getPayload({ config: payloadConfig })

  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  if (!user) {
    return (
      <div>
        <Link href="/admin/login?redirect=/invitations">ログイン</Link>
        してください。
      </div>
    )
  }

  const invitations = await payload.find({
    collection: "invitations",
  })

  return (
    <>
      <h2>イベント一覧</h2>

      <ul>
        {invitations.docs.map((invitation) => (
          <li key={invitation.id}>{invitation.title}</li>
        ))}
      </ul>
    </>
  )
}

export default Page
