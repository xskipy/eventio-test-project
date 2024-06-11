interface ErrorResponse {
  message: string;
  code: string;
  issues: [
    {
      message: string;
    },
  ];
}

export default ErrorResponse;
