
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, ACHIEVEMENTS } from "../constants";
import { GroundingSource } from "../types";

const SYSTEM_INSTRUCTION = `
你是牛渝文的 AI 个人助手。
关于牛渝文：
- 身份：${PERSONAL_INFO.motto}
- 背景：${PERSONAL_INFO.bio}
- 主要成就：${ACHIEVEMENTS.map(a => a.title).slice(0, 15).join(', ')}

指令：
1. 风格：睿智、专业、富有创业者活力。
2. 实时搜索：对于任何涉及最新动态、行业趋势或不确定的事实，请务必使用 googleSearch 进行实时检索。
3. 语言：中文回答。
`;

export const getGeminiResponse = async (userMessage: string) => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    return {
      text: "你好！我是牛渝文的 AI 助手。由于目前 API 密钥未配置，我只能为您提供预设的资料查询。牛渝文是一位深耕 AI 青少年教育的创业者。",
      sources: []
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
      },
    });

    const text = response.text || "无法获取 AI 的回答。";
    
    // 提取 Grounding 元数据
    const sources: GroundingSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri) {
          sources.push({
            uri: chunk.web.uri,
            title: chunk.web.title || "参考来源"
          });
        }
      });
    }

    // 去重
    const uniqueSources = Array.from(new Set(sources.map(s => s.uri)))
      .map(uri => sources.find(s => s.uri === uri)!);

    return { text, sources: uniqueSources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "连接 AI 服务时遇到问题。请确认您的 API 密钥是否有效且具有访问权限。",
      sources: []
    };
  }
};
