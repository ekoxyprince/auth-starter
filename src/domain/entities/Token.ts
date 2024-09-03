export default class Token {
  constructor(
    public refreshToken: string,
    public expiresAt: number,
    public isValid: boolean
  ) {}
}
