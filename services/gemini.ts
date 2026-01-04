
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, ACHIEVEMENTS } from "../constants";
import { GroundingSource } from "../types";

const getSafeApiKey = () => {
  try {
    // 兼容多种环境的 Key 读取方式
    const key = (typeof process !== 'undefined' && process.env?.API_KEY) || "";
    return key;
  } catch (e) {
    return "";
  }
};

const SYSTEM_INSTRUCTION = `
你是牛渝文的 AI 个人助手。
背景信息：
- 姓名：${PERSONAL_INFO.name}
- 身份：${PERSONAL_INFO.motto}
- 背景：${PERSONAL_INFO.bio}
- 成就：${ACHIEVEMENTS.map(a => a.title).join(', ')}

你的回答要求：
1. 风格专业且富有活力。
2. 涉及最新动态或查证事实时，必须使用 googleSearch 工具。
3. 如果搜索到了来源，回答结尾应自然提及。
`;

export const getGeminiResponse = async (userMessage: string) => {
  const apiKey = getSafeApiKey();
  
  if (!apiKey) {
    return {
      text: "你好！我是牛渝文的 AI 助手。目前我正运行在受限环境，但我依然可以为你展示渝文的资料。你想了解他的哪项成就？",
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
    
    // 提取 Grounding 元数据
    const sources: GroundingSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri) {
          sources.push({
            uri: chunk.web.uri,
            title: chunk.web.title || "参考资料"
          });
        }
      });
    }

    // 去重处理
    const uniqueSources = Array.from(new Set(sources.map(s => s.uri)))
      .map(uri => sources.find(s => s.uri === uri)!);

    return { text, sources: uniqueSources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "AI 模块连接超时。如果这发生在 GitHub 页面，请检查是否已配置有效的 API_KEY。",
      sources: []
    };
  }
};
