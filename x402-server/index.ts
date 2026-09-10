/**
 * x402 Server - Main Entry Point
 * Hono + TypeScript Payment-Protected Microservice on Algorand
 */

import { config } from 'dotenv';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';

import createPaymentConfig from './endpoints.config.js';
import { handlePremiumDataRequest, handleAiGenerateRequest } from './handlers/sample.js';

// Load environment variables
config();

const app = new Hono();

// Configuration
const port = parseInt(process.env.PORT || '4021', 10);
const avmAddress = process.env.AVM_ADDRESS || 'DEMO_AVM_ADDRESS';
const facilitatorUrl = process.env.FACILITATOR_URL || 'https://testnet.x402.org';

// 1. Enable Global CORS
app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'X-Payment-Signature', 'X-Payment-TxID', 'x402'],
    exposeHeaders: ['WWW-Authenticate', 'X-Payment-Required', 'x402'],
  })
);

// 2. Health Check Route
app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    service: 'x402-server',
    framework: 'Hono + TypeScript',
    network: 'Algorand (AVM)',
    facilitator: facilitatorUrl,
    receiver: avmAddress,
    timestamp: new Date().toISOString(),
  });
});

// 3. Info Route
app.get('/info', (c) => {
  const paymentConfig = createPaymentConfig(avmAddress);
  return c.json({
    service: 'x402 Algorand Payment Server',
    status: 'ready',
    protectedRoutes: Object.keys(paymentConfig),
    config: paymentConfig,
  });
});

// 4. Register Protected Route Skeletons (Business Logic Handlers)
app.get('/api/v1/premium-data', handlePremiumDataRequest);
app.post('/api/v1/ai-generate', handleAiGenerateRequest);

// 5. Start Server
console.log('\n' + '═'.repeat(60));
console.log('⚡ x402 SERVER (Hono + TypeScript)');
console.log('═'.repeat(60));
console.log(`  🌐 Port: ${port}`);
console.log(`  🏥 Health: http://localhost:${port}/health`);
console.log(`  ℹ️  Info:   http://localhost:${port}/info`);
console.log(`  💼 Wallet: ${avmAddress}`);
console.log('═'.repeat(60) + '\n');

serve({
  fetch: app.fetch,
  port,
});
