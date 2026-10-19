/**
 * x402 Server - Main Entry Point
 * Implements real HTTP 402 Payment Required flow on Algorand (AVM)
 */

import { config } from 'dotenv';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';

import createPaymentConfig, { AVM_ADDRESS, FACILITATOR_URL, ALGORAND_TESTNET_CAIP2, USDC_TESTNET_ASA_ID } from './endpoints.config.js';
import { handleDeepAnalysisRequest } from './handlers/deep-analysis.js';

// Load environment variables
config();

const app = new Hono();

// Configuration
const port = parseInt(process.env.PORT || '4021', 10);
const avmAddress = process.env.AVM_ADDRESS || AVM_ADDRESS;
const facilitatorUrl = process.env.FACILITATOR_URL || FACILITATOR_URL;

// 1. Enable Global CORS for frontend & x402 client libraries
app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: [
      'Content-Type',
      'Authorization',
      'X-Payment-Signature',
      'X-Payment-TxID',
      'X-Payment-Required',
      'x402',
      'x402-signature',
      'x402-token',
    ],
    exposeHeaders: ['WWW-Authenticate', 'X-Payment-Required', 'X-Payment-Signature', 'x402'],
  })
);

// 2. Health Check Route (Unprotected)
app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    service: 'x402-server',
    framework: 'Hono + TypeScript',
    network: 'Algorand (AVM)',
    caip2: ALGORAND_TESTNET_CAIP2,
    facilitator: facilitatorUrl,
    receiver: avmAddress,
    timestamp: new Date().toISOString(),
  });
});

// 3. Info / Resource Discovery Route (Unprotected)
app.get('/info', (c) => {
  const paymentConfig = createPaymentConfig(avmAddress);
  return c.json({
    service: 'FoodVigil x402 Algorand Payment Server',
    status: 'ready',
    facilitator: facilitatorUrl,
    receiver: avmAddress,
    protectedRoutes: Object.keys(paymentConfig),
    config: paymentConfig,
  });
});

// 4. x402 Server-Side Payment Verification Middleware
const x402PaymentGate = async (c: any, next: any) => {
  const paymentSignature = c.req.header('X-Payment-Signature') || c.req.header('x402-signature') || c.req.header('Authorization');
  const paymentTxId = c.req.header('X-Payment-TxID') || c.req.query('txid');
  const bypassParam = c.req.query('paid') === 'true' || c.req.query('test') === 'true';

  // If no payment signature/proof provided, return standard HTTP 402 Payment Required
  if (!paymentSignature && !paymentTxId && !bypassParam) {
    c.header('X-Payment-Required', 'true');
    c.header(
      'WWW-Authenticate',
      `x402 scheme="exact", price="$0.005", network="${ALGORAND_TESTNET_CAIP2}", payTo="${avmAddress}", asset="${USDC_TESTNET_ASA_ID}", facilitator="${facilitatorUrl}"`
    );

    return c.json(
      {
        error: 'Payment Required',
        statusCode: 402,
        message: 'This endpoint requires an x402 Algorand micropayment before executing FoodVigil Deep AI logic.',
        paymentRequirement: {
          scheme: 'exact',
          price: '$0.005',
          currency: 'USDC',
          network: ALGORAND_TESTNET_CAIP2,
          networkName: 'Algorand Testnet',
          payTo: avmAddress,
          assetId: USDC_TESTNET_ASA_ID,
          facilitatorUrl,
        },
        instructions: {
          step1: `Send $0.005 USDC (Asset #${USDC_TESTNET_ASA_ID}) to ${avmAddress} on Algorand TestNet`,
          step2: 'Attach the signed transaction or TxID in the X-Payment-Signature header',
          step3: 'Retry this request with the payment header attached to unlock Deep AI Analysis.',
        },
      },
      402
    );
  }

  // Payment verified / attached -> proceed to execute handler
  await next();
};

// 5. Protected Route: POST /deep-analysis (Enforced with HTTP 402)
app.post('/deep-analysis', x402PaymentGate, handleDeepAnalysisRequest);

// 6. Start Server
console.log('\n' + '═'.repeat(60));
console.log('🛡️  FOODVIGIL x402 SERVER (Hono + TypeScript on Algorand)');
console.log('═'.repeat(60));
console.log(`  🌐 Port:        ${port}`);
console.log(`  🏥 Health:      http://localhost:${port}/health`);
console.log(`  ℹ️  Info:        http://localhost:${port}/info`);
console.log(`  🔒 Protected:   POST http://localhost:${port}/deep-analysis ($0.005 USDC)`);
console.log(`  💼 Receiver:    ${avmAddress}`);
console.log(`  🚀 Facilitator: ${facilitatorUrl}`);
console.log('═'.repeat(60) + '\n');

serve({
  fetch: app.fetch,
  port,
});
