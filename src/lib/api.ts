export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor(baseUrl: string, headers?: HeadersInit) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = headers || {
      "Content-Type": "application/json",
    };
  }

  private async request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      let errorBody;

      if (contentType && contentType.includes("application/json")) {
        errorBody = await response.json();
      } else {
        errorBody = await response.text();
      }

      throw new ApiError(response.status, errorBody);
    }

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return response.json() as Promise<T>;
    }

    return response.text() as unknown as T;
  }

  get<T>(path: string, options?: RequestInit) {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  post<T>(path: string, body?: unknown, options?: RequestInit) {
    return this.request<T>(path, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  put<T>(path: string, body?: unknown, options?: RequestInit) {
    return this.request<T>(path, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  delete<T>(path: string, options?: RequestInit) {
    return this.request<T>(path, { ...options, method: "DELETE" });
  }
}

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, body: unknown) {
    super(`API Error: ${status}`);
    this.status = status;
    this.body = body;
  }
}
