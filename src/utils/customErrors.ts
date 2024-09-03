export class CustomError extends Error {
  constructor(
    public message: string,
    public code: number,
    public path?: string,
    public field?: string,
    public value?: string
  ) {
    super(message);
    this.code = code;
    this.path = path;
    this.field = field;
    this.value = value;
    Object.setPrototypeOf(this, CustomError);
  }
}

export class AuthenticationError extends CustomError {
  constructor(
    public message: string,
    public path?: string,
    public field?: string,
    public value?: string
  ) {
    super(message, 401, path, field, value);
    Object.setPrototypeOf(this, AuthenticationError);
  }
}

export class AuthorizationError extends CustomError {
  constructor(
    public message: string,
    public path?: string,
    public field?: string,
    public value?: string
  ) {
    super(message, 403, path, field, value);
    Object.setPrototypeOf(this, AuthorizationError);
  }
}
export class ValidationError extends CustomError {
  constructor(
    public message: string,
    public path?: string,
    public field?: string,
    public value?: string
  ) {
    super(message, 422, path, field, value);
    Object.setPrototypeOf(this, ValidationError);
  }
}

export class BadrequestError extends CustomError {
  constructor(
    public message: string,
    public path?: string,
    public field?: string,
    public value?: string
  ) {
    super(message, 400, path, field, value);
    Object.setPrototypeOf(this, BadrequestError);
  }
}
export class NotfoundError extends CustomError {
  constructor(
    public message: string,
    public path?: string,
    public field?: string,
    public value?: string
  ) {
    super(message, 404, path, field, value);
    Object.setPrototypeOf(this, NotfoundError);
  }
}
