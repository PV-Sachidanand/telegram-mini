export enum TokenType {
  ACCESSS = "accessToken",
  REFRESH = "refreshToken",
}
export const apiBaseUrl = import.meta.env.VITE_API_ENDPOINT as string;
