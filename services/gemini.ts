
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, ACHIEVEMENTS } from "../constants";
import { GroundingSource } from "../types";

const SYSTEM_INSTRUCTION = `
你是牛渝文的 AI 个人助手。
关于牛渝文：
- 身份：${PERSONAL_INFO.motto}
- 背景：${PERSONAL_INFO.bio}
- 主要成就：${ACHIEVEMENTS.map(a => a.title).join(', ')}

指令：
1. 语气：睿智、极简、富有未来感。
2. 实时搜索：涉及最新的 AI 趋势或牛渝文近期的动态时，必须使用 googleSearch 工具。
3. 如果用户问到“空间初始化”，告诉他们这是在加载渝文的数字灵魂。
`;

export const getGeminiResponse = async (userMessage: string) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return { text: "AI 接口未就绪。牛渝文是一位深耕 AI 与创业的 Gen Z 实践者。", sources: [] };

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "无法获取响应。";
    const sources: GroundingSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri) {
          sources.push({ uri: chunk.web.uri, title: chunk.web.title || "参考资料" });
        }
      });
    }

    return { 
      text, 
      sources: Array.from(new Set(sources.map(s => s.uri)))
                 .map(uri => sources.find(s => s.uri === uri)!) 
    };
  } catch (error) {
    return { text: "连接超时，请检查网络或 API 配置。", sources: [] };
  }
};
