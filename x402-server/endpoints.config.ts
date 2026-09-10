/**
 * x402 Endpoints Configuration
 * Defines payment-protected routes and pricing for Algorand (AVM).
 */

export interface PaymentRequirement {
  scheme: 'exact';
  price: string;
  network: string;
  payTo: string;
  extra?: { asset?: number };
}

export interface EndpointDefinition {
  accepts: PaymentRequirement[];
  description: string;
  extensions?: Record<string, unknown>;
}

export interface EndpointConfig {
  [routeKey: string]: EndpointDefinition;
}

// Algorand TestNet CAIP-2 Identifier & USDC TestNet ASA ID
export const ALGORAND_TESTNET_CAIP2 = 'algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCD0';
export const USDC_TESTNET_ASA_ID = 10458941; // Algorand TestNet USDC ASA ID

/**
 * Creates payment route configurations for x402 middleware.
 * @param avmAddress Receiving Algorand wallet address.
 */
export function createPaymentConfig(avmAddress: string): EndpointConfig {
  return {
    /**
     * Example: Pay-Per-Use Protected API Route
     */
    'GET /api/v1/premium-data': {
      accepts: [
        {
          scheme: 'exact',
          price: '$0.01',
          network: ALGORAND_TESTNET_CAIP2,
          payTo: avmAddress,
          extra: { asset: USDC_TESTNET_ASA_ID },
        },
      ],
      description: 'Access premium data - Pay $0.01 USDC on Algorand Testnet',
    },

    /**
     * Example: Protected AI / Compute Endpoint
     */
    'POST /api/v1/ai-generate': {
      accepts: [
        {
          scheme: 'exact',
          price: '$0.05',
          network: ALGORAND_TESTNET_CAIP2,
          payTo: avmAddress,
          extra: { asset: USDC_TESTNET_ASA_ID },
        },
      ],
      description: 'AI Generation Compute - Pay $0.05 USDC per invocation',
    },
  };
}

export default createPaymentConfig;
