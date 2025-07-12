import { google } from 'googleapis'

type CalendarEvent = {
  title: string
  description: string
  startDate: string
  endDate?: string
  location?: string
}

type CreateCalendarEventParams = {
  accessToken: string
  refreshToken: string
  event: CalendarEvent
}

/**
 * Google Calendar にイベントを作成します
 */
export const createCalendarEvent = async (params: CreateCalendarEventParams) => {
  const { accessToken, refreshToken, event } = params

  try {
    // OAuth2 クライアントを設定
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    )

    // トークンを設定
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    })

    // Calendar API クライアントを作成
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

    // カレンダーイベントのデータを準備
    const calendarEvent = {
      summary: event.title,
      description: event.description,
      start: {
        dateTime: event.startDate,
        timeZone: 'Asia/Tokyo',
      },
      end: {
        dateTime: event.endDate || event.startDate,
        timeZone: 'Asia/Tokyo',
      },
      location: event.location,
    }

    // イベントを作成
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: calendarEvent,
    })

    return {
      success: true,
      eventId: response.data.id,
      eventUrl: response.data.htmlLink,
    }
  } catch (error) {
    console.error('Google Calendar API Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * ユーザーのGoogle OAuth トークンを取得します
 * NextAuth は OAuth トークンを別のテーブルに保存するため、
 * データベースから直接取得する必要があります
 */
export const getUserGoogleTokens = async (userId: string) => {
  try {
    // Payload CMS から User を取得
    const { default: payload } = await import('payload')
    
    const user = await payload.findByID({
      collection: 'users',
      id: userId,
    })

    if (!user || !user.accounts) {
      console.log('User not found or no accounts:', userId)
      return null
    }

    // Google アカウントを探す
    const googleAccount = user.accounts.find(
      (account: any) => account.provider === 'google'
    )

    if (!googleAccount) {
      console.log('Google account not found for user:', userId)
      return null
    }

    // NextAuth の Account テーブルから OAuth トークンを取得
    // Payload CMS のデータベースコネクションを使用
    const db = payload.db
    
    if ('drizzle' in db) {
      // Drizzle ORM の場合
      console.log('Using Drizzle ORM to access accounts table')
      
      // ここでは、実際の accounts テーブルのスキーマが必要です
      // 現在の実装では、NextAuth の accounts テーブルのスキーマが利用可能ではありません
      console.log('Account schema not available in current implementation')
      return null
    } else {
      // 生の PostgreSQL クエリを使用
      console.log('Using raw PostgreSQL query to access accounts table')
      
      try {
        // NextAuth の accounts テーブルから OAuth トークンを取得
        const accountQuery = `
          SELECT access_token, refresh_token, expires_at 
          FROM accounts 
          WHERE user_id = $1 AND provider = $2
        `
        
        // 実際の実装では、payload.db のクエリメソッドを使用する必要があります
        // この例では、コンセプトを示すために疑似コードを使用しています
        console.log('Would execute query:', accountQuery)
        console.log('With parameters:', [userId, 'google'])
        
        // 現在の実装では、実際のデータベースクエリを実行できません
        // 本番環境では、適切なデータベースアクセス方法を実装してください
        return null
      } catch (dbError) {
        console.error('Database query error:', dbError)
        return null
      }
    }
  } catch (error) {
    console.error('Error getting Google tokens:', error)
    return null
  }
}