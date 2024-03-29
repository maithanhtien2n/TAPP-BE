const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY.replace(/@/g, ""),
});

module.exports = {
  chatBot: async (messages) => {
    if (!messages || !messages.length) {
      throw {
        sttValue: "Phải có ít nhất một phần tử trong mảng messages!",
      };
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    return completion.choices[0].message;
  },
};
