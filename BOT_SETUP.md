# Telegram Signal Forwarder Bot Setup Guide

This bot monitors a source Telegram channel and automatically copies/forwards all messages to a destination channel.

## Prerequisites

✅ Bot already created (@Zusfx_bot)
✅ Bot token obtained: `8390132425:AAGd5qqhtr_EeRYRWxPxI5dCuIlvJzQ18iU`

## Setup Steps

### 1. Get Channel IDs

You need the channel IDs for both your source and destination channels.

**Method 1: Using Web Telegram**
1. Open https://web.telegram.org
2. Go to your channel
3. Look at the URL, it will be like: `https://web.telegram.org/k/#-1001234567890`
4. The number after `#` is your channel ID (including the minus sign)

**Method 2: Using @RawDataBot**
1. Add @RawDataBot to your channel
2. Send any message to the channel
3. The bot will reply with channel information including the ID
4. Remove the bot after getting the ID

**Method 3: Using the bot itself**
1. Add your bot (@Zusfx_bot) as admin to your channel
2. Send a message to the channel
3. Go to: `https://api.telegram.org/bot8390132425:AAGd5qqhtr_EeRYRWxPxI5dCuIlvJzQ18iU/getUpdates`
4. Look for `"chat":{"id":-1001234567890}` in the JSON response

### 2. Configure Environment Variables

Edit `.env.development` and add your channel IDs:

```bash
# Source channel (where signals come from)
SOURCE_CHANNEL_ID=-1001234567890

# Destination channel (where to post signals)
DESTINATION_CHANNEL_ID=-1009876543210
```

### 3. Add Bot as Admin to Both Channels

**IMPORTANT:** The bot must be an admin in BOTH channels with these permissions:

**Source Channel:**
- ✅ Read messages (Post Messages permission)

**Destination Channel:**
- ✅ Post messages
- ✅ Edit messages (optional)
- ✅ Delete messages (optional)

**How to add bot as admin:**
1. Go to your channel
2. Click on channel name → Administrators
3. Add administrator
4. Search for: @Zusfx_bot
5. Grant required permissions
6. Save

### 4. Run the Bot

```bash
npm run bot
```

You should see:
```
🤖 Telegram Signal Forwarder Bot
================================
✅ Telegram bot started successfully
📡 Monitoring channel: -1001234567890
📤 Forwarding to channel: -1009876543210
```

## Features

The bot will automatically forward:
- ✅ Text messages
- ✅ Photos (with captions)
- ✅ Videos (with captions)
- ✅ Documents (with captions)
- ✅ Audio files (with captions)
- ✅ Voice messages
- ✅ Stickers

## Troubleshooting

### "Chat not found" error
- Make sure bot is added as admin to both channels
- Verify channel IDs are correct (including the minus sign)

### "Not enough rights" error
- Check bot permissions in both channels
- Ensure bot has "Post Messages" permission in destination channel

### Bot doesn't receive messages
- Verify bot has "Post Messages" permission in source channel
- Check that channel IDs are correct
- Make sure bot is not muted in the channel

### Messages not forwarding
- Check console logs for errors
- Verify destination channel ID is correct
- Ensure bot has proper permissions in destination channel

## Production Deployment

For production, you can:

1. **Use PM2:**
```bash
npm install -g pm2
pm2 start npm --name "telegram-bot" -- run bot
pm2 save
pm2 startup
```

2. **Use systemd service (Linux):**
Create `/etc/systemd/system/telegram-bot.service`

3. **Deploy to cloud:**
- Heroku
- DigitalOcean
- AWS EC2
- Railway.app

## Security Notes

⚠️ **IMPORTANT:**
- Never share your bot token publicly
- Add `.env*` to `.gitignore`
- Consider using environment variables in production instead of `.env` files
- The bot token in this setup is already exposed in the screenshot - consider revoking and creating a new bot if this is for production use

## Support

For issues or questions about the Telegram Bot API:
- https://core.telegram.org/bots/api
- https://github.com/yagop/node-telegram-bot-api
