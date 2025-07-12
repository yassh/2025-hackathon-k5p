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
    <section className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* 画像部分 */}
        <div className="flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt=""
            className="w-full md:w-48 h-48 object-cover rounded-lg"
          />
        </div>

        {/* コンテンツ部分 */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {invitation.title}
          </h3>
          <p className="text-gray-700 mb-4 line-clamp-3">
            {invitation.message}
          </p>

          {/* 詳細情報 */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <svg
                className="w-4 h-4 mr-2 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium">日時：</span>
              <span className="ml-1">
                {format(new Date(invitation.startDate), "yyyy年MM月dd日 HH:mm")}
                {invitation.endDate &&
                  ` 〜 ${format(new Date(invitation.endDate), "yyyy年MM月dd日 HH:mm")}`}
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <svg
                className="w-4 h-4 mr-2 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium">締切：</span>
              <span className="ml-1">
                {invitation.closingDate
                  ? format(
                      new Date(invitation.closingDate),
                      "yyyy年MM月dd日 HH:mm",
                    )
                  : "なし"}
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <svg
                className="w-4 h-4 mr-2 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="font-medium">上限人数：</span>
              <span className="ml-1">
                {invitation.maxParticipants
                  ? `${invitation.maxParticipants}人`
                  : "無制限"}
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <svg
                className="w-4 h-4 mr-2 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
              <span className="font-medium">参加者数：</span>
              <span className="ml-1">
                {invitation.participants ? invitation.participants.length : 0}人
              </span>
            </div>
          </div>

          {/* 参加ボタン */}
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {/* TODO: クリックイベントハンドラ実装 */}
              参加
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
