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
      <div className="text-center py-12">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            ログインが必要です
          </h2>
          <p className="text-gray-600 mb-6">
            お誘いくんを利用するには、ログインしてください。
          </p>
          <Link
            href="/admin/login?redirect=/invitations"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            ログイン
          </Link>
        </div>
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
