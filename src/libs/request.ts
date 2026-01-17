export const nextAPIUrl = `${import.meta.env.VITE_API_URL}`;

export async function fetchReq<TResponse = any>(url: string, config?: RequestInit): Promise<TResponse | undefined> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(url, config || {});
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
