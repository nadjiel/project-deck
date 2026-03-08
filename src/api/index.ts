
export interface Ability {
  id: number;
  name: string;
  icon: string;
}

export interface Data {
  abilities: Ability[];
}

async function fetchData(): Promise<Data> {
  const res = await fetch("/db.json");
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  return await res.json();
}

const api = {
  fetch: fetchData,
};

export default api;
