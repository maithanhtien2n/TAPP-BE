require("dotenv").config();
const OpenAI = require("openai");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

module.exports = {
  onChatBot: async (messages) => {
    if (!messages || !messages.length) {
      throw {
        sttValue: "Phải có ít nhất một phần tử trong mảng messages!",
      };
    }

    const completion = await openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message;
  },
};
