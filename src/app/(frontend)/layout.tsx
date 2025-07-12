import Link from "next/link"
import { FC, ReactNode } from "react"
import "./styles.css"
import Image from "next/image"
export const metadata = {
  description:
    "ビットエーメンバーによるビットエーメンバーのためのお誘い特化型社内SNS",
  title: "お誘いくん",
}

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = async (props) => {
  const { children } = props

  return (
    <html lang="ja">
      <body className="bg-gray-50 min-h-screen">
        <div className="bg-white shadow-sm border-b border-gray-200">
         <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              <Link href="/" className="flex items-center">
                <Image
                  src="/icon_hackason.png"
                  alt="ハッカソンアイコン"
                  width={80}
                  height={80}
                  className="mr-4"
                />
                <span>お誘いくん</span>
              </Link>
            </h1>
            <p className="text-gray-600">
              ビットエーメンバーによるビットエーメンバーのためのお誘い特化型社内SNS
            </p>
          </div>
        </div>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  )
}

export default Layout
