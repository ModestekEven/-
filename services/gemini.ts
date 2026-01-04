
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, ACHIEVEMENTS } from "../constants";

// 彻底安全的 API Key 获取方式
const getSafeApiKey = () => {
  try {
    // 优先检查全局 process 对象
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {}
  return "";
};

const SYSTEM_INSTRUCTION = `
你是牛渝文的 AI 个人助手。
请基于以下背景信息回答用户的问题：
- 姓名：${PERSONAL_INFO.name}
- 年龄：${PERSONAL_INFO.age}
- 所在地：${PERSONAL_INFO.location}
- 身份：${PERSONAL_INFO.motto}
- 成就：${ACHIEVEMENTS.map(a => a.title).join(', ')}

你的风格应该是专业、睿智、充满活力且有礼貌的。
你的目标是展示牛渝文在 AI 创业、校园社群运营以及国学方面的深厚积淀。
`;

export const getGeminiResponse = async (userMessage: string) => {
  const apiKey = getSafeApiKey();
  
  if (!apiKey) {
    return "你好！我是牛渝文的 AI 助手。目前我正运行在受限环境（未配置 API Key），但我依然可以为你展示渝文的资料。你想了解他的哪项成就？";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text || "抱歉，由于星际通讯信号波动，我暂时无法生成回答。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "连接 AI 服务时遇到了一点小麻烦，请确保您的网络环境可以访问 Google 服务。";
  }
};
