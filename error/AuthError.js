class AuthError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static badRequest(message) {
    return new AuthError(400, message);
  }

  static unauthorize(message) {
    return new AuthError(401, message);
  }

  static internal(message) {
    return new AuthError(500, message);
  }
}

module.exports = AuthError;
