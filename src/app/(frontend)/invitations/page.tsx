import configPromise from "@payload-config"
import { headers as getHeaders } from "next/headers.js"
import Image from "next/image"
import Link from "next/link"
import { getPayload } from "payload"
import { FC } from "react"
import { InvitationCard } from "./_components/InvitationCard"

const Page: FC = async () => {
  const payloadConfig = await configPromise
  const payload = await getPayload({ config: payloadConfig })

  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
          <div className="flex items-center justify-center mb-4">

            <h2 className="text-2xl font-semibold text-gray-900">
              ログインが必要です
            </h2>
          </div>
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center mb-2">
              <h2 className="text-3xl font-bold text-gray-900">お誘い一覧</h2>
            </div>
            <p className="text-gray-600">
              気になるお誘いを見つけて、参加してみましょう！
            </p>
          </div>
          <Link
            href="/admin/collections/invitations/create"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            お誘いを投稿する
          </Link>
        </div>

        {/* 一覧リスト */}
        <div className="space-y-0">
          {invitations.docs.length > 0 ? (
            invitations.docs.map((invitation) => (
              <InvitationCard
                key={invitation.id}
                user={user}
                invitation={invitation}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-md p-8">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  まだお誘いがありません
                </h3>
                <p className="text-gray-600">
                  新しいお誘いが投稿されるのをお待ちください。
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page