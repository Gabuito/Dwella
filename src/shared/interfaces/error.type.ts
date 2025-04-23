export type ErrorHandler = Error & {
  status: number;
  url: string;
  value?: string[];
};
