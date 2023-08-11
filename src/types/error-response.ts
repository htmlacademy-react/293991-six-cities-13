export type ErrorResponse = {
  errorType: string;
  message: string;
  details: [
    {
      property: string;
      value: string;
      messages: string[];
    }
  ];
};
