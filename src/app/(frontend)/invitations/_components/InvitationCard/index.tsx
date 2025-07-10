import { Invitation } from "@/payload-types"
import { format } from "date-fns"
import { FC } from "react"

type Props = {
  invitation: Invitation
}

export const InvitationCard: FC<Props> = (props) => {
  const { invitation } = props

  const imageSrc =
    (invitation.image &&
      typeof invitation.image === "object" &&
      invitation.image.url) ||
    (invitation.createdBy &&
      typeof invitation.createdBy === "object" &&
      invitation.createdBy.image) ||
    "/default-invitation-image.png" // TODO: default-invitation-image.png を用意する

  return (
    <section>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageSrc} alt="" />
      <h3>{invitation.title}</h3>
      <p>{invitation.message}</p>
      <div>
        日時：
        {format(new Date(invitation.startDate), "yyyy年MM月dd日 HH:mm")}
        {invitation.endDate &&
          ` 〜 ${format(new Date(invitation.endDate), "yyyy年MM月dd日 HH:mm")}`}
      </div>
      <div>
        締切：
        {invitation.deadline
          ? format(new Date(invitation.deadline), "yyyy年MM月dd日 HH:mm")
          : "なし"}
      </div>
      <div>
        上限人数：
        {invitation.maxParticipants
          ? `${invitation.maxParticipants}人`
          : "無制限"}
      </div>
      <div>
        <button type="button">
          {/* TODO: クリックイベントハンドラ実装 */}
          参加
        </button>
      </div>
    </section>
  )
}
