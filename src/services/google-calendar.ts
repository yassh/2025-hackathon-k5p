import { google } from "googleapis"
import type { User } from "@/payload-types"

type CalendarEvent = {
  title: string
  message: string
  startDate: string
  endDate?: string
  createdBy: User
}

type GoogleAccount = {
  provider: string
  access_token: string
  refresh_token?: string
  expires_at?: number
}

const createGoogleCalendarEvent = async (
  event: CalendarEvent,
  googleAccount: GoogleAccount
): Promise<void> => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    )

    oauth2Client.setCredentials({
      access_token: googleAccount.access_token,
      refresh_token: googleAccount.refresh_token,
    })

    // トークンの期限切れをチェックし、必要に応じて更新
    if (googleAccount.expires_at && Date.now() >= googleAccount.expires_at * 1000) {
      try {
        const { credentials } = await oauth2Client.refreshAccessToken()
        oauth2Client.setCredentials(credentials)
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError)
        throw new Error("Google Calendar access token has expired and could not be refreshed")
      }
    }

    const calendar = google.calendar({ version: "v3", auth: oauth2Client })

    const calendarEvent = {
      summary: event.title,
      description: event.message,
      start: {
        dateTime: new Date(event.startDate).toISOString(),
        timeZone: "Asia/Tokyo",
      },
      end: {
        dateTime: event.endDate
          ? new Date(event.endDate).toISOString()
          : new Date(new Date(event.startDate).getTime() + 60 * 60 * 1000).toISOString(), // 1時間後をデフォルトに設定
        timeZone: "Asia/Tokyo",
      },
    }

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: calendarEvent,
    })

    console.log("Google Calendar event created:", response.data.htmlLink)
  } catch (error) {
    console.error("Error creating Google Calendar event:", error)
    // エラーを再スローせず、ログに記録するのみ（他の処理を止めないため）
    // throw error
  }
}

export { createGoogleCalendarEvent }