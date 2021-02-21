export interface APIParams {
  operation?: string;
  a?: string;
  b?: string;
  first?: string;
  second?: string;
}

export interface APIcalculator {
  operationPresent: boolean;
  operation: string;
  aPresent: boolean;
  a: string;
  bPresent: boolean;
  b: string;
}

export interface Results {
  results: string;
  ok: boolean;
  operation: string;
  a: string;
  b: string;
}
