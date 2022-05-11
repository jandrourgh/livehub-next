import { IBand } from "interfaces/Band";

export const getBandsByUserId = async (uid: number) => {
  const bandsResponse = await fetch(`http://localhost:3001/bands`);
  const bands:IBand[] = await bandsResponse.json()
  return bands;
};
