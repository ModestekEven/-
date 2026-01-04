
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, ACHIEVEMENTS } from "../constants";

// 安全获取 API_KEY，防止 process 未定义报错
const getApiKey = () => {
  try {
    return (typeof process !== 'undefined' ? process.env?.API_KEY : '') || "";
  } catch (e) {
    return "";
  }
};

const API_KEY = getApiKey();

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
  const key = getApiKey();
  if (!key) return "AI 助手目前处于离线演示模式（未检测到 API Key）。";

  try {
    const ai = new GoogleGenAI({ apiKey: key });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text || "抱歉，我暂时无法回应。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "连接 AI 服务时出现了一点小问题，请稍后再试。";
  }
};
