
import { GoogleGenAI } from "@google/genai";
import { AppraisalReport } from "../types";

export const generateSmartSummary = async (report: AppraisalReport): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    As a professional luxury watch appraiser, provide a concise one-paragraph summary for an appraisal report based on the following data:
    Brand: ${report.brand}
    Model: ${report.modelNumber}
    Overall Conclusion: ${report.overallResult}
    Condition: 
    - Case: ${report.status.case}
    - Strap: ${report.status.strap}
    - Movement Performance: ${report.performance.function}
    - Notes: ${report.notes}
    - Tags: ${report.tags.join(', ')}

    Return only the summary in Traditional Chinese. Keep it professional and objective.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    return response.text || "無法生成摘要。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "生成摘要時發生錯誤。";
  }
};
