import { config } from 'dotenv';
import { ALGORAND_TESTNET_CAIP2, USDC_TESTNET_ASA_ID } from '@x402/avm';

// Load environment variables
config();

export { ALGORAND_TESTNET_CAIP2, USDC_TESTNET_ASA_ID };

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

// Environment variables with statutory defaults
export const AVM_ADDRESS = process.env.AVM_ADDRESS || '7J6H5K7G2EXAMPLEALGORANDWALLETADDRESS3456789ABC';
export const FACILITATOR_URL = process.env.FACILITATOR_URL || 'https://facilitator.goplausible.xyz';

/**
 * Creates payment route configuration for x402 protected endpoints.
 * @param avmAddress Receiving Algorand wallet address.
 */
export function createPaymentConfig(avmAddress: string = AVM_ADDRESS): EndpointConfig {
  return {
    /**
     * Protected Route: POST /deep-analysis
     * Price: $0.005 USDC
     * Scheme: exact
     * Network: Algorand Testnet CAIP-2
     * Asset: USDC Testnet ASA (10458941)
     */
    'POST /deep-analysis': {
      accepts: [
        {
          scheme: 'exact',
          price: '$0.005',
          network: ALGORAND_TESTNET_CAIP2,
          payTo: avmAddress,
          extra: { asset: Number(USDC_TESTNET_ASA_ID) },
        },
      ],
      description: 'FoodVigil AI Deep Toxicological & Adulteration Analysis - Pay $0.005 USDC on Algorand Testnet',
    },
  };
}

export const endpointConfig = createPaymentConfig();
export default createPaymentConfig;
