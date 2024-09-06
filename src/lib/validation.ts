import { PublicKey } from '@solana/web3.js';
import crypto from 'crypto';
import { NextRequest } from 'next/server';

// Define a type for validation results
interface ValidationResult {
  isValid: boolean;
  message?: string;
}

// Function to validate a Solana public key
export function validatePublicKey(publicKey: string): ValidationResult {
  try {
    new PublicKey(publicKey);
    return { isValid: true };
  } catch (error) {
    return { isValid: false, message: 'Invalid public key format' };
  }
}

// Function to verify a request signature
export function verifyRequestSignature(request: NextRequest): ValidationResult {
  try {
    const signature = request.headers.get('x-signature');
    if (!signature) {
      return { isValid: false, message: 'Signature missing' };
    }

    const body = request.body?.toString();
    if (!body) {
      return { isValid: false, message: 'Body missing' };
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error('Secret key not configured');
    }

    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(body);
    const computedSignature = hmac.digest('hex');

    if (signature !== computedSignature) {
      return { isValid: false, message: 'Invalid request signature' };
    }

    return { isValid: true };
  } catch (error) {
    console.error('Signature Verification Error:', error);
    return { isValid: false, message: 'Failed to verify request signature' };
  }
}

// Function to validate required fields in an object
export function validateRequiredFields(
  data: Record<string, any>,
  requiredFields: string[]
): ValidationResult {
  for (const field of requiredFields) {
    if (!data.hasOwnProperty(field) || data[field] === undefined || data[field] === null || data[field] === '') {
      return { isValid: false, message: `Missing or empty required field: ${field}` };
    }
  }
  return { isValid: true };
}

// Function to validate integer values
export function validateInteger(value: any, min?: number, max?: number): ValidationResult {
  if (!Number.isInteger(value)) {
    return { isValid: false, message: 'Value must be an integer' };
  }
  if (min !== undefined && value < min) {
    return { isValid: false, message: `Value must be at least ${min}` };
  }
  if (max !== undefined && value > max) {
    return { isValid: false, message: `Value must not exceed ${max}` };
  }
  return { isValid: true };
}

// Function to validate string length
export function validateStringLength(value: string, min: number, max?: number): ValidationResult {
  if (value.length < min) {
    return { isValid: false, message: `String must be at least ${min} characters long` };
  }
  if (max !== undefined && value.length > max) {
    return { isValid: false, message: `String must not exceed ${max} characters` };
  }
  return { isValid: true };
}
