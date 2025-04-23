export class ErrorHelper extends Error{
  status: number;
  url: string;
  value?: string[];
  constructor(status: number, url: string, values?: string[]) {
    super();
    this.status = status;
    this.url = url;
    this.value = values;
  }
}