const WILAYAH_API_BASE_URL =
  'https://raw.githubusercontent.com/emsifa/api-wilayah-indonesia/master/static/api';

export type Province = {
  id: string;
  name: string;
};

export type Regency = {
  id: string;
  province_id: string;
  name: string;
};

async function fetchWilayah<T>(path: string): Promise<T> {
  const response = await fetch(`${WILAYAH_API_BASE_URL}/${path}`);

  if (!response.ok) {
    throw new Error(`Unable to load region data (${response.status})`);
  }

  return response.json() as Promise<T>;
}

export function fetchProvinces(): Promise<Province[]> {
  return fetchWilayah<Province[]>('provinces.json');
}

export function fetchRegenciesByProvince(provinceId: string): Promise<Regency[]> {
  return fetchWilayah<Regency[]>(`regencies/${provinceId}.json`);
}
