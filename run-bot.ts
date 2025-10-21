import { config } from 'dotenv'
import { resolve } from 'path'
import { startBot } from './server/telegram-bot.js'

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === 'production'
  ? '.env.production'
  : '.env.development'

config({ path: resolve(process.cwd(), envFile) })

console.log('🤖 Telegram Signal Forwarder Bot')
console.log('================================')
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)

// Start the bot
startBot()
