import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  exp: number;
  iat?: number;
  [key: string]: any;
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded: DecodedToken = jwtDecode(token);

    if (!decoded.exp) return true;

    const currentTime = Date.now() / 1000;

    return decoded.exp < currentTime;
  } catch {
    return true;
  }
}
