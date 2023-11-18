class RequestError extends Error
{
      status: number;

      constructor(status: number, message: string, name?: string)
      {
            super(message);
            this.status = status;

            if (name)
                  this.name = name;

            // This line is needed to correctly capture the stack trace
            Error.captureStackTrace(this, this.constructor);
      }
}

export default RequestError;