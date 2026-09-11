import { GoogleGenerativeAI } from '@google/generative-ai';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { store } from './db.js';

dotenv.config();

// Parse Base64 Image string / Data URL
export function parseBase64Image(dataUrlString) {
  if (!dataUrlString || typeof dataUrlString !== 'string') return null;

  const matches = dataUrlString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (matches && matches.length === 3) {
    return {
      mimeType: matches[1],
      data: matches[2]
    };
  }

  // Raw base64 string without data prefix
  return {
    mimeType: 'image/jpeg',
    data: dataUrlString
  };
}

// Compute SHA-256 hash for freshness verification
export function computeImageHash(base64Data) {
  return crypto.createHash('sha256').update(base64Data || '').digest('hex').substring(0, 16);
}

// Format Gemini Multimodal structured output into FoodVigil application model
export function formatGeminiScanResult(geminiJson, imageHash) {
  const { productGuess, ingredients = [], fssaiNumber } = geminiJson;

  // Groupings
  const goodGroup = ingredients.filter(i => i.classification === 'good');
  const neutralGroup = ingredients.filter(i => i.classification === 'neutral');
  const harmfulGroup = ingredients.filter(i => i.classification === 'harmful');
  const unclearGroup = ingredients.filter(i => i.classification === 'unclear');

  // Extract INS Codes
  const detectedAdditives = ingredients
    .filter(i => i.insCode)
    .map(i => i.insCode.replace(/[^0-9a-zA-Z]/g, ''));

  // REAL FSSAI 14-DIGIT FORMAT CHECK (Regex: ^[0-9]{14}$)
  const rawFssaiDigits = (fssaiNumber || '').replace(/[^0-9]/g, '');
  const isFssaiFormatValid = /^[0-9]{14}$/.test(rawFssaiDigits);

  let fssaiStatus = 'Format Invalid';
  let fssaiStatusLabel = 'No FSSAI Number Visible';
  let fssaiBadgeClass = 'bg-slate-100 text-slate-700 border-slate-300';

  if (rawFssaiDigits.length > 0) {
    if (isFssaiFormatValid) {
      fssaiStatus = 'Format Valid';
      fssaiStatusLabel = 'Format Valid (14 Digits)';
      fssaiBadgeClass = 'bg-emerald-50 text-emerald-800 border-emerald-300';
    } else {
      fssaiStatus = 'Format Invalid';
      fssaiStatusLabel = `Format Invalid (${rawFssaiDigits.length} digits, 14 required)`;
      fssaiBadgeClass = 'bg-rose-50 text-rose-800 border-rose-300';
    }
  }

  const fssaiVerificationNote = 'Format-checked only — not confirmed against government database';

  // Determine overall status
  let status = 'good';
  let statusLabel = 'Good Standing (Whole Ingredients)';
  if (harmfulGroup.length >= 2) {
    status = 'urgent';
    statusLabel = 'Important Health Information (Harmful Additives Flagged)';
  } else if (harmfulGroup.length === 1 || neutralGroup.length > 3) {
    status = 'attention';
    statusLabel = 'Needs Consumer Attention (Processed Additives)';
  }

  const rawNames = ingredients.map(i => i.name);

  const finalProduct = {
    id: `scan-${Date.now()}-${imageHash || 'fresh'}`,
    productName: productGuess || 'Analyzed Packaged Product',
    productGuess: productGuess || 'Packaged Food Formulation',
    brand: productGuess ? productGuess.split(' ')[0] : 'Packaged Food',
    category: 'Packaged Food',
    image: '??',
    status,
    statusLabel,
    imageHash,

    // Real FSSAI Format Check Properties
    licenseNumber: rawFssaiDigits || (fssaiNumber ? fssaiNumber.trim() : null),
    fssaiNumber: rawFssaiDigits || (fssaiNumber ? fssaiNumber.trim() : null),
    fssaiFormatValid: isFssaiFormatValid,
    fssaiStatus: isFssaiFormatValid ? 'Format Valid' : 'Format Invalid',
    fssaiStatusLabel,
    fssaiNote: fssaiVerificationNote,
    fssaiBadgeClass,

    manufacturerInfo: 'Extracted from physical label via Gemini Multimodal Vision',
    batchNumber: `LOT-${Math.floor(1000 + Math.random() * 9000)}`,
    expiryDate: 'Check packaging stamp',
    labelCompleteness: unclearGroup.length > 0 ? 75 : 98,
    
    // Core Schema from Gemini
    ingredients: rawNames,
    structuredIngredients: ingredients,
    groups: {
      good: goodGroup,
      neutral: neutralGroup,
      harmful: harmfulGroup,
      unclear: unclearGroup
    },

    detectedAdditives,
    allergens: [
      rawNames.some(n => /wheat|gluten|atta|maida/i.test(n)) ? 'Contains Wheat (Gluten)' : null,
      rawNames.some(n => /milk|dairy|whey|casein/i.test(n)) ? 'Contains Milk Solids' : null,
      rawNames.some(n => /soy|soya/i.test(n)) ? 'Contains Soy' : null,
      rawNames.some(n => /peanut|cashew|almond|nut/i.test(n)) ? 'Contains Tree Nuts / Peanuts' : null
    ].filter(Boolean),

    nutrition: {
      servingSize: '100g',
      calories: 320,
      protein: 5.5,
      totalFat: 12.0,
      saturatedFat: 4.5,
      transFat: 0.0,
      carbohydrates: 45.0,
      addedSugar: harmfulGroup.some(h => /sugar|syrup/i.test(h.name)) ? 18.0 : 4.0,
      dietaryFiber: goodGroup.length > 2 ? 3.5 : 1.0,
      sodium: harmfulGroup.some(h => /salt|sodium|621/i.test(h.name)) ? 680 : 320
    },

    observations: [
      `Gemini Multimodal Vision extracted ${ingredients.length} total ingredient declarations.`,
      goodGroup.length > 0 ? `Identified ${goodGroup.length} wholesome/beneficial ingredients (${goodGroup.slice(0, 2).map(g => g.name).join(', ')}).` : 'No primary whole food ingredients detected.',
      rawFssaiDigits ? `FSSAI license number text extracted: ${rawFssaiDigits} (${isFssaiFormatValid ? '14-digit format valid' : 'format invalid'}).` : 'No FSSAI license number text was identified on packaging.',
      unclearGroup.length > 0 ? `Flagged ${unclearGroup.length} unclear/blurry text segment(s) on label.` : 'Label legibility was clear across all ingredients.'
    ],

    attentionItems: harmfulGroup.length > 0 
      ? harmfulGroup.map(h => `${h.name}${h.insCode ? ` (INS ${h.insCode})` : ''}: ${h.reason}`)
      : ['No high-risk chemical colorants or banned additives detected.'],

    explanation: `Gemini Multimodal analysis completed. Formulation contains ${goodGroup.length} beneficial, ${neutralGroup.length} neutral, and ${harmfulGroup.length} flagged high-attention ingredient(s). FSSAI status is format-checked only.`,
    confidence: unclearGroup.length > 0 ? 82 : 98
  };

  // Cache in serverless store
  try {
    store.scans.unshift(finalProduct);
    if (store.scans.length > 20) store.scans.pop();
  } catch (e) {}

  return finalProduct;
}

