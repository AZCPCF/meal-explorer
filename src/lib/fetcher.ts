export const fetcher = async <T>(
  input: string | URL | Request,
  options?: RequestInit
) => {
  const response = await fetch(input, { cache: "force-cache", ...options });
  return { res: (await response.json()) as T, ...response };
};
