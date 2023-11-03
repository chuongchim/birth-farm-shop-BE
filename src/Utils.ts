import * as crypto from 'crypto';

function convertObjToQueryStr(object: Record<string, any>): string {
  const queryParameters: string[] = [];

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key];
      const valueAsString = typeof value === 'string' ? value : JSON.stringify(value);

      queryParameters.push(`${key}=${valueAsString}`);
    }
  }

  return queryParameters.join('&');
}

function sortObjDataByKey(object: Record<string, any>): Record<string, any> {
  const orderedObject: Record<string, any> = {};
  const sortedKeys = Object.keys(object).sort();

  for (const key of sortedKeys) {
    orderedObject[key] = object[key];
  }

  return orderedObject;
}

function generateHmacSHA256(dataStr: string, key: string): string {
  const hmac = crypto.createHmac('sha256', key);
  hmac.update(dataStr, 'utf8');
  const hash = hmac.digest('hex');
  return hash;
}

function createSignatureFromObj(data: Record<string, any>, key: string): string {
  const sortedDataByKey = sortObjDataByKey(data);
  const dataQueryStr = convertObjToQueryStr(sortedDataByKey);
  return generateHmacSHA256(dataQueryStr, key);
}

function createSignatureOfPaymentRequest(data: {
  amount: number;
  cancelUrl: string;
  description: string;
  orderCode: number;
  returnUrl: string;
}, key: string): string {
  const { amount, cancelUrl, description, orderCode, returnUrl } = data;
  const dataStr = `amount=${amount}&cancelUrl=${cancelUrl}&description=${description}&orderCode=${orderCode}&returnUrl=${returnUrl}`;
  return generateHmacSHA256(dataStr, key);
}

export {
  createSignatureFromObj,
  createSignatureOfPaymentRequest
};
