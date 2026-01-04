
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, ACHIEVEMENTS } from "../constants";

const API_KEY = process.env.API_KEY || "";

const SYSTEM_INSTRUCTION = `
你是牛渝文的 AI 个人助手。
请基于以下背景信息回答用户的问题：
- 姓名：${PERSONAL_INFO.name}
- 年龄：${PERSONAL_INFO.age}
- 所在地：${PERSONAL_INFO.location}
- 身份：${PERSONAL_INFO.motto}
- 成就：${ACHIEVEMENTS.map(a => a.title).join(', ')}

你的风格应该是专业、睿智、充满活力且有礼貌的。
如果用户问及关于 AI、创业或国学的问题，你可以结合牛渝文的背景给出见解。
如果用户问及隐私问题或与牛渝文无关的问题，请巧妙地引导回牛渝文的经历和专长上。
`;

export const getGeminiResponse = async (userMessage: string) => {
  if (!API_KEY) return "AI 助手目前离线，请稍后再试。";

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
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
    return "连接 AI 服务时出现了一点小问题。";
  }
};
