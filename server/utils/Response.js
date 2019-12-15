class Response {
  static error(res, code, message, data = '') {
    return res.status(code).json({
      status: false,
      message,
      data,
    });
  }

  static success(res, code, message, data = '') {
    return res.status(code).json({
      status: true,
      message,
      data,
    });
  }
}

export default Response;
