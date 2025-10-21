import TelegramBot from 'node-telegram-bot-api'

export function startBot() {
  // Bot configuration
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ''
  const SOURCE_CHANNEL_ID = process.env.SOURCE_CHANNEL_ID || ''
  const DESTINATION_CHANNEL_IDS = process.env.DESTINATION_CHANNEL_IDS || ''

  // Validate configuration
  if (!BOT_TOKEN || !SOURCE_CHANNEL_ID || !DESTINATION_CHANNEL_IDS) {
    console.error('❌ Missing required environment variables:')
    console.error('   - TELEGRAM_BOT_TOKEN')
    console.error('   - SOURCE_CHANNEL_ID')
    console.error('   - DESTINATION_CHANNEL_IDS')
    process.exit(1)
  }

  // Parse destination channels
  const destinationChannels = DESTINATION_CHANNEL_IDS.split(',').map(id => id.trim())

  // Create bot instance
  const bot = new TelegramBot(BOT_TOKEN, { polling: true })

  console.log('✅ Telegram bot started successfully')
  console.log(`📡 Monitoring channel: ${SOURCE_CHANNEL_ID}`)
  console.log(`📤 Forwarding to ${destinationChannels.length} channel(s):`)
  destinationChannels.forEach((id, index) => {
    console.log(`   ${index + 1}. ${id}`)
  })

  // Listen for all messages (both channel posts and group messages)
  const handleMessage = async (msg: any) => {
    try {
      // Check if message is from source channel/group
      if (msg.chat.id.toString() !== SOURCE_CHANNEL_ID) {
        return
      }

      console.log(`📥 Received message from source channel/group`)
      console.log(`   Chat type: ${msg.chat.type}`)
      console.log(`   Chat ID: ${msg.chat.id}`)

      // Forward to all destination channels
      for (const destinationId of destinationChannels) {
        try {
          // Copy message to destination channel
          if (msg.text) {
            // Text message
            await bot.sendMessage(destinationId, msg.text, {
              parse_mode: msg.entities ? 'HTML' : undefined,
            })
          } else if (msg.photo) {
            // Photo message
            const photo = msg.photo[msg.photo.length - 1] // Get highest quality
            await bot.sendPhoto(destinationId, photo.file_id, {
              caption: msg.caption || '',
            })
          } else if (msg.video) {
            // Video message
            await bot.sendVideo(destinationId, msg.video.file_id, {
              caption: msg.caption || '',
            })
          } else if (msg.document) {
            // Document message
            await bot.sendDocument(destinationId, msg.document.file_id, {
              caption: msg.caption || '',
            })
          } else if (msg.audio) {
            // Audio message
            await bot.sendAudio(destinationId, msg.audio.file_id, {
              caption: msg.caption || '',
            })
          } else if (msg.voice) {
            // Voice message
            await bot.sendVoice(destinationId, msg.voice.file_id, {
              caption: msg.caption || '',
            })
          } else if (msg.sticker) {
            // Sticker
            await bot.sendSticker(destinationId, msg.sticker.file_id)
          }
          console.log(`✅ Forwarded to ${destinationId}`)
        } catch (error) {
          console.error(`❌ Error forwarding to ${destinationId}:`, error)
        }
      }
    } catch (error) {
      console.error('❌ Error forwarding message:', error)
    }
  }

  // Listen to both channel posts and group messages
  bot.on('channel_post', handleMessage)
  bot.on('message', handleMessage)

  // Handle polling errors
  bot.on('polling_error', (error) => {
    console.error('❌ Polling error:', error)
  })

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n👋 Shutting down bot...')
    bot.stopPolling()
    process.exit(0)
  })

  return bot
}