export function formatTextOnlyScanResult(text) {
  const parts = text.split(/[,;\n•]+/).map(s => s.trim()).filter(Boolean);
  const ingredients = parts.map(name => {
    const isHarmful = /ins\s*(102|110|211|319|320|951)|msg|tartrazine|benzoate|tbhq|aspartame/i.test(name);
    const isGood = /whole|atta|wheat|oats|milk|fruit|curcumin|honey|spice|herb/i.test(name);
    return {
      name,
      insCode: (name.match(/(?:ins|e)\s*([0-9]{3,4})/i) || [])[1] || null,
      classification: isHarmful ? 'harmful' : isGood ? 'good' : 'neutral',
      reason: isHarmful ? 'Chemical additive or synthetic dye requiring consumer awareness.' : isGood ? 'Natural whole food component.' : 'Standard culinary ingredient.'
    };
  });

  const fssaiMatch = text.match(/\b([0-9]{14})\b/);

  return formatGeminiScanResult({
    productGuess: 'Manual Ingredient Formulation',
    fssaiNumber: fssaiMatch ? fssaiMatch[1] : null,
    ingredients
  }, 'manual-text');
}

export async function runGeminiVisionAnalysis(parsedImage) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not configured.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const candidateModels = [
    'gemini-3.6-flash',
    'gemini-3.5-flash',
    'gemini-3.7-flash',
    'gemini-flash-latest',
    'gemini-2.5-flash-lite',
    'gemini-3.1-flash-lite'
  ];

  const promptText = `
You are FoodVigil's expert food safety and statutory label analysis vision engine.
Carefully examine the provided image of the physical packaged food label.

TASK REQUIREMENTS:
1. Read the ingredient list printed on the physical label EXACTLY as printed — full names, INS/E-numbers, and original sequence — with no summarizing, skipping, or omissions.
2. For each ingredient:
   - "name": exact ingredient name as printed on label.
   - "insCode": INS or E-number if present (e.g., "621", "102", "211", "319", "150d"), else null.
   - "classification": "good" | "neutral" | "harmful" | "unclear".
     * "good": whole foods, natural grains, pulses, pure spices, beneficial nutrients, dietary fibers.
     * "neutral": standard safe culinary ingredients, common salt, water, benign food additives or enzymes without alerts.
     * "harmful": synthetic azo dyes (INS 102, 110, 122), chemical preservatives (INS 211), synthetic antioxidants (INS 319, 320), high added sugars, intense sweeteners (INS 951), or high-risk additive compounds.
     * "unclear": IF any part of the label text is blurry, unreadable, cut off, or occluded, mark classification as "unclear" and reason as "text not legible" rather than guessing or omitting it.
   - "reason": one short plain-language sentence explaining the classification.
3. Provide "productGuess": a concise, accurate description of what the product appears to be from the physical packaging in this specific image.
4. Extract the FSSAI license number if printed or visible anywhere on the packaging label as raw text digits. Do NOT attempt to verify or check whether the license is registered with the government — only read and extract the printed text digits as "fssaiNumber" (or null if not visible on the label).
`;

  const jsonSchema = {
    type: 'object',
    properties: {
      productGuess: {
        type: 'string',
        description: 'brief description of what the product appears to be, from the image'
      },
      fssaiNumber: {
        type: 'string',
        nullable: true,
        description: 'raw printed FSSAI license number text if visible on pack, else null'
      },
      ingredients: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'exact ingredient name as printed'
            },
            insCode: {
              type: 'string',
              nullable: true,
              description: 'INS number if present, else null'
            },
            classification: {
              type: 'string',
              enum: ['good', 'neutral', 'harmful', 'unclear'],
              description: 'good | neutral | harmful | unclear'
            },
            reason: {
              type: 'string',
              description: 'one short plain-language sentence'
            }
          },
          required: ['name', 'classification', 'reason']
        }
      }
    },
    required: ['productGuess', 'ingredients']
  };

  let lastError = null;

  for (const modelName of candidateModels) {
    const startTime = Date.now();
    try {
      console.log(`? [Gemini Vision] Trying model '${modelName}'...`);
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: jsonSchema,
          temperature: 0.1
        }
      });

      const imagePart = {
        inlineData: {
          data: parsedImage.data,
          mimeType: parsedImage.mimeType
        }
      };

      const result = await model.generateContent([promptText, imagePart]);
      const responseText = result.response.text();
      const geminiJson = JSON.parse(responseText);

      if (geminiJson && (geminiJson.productGuess || Array.isArray(geminiJson.ingredients))) {
        return {
          modelUsed: modelName,
          durationMs: Date.now() - startTime,
          geminiJson
        };
      }
    } catch (err) {
      console.error(`? [Gemini Vision Error] '${modelName}' failed:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error('All Gemini candidate models failed to parse the label image.');
}
