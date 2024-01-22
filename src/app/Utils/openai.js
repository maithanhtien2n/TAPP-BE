const OpenAI = require("openai");
const openai = new OpenAI(process.env.OPENAI_API_KEY);
require("dotenv").config();

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
