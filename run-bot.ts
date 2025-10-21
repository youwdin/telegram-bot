import { config } from 'dotenv'
import { resolve } from 'path'
import { startBot } from './server/telegram-bot.js'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.development') })

console.log('🤖 Telegram Signal Forwarder Bot')
console.log('================================')

// Start the bot
startBot()
