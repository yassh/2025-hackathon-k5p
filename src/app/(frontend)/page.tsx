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
        <Link href="/admin/login?redirect=/">ログイン</Link>
        してください。
      </div>
    )
  }

  return (
    <div>
      <div>{user.name}さん、こんにちは！</div>
      <ul>
        <li>
          <Link href="/invitations">お誘い一覧画面</Link>
        </li>
        <li>
          <Link href="/admin">管理画面</Link>
        </li>
        <li>
          <Link href="/admin/logout">ログアウト</Link>
        </li>
      </ul>
    </div>
  )
}

export default Page
