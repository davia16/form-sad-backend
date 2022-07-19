import * as dotenv from 'dotenv';
dotenv.config();
import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

export class Telegram {
  async sendMessage(name: string) {
    await bot.telegram.sendMessage(
      process.env.CHAT_ID,
      `Recebemos um novo formulário de ${name}`,
    );
  }
}
