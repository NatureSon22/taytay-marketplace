const PSGC_URL = "https://psgc.gitlab.io/api";

type Item = {
  code: string;
  name: string;
};

const getProvinces = async () => {
  const response = await fetch(`${PSGC_URL}/island-groups/luzon/provinces/`);

  if (!response.ok) return [];

  const rawText = await response.text();
  const parsedText = JSON.parse(rawText);
  const data = parsedText.map((item: Item) => ({
    value: item.name,
    label: item.name,
    code: item.code,
  }));

  return data;
};

const getMunicipalities = async (provinceCode: string) => {
  const response = await fetch(
    `${PSGC_URL}/provinces/${provinceCode}/municipalities/`
  );

  if (!response.ok) return [];

  const rawText = await response.text();
  const parsedText = JSON.parse(rawText);
  const data = parsedText.map((item: Item) => ({
    value: item.name,
    label: item.name,
    code: item.code,
  }));

  return data;
};

const getBaranggays = async (municipalCode: string) => {
  console.log(municipalCode);

  const response = await fetch(
    `${PSGC_URL}/municipalities/${municipalCode}/barangays/`
  );

  if (!response.ok) return [];

  const rawText = await response.text();
  const parsedText = JSON.parse(rawText);
  const data = parsedText.map((item: Item) => ({
    value: item.name,
    label: item.name,
    code: item.code,
  }));

  return data;
};

export { getProvinces, getMunicipalities, getBaranggays };
