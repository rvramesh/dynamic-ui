import { AnyQueryKey, useQuery } from "react-query";

export async function sendQuery(
  url: string,
  init: RequestInit = { method: "GET", headers: { accept: "application/json" } }
) {
  const result = await fetch(url, init);
  const json = await result.json();
  const totalCount = parseInt(result.headers.get("X-Total-Count") ?? "-1", 10);
  const moreDataExist = Array.isArray(result) && result.length < totalCount;
  return { json, moreDataExist };
}

export function useDropDownQuery(
  key: AnyQueryKey,
  searchData: string,
  url: string,
  limit: number = 500,
  fetchInit?: RequestInit
) {
  return useQuery(key, async () => {
    const query = encodeURIComponent(searchData);
    const apiUrl = `${url}?text_like=${query}&_limit=${limit}`;
    const result = await sendQuery(apiUrl, fetchInit);
    console.log("useQuery", result);
    return result;
  });
}
