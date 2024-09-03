export default class Email {
  constructor(
    public email: string,
    public otp: number,
    public isverified?: boolean
  ) {}
}
