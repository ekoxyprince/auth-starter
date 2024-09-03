export default class User {
  constructor(
    public id?: string,
    public fullname?: string,
    public email?: string,
    public username?: string,
    public phone?: string,
    public password?: string,
    public ipAddress?: string,
    public country?: string,
    public pin?: string
  ) {}
}
