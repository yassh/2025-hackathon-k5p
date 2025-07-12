"use client"

import { Invitation, User } from "@/payload-types"
import { format, isSameDay } from "date-fns"
import { FC, useState } from "react"
import { join } from "./join"
import { leave } from "./leave"

type Props = {
  user: User
  invitation: Invitation
}

export const InvitationCard: FC<Props> = (props) => {
  const { invitation: initialInvitation, user } = props
  const [invitation, setInvitation] = useState(initialInvitation)
  const [isRequesting, setIsRequesting] = useState(false)

  const handleClickJoinButton = async () => {
    setIsRequesting(true)
    try {
      const newInvitation = await join({ invitation, userId: user.id })
      setInvitation(newInvitation)

      alert(`「${invitation.title}」に参加しました！`)
    } catch {
      alert(`「${invitation.title}」への参加が失敗しました。`)
    } finally {
      setIsRequesting(false)
    }
  }

  const handleClickLeaveButton = async () => {
    setIsRequesting(true)
    try {
      const newInvitation = await leave({ invitation, userId: user.id })
      setInvitation(newInvitation)

      alert(`「${invitation.title}」への参加を取り消しました。`)
    } catch {
      alert(`「${invitation.title}」への参加の取り消しが失敗しました。`)
    } finally {
      setIsRequesting(false)
    }
  }

  const imageSrc =
    (invitation.image &&
      typeof invitation.image === "object" &&
      invitation.image.url) ||
    "/icon_hackason.png"

  const isJoined = Boolean(
    invitation.participants &&
      invitation.participants.some((participant) => {
        if (typeof participant === "string") {
          return participant === user.id
        }
        return participant.id === user.id
      }),
  )

  const isHost = Boolean(
    invitation.createdBy &&
      (typeof invitation.createdBy === "string"
        ? invitation.createdBy === user.id
        : invitation.createdBy.id === user.id),
  )

  // 募集締切を過ぎているかどうかを判定
  const isClosed =
    invitation.closingDate && new Date(invitation.closingDate) < new Date();

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
          <p className="text-gray-700 mb-4 whitespace-pre-wrap">
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
                  ` 〜 ${
                    isSameDay(
                      new Date(invitation.startDate),
                      new Date(invitation.endDate),
                    )
                      ? format(new Date(invitation.endDate), "HH:mm")
                      : format(
                          new Date(invitation.endDate),
                          "yyyy年MM月dd日 HH:mm",
                        )
                  }`}
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
              {isClosed && (
                <span className="ml-2 px-2 py-0.5 rounded bg-gray-300 text-gray-700 text-xs font-semibold">募集締切</span>
              )}
            </div>
            {/* ...existing code... */}
          </div>

          <div className="flex justify-end">
            {isHost ? (
              <div className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium">
                自分が主催者
              </div>
            ) : (
              <button
                type="button"
                onClick={
                  isJoined ? handleClickLeaveButton : handleClickJoinButton
                }
                disabled={Boolean(isRequesting || isClosed)}
                className={`px-6 py-2 rounded-lg transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed
                            ${
                              isJoined
                                ? "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
                                : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
                            }`}
              >
                {isClosed
                  ? "募集締切"
                  : isJoined
                  ? "参加取り消し"
                  : "参加"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
