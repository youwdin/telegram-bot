# telegram-bot

Telegram **signal forwarder** bot. It long-polls one source channel/group and copies every message (text, photo, video, document, audio, voice, sticker) to one or more destination channels. The bot itself is `server/telegram-bot.ts`, started by `run-bot.ts`; the surrounding Nuxt 3 app is unused boilerplate.

See `BOT_SETUP.md` for how to obtain channel IDs and grant the bot admin rights.

## Run locally

```bash
npm install
cp .env.example .env.development   # fill in the values
npm run bot                        # tsx run-bot.ts
```

`run-bot.ts` loads `.env.production` when `NODE_ENV=production`, otherwise `.env.development`. Values already present in the process environment take precedence over the file.

Requires Node >= 22 and npm >= 10.

## Environment variables

```
TELEGRAM_BOT_TOKEN=        # from @BotFather
SOURCE_CHANNEL_ID=         # e.g. -1001234567890
DESTINATION_CHANNEL_IDS=   # comma-separated, e.g. -1009876543210,-1001111111111
```

`BACKEND_API_DATA`, `BACKEND_API_WS`, `PORT`, `ENV_TYPE` are boilerplate placeholders and not used by the bot.

The real `.env.development` / `.env.production` files are git-ignored. Do not commit them.

## Deploy (Fly.io)

`fly.toml` (app `telegram-bot-l9g3xw`, region `iad`) builds the `Dockerfile` (`node:22.12-slim`, `npm install`, `CMD npm run bot`). Set the secrets on Fly instead of shipping an env file:

```bash
fly secrets set TELEGRAM_BOT_TOKEN=... SOURCE_CHANNEL_ID=... DESTINATION_CHANNEL_IDS=...
fly deploy
```

`.dockerignore` still allows `.env.production` into the build context for backwards compatibility; if the file exists locally it will be copied into the image.
