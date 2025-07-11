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
            href="/admin/login?redirect=/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            ログイン
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {user.name}さん、こんにちは！
        </h2>
        <p className="text-gray-600">今日はどんなお誘いがありますか？</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/invitations"
          className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            お誘い一覧
          </h3>
          <p className="text-gray-600 text-sm">
            みんなのお誘いを見て、参加してみよう！
          </p>
        </Link>

        <Link
          href="/admin"
          className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-green-500"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">管理画面</h3>
          <p className="text-gray-600 text-sm">お誘いの投稿や管理を行えます</p>
        </Link>

        <Link
          href="/admin/logout"
          className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-red-500"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            ログアウト
          </h3>
          <p className="text-gray-600 text-sm">ログアウトします</p>
        </Link>
      </div>
    </div>
  )
}

export default Page
