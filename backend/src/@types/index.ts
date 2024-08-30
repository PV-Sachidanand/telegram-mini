export interface JwtSubject {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  is_premium?: boolean;
  start_param?: string;
  language_code: string;
  allows_write_to_pm: boolean;
  photoUrl: string;
}

export type JwtPayload = {
  sub?: JwtSubject;
  exp?: number;
  iat?: number;
};
