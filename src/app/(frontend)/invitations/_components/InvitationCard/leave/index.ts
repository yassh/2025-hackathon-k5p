"use server"

import { InvitationsCollection } from "@/collections/InvitationsCollection"
import { Invitation, User } from "@/payload-types"
import config from "@payload-config"
import { getPayload } from "payload"

type Props = {
  invitation: Invitation
  userId: User["id"]
}

export const leave = async (props: Props) => {
  const { invitation, userId } = props

  const payload = await getPayload({ config })

  const newInvitation = await payload.update({
    collection: InvitationsCollection.slug,
    id: invitation.id,
    data: {
      participants:
        invitation.participants &&
        invitation.participants.filter((participant) => {
          const participantId =
            typeof participant === "string" ? participant : participant.id

          return participantId !== userId
        }),
    },
  })

  return newInvitation
}
