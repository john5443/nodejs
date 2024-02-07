const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
require("dotenv").config();

const token = process.env.TELEGRAM_TOKEN;
const chatIdMy = 5376184617;
const bot = new TelegramBot(token, { polling: true });

app.use(express.json());
app.use(cors());

app.use("/api", router);

bot.setMyCommands([
  { command: "/start", description: "Начальное приветствие" },
]);

bot.on("message", async (msg) => {
  const { text, chat } = msg;
  const { first_name } = msg.from;
  const chatId = chat.id;

  if (text === "/start") {
    await bot.sendMessage(
      chatId,
      `Hi, ${first_name}. I am bot and I will help you.`
    );

    postMsg(chatIdMy);
  }
});

postMsg(chatIdMy);

function postMsg(chatId) {
  app.listen(3000, (a) => {
    console.log(a);
    console.log(`Server Started at ${3000}`);
  });

  router.post(
    "/data",
    async (
      {
        body: {
          email,
          date,
          gaveCurrency,
          gaveCurrencyAmount,
          takeCurrency,
          takeCurrencyAmount,
          walletAdress,
          reciverAdress,
        },
      },
      res
    ) => {
      const msg = `Пользователь: ${email}\nВремя: ${date}\nОтдает: ${gaveCurrencyAmount} ${gaveCurrency}\nПолучает: ${takeCurrencyAmount} ${takeCurrency}\nАдрес пользователя: ${walletAdress}\nДепозит адрес: ${reciverAdress}`;

      try {
        bot.sendMessage(chatId, msg);
        res.status(201).json(res);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
  );
}
