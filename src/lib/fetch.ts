export const post = <T = any>(url: string, body: {}, headers?: {}, option?: {}) => {
  return fetcher<T>(url, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    ...option,
    body: JSON.stringify(body),
  })
}

export const get = <T = any>(url: string, params?: {}, headers?: {}, option?: RequestInit) => {
  const query = new URLSearchParams(params)
  url = query ? `${url}?${query}` : url
  return fetcher<T>(url, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    ...option
  })
}

const fetcher = <T = any>(input: RequestInfo, init?: RequestInit): Promise<T> => {
  return new Promise((resolve, reject) => {
    fetch(input, init)
      .then(async (response) => {
        const json = await response.json()
        console.log(json)
        if (response.ok) {
          resolve(json)
        } else {
          reject(new FetchError(response, json))
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export class FetchError extends Error {
  res: Response
  constructor(res: Response, json: any) {
    super(res.statusText)
    this.res = res
  }
}