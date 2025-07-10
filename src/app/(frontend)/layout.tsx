import { FC, ReactNode } from "react"
import "./styles.css"

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
      <body>
        <h1>お誘いくん</h1>
        <p>
          ビットエーメンバーによるビットエーメンバーのためのお誘い特化型社内SNS
        </p>
        <main>{children}</main>
      </body>
    </html>
  )
}

export default Layout
