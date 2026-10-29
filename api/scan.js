import { setCorsHeaders } from './_lib/cors.js';
import { 
  parseBase64Image, 
  computeImageHash, 
  runGeminiVisionAnalysis, 
  formatGeminiScanResult, 
  formatTextOnlyScanResult 
} from './_lib/gemini.js';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '25mb'
    }
  }
};

export default async function handler(req, res) {
  if (setCorsHeaders(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const requestTimestamp = new Date().toISOString();

  try {
    const { imageBase64, text, presetId } = req.body || {};

    if (!imageBase64 && !text && !presetId) {
      return res.status(400).json({
        success: false,
        error: 'No image or ingredient input provided. Please upload or take a clear photo of the packaging label.'
      });
    }

    let parsedImage = null;
    let serverImageHash = null;

    if (imageBase64) {
      parsedImage = parseBase64Image(imageBase64);
      if (!parsedImage || !parsedImage.data || parsedImage.data.length < 50) {
        return res.status(400).json({
          success: false,
          error: 'Invalid or corrupt image payload received. Please provide a valid food packaging image.'
        });
      }
      serverImageHash = computeImageHash(parsedImage.data);
      console.log(`?? [Vercel Function] Received Scan Request: Size = ${Math.round(parsedImage.data.length / 1024)} KB, Hash = ${serverImageHash}`);
    }

    // Call Gemini Multimodal Direct Invocations
    if (parsedImage) {
      try {
        const { modelUsed, durationMs, geminiJson } = await runGeminiVisionAnalysis(parsedImage);
        console.log(`? [Vercel Function] Gemini Vision success with model ${modelUsed} (${durationMs}ms)`);
        
        return res.status(200).json({
          success: true,
          provider: 'gemini-multimodal',
          modelUsed,
          imageHash: serverImageHash,
          durationMs,
          analyzedAt: requestTimestamp,
          data: formatGeminiScanResult(geminiJson, serverImageHash)
        });
      } catch (geminiErr) {
        console.error('? [Vercel Function] Gemini Vision Error:', geminiErr.message);
        return res.status(502).json({
          success: false,
          error: `Gemini Multimodal Vision API failed: ${geminiErr.message}. Please ensure a clear, well-lit photo of the packaging is provided.`,
          imageHash: serverImageHash,
          timestamp: requestTimestamp
        });
      }
    }

    // Manual Text Fallback
    if (text && text.trim()) {
      const textResult = formatTextOnlyScanResult(text.trim());
      return res.status(200).json({
        success: true,
        provider: 'text-parser',
        data: textResult
      });
    }

    return res.status(400).json({
      success: false,
      error: 'No valid image or text input provided for analysis.'
    });

  } catch (err) {
    console.error('? [Vercel Function Fatal Error]:', err.stack || err);
    return res.status(500).json({
      success: false,
      error: `Internal server error during label analysis: ${err.message}`
    });
  }
}
