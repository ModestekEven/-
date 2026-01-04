
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, ACHIEVEMENTS } from "../constants";
import { GroundingSource } from "../types";

const getSafeApiKey = () => {
  try {
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
如果用户询问的问题涉及实时信息、行业动态或需要查证事实，请务必使用 Google Search 工具。
`;

export const getGeminiResponse = async (userMessage: string) => {
  const apiKey = getSafeApiKey();
  
  if (!apiKey) {
    return {
      text: "你好！我是牛渝文的 AI 助手。目前我正运行在受限环境。你想了解他的哪项成就？",
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

    const text = response.text || "抱歉，由于星际通讯信号波动，我暂时无法生成回答。";
    
    // 提取搜索来源 URLs
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

    // URL 去重
    const uniqueSources = Array.from(new Set(sources.map(s => s.uri)))
      .map(uri => sources.find(s => s.uri === uri)!);

    return { text, sources: uniqueSources };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      text: "连接 AI 服务时遇到了一点小麻烦，请确保您的网络环境可以访问 Google 服务。",
      sources: []
    };
  }
};
