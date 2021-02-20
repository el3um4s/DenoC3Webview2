export interface APIParams {
    operation?: string,
    a?: string,
    b?: string,
    first?: string,
    second?: string,
}

export interface Results {
  results: string,
  ok: boolean,
  operation: string,
  a: string,
  b: string
}