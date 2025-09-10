type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type JsonBody = Record<string, unknown> | unknown[];

type FetchOptions = {
  method: HttpMethod;
  body?: JsonBody | FormData;
  stringifyBody?: boolean;
};

export const createFetchOptions = ({
  method,
  body,
  stringifyBody = true,
}: FetchOptions): RequestInit => {
  const options: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };

  if (body !== undefined) {
    options.body = stringifyBody
      ? JSON.stringify(body as JsonBody)
      : (body as FormData);

    if (!stringifyBody) {
      delete options.headers;
    }
  }

  return options;
};
