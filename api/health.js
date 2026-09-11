import { setCorsHeaders } from './_lib/cors.js';
import { isPostgres } from './_lib/db.js';

export default async function handler(req, res) {
  if (setCorsHeaders(req, res)) return;

  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.VITE_GEMINI_API_KEY;

  return res.status(200).json({
    status: 'healthy',
    service: 'FoodVigil Vercel Serverless API',
    runtime: 'Vercel Serverless Edge/Node Function',
    database: isPostgres ? 'PostgreSQL / Supabase Connected' : 'In-Memory / Seed Knowledge Base Active',
    geminiConfigured: Boolean(geminiKey),
    geminiKeyPreview: geminiKey ? `${geminiKey.substring(0, 6)}...${geminiKey.slice(-4)}` : 'Not Configured',
    timestamp: new Date().toISOString()
  });
}
