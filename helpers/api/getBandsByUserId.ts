import { IBand } from "interfaces/Band";

export const getBandsByUserId = async (uid: number) => {
  const bandsResponse = await fetch(`http://localhost:3001/bands`);
  const AllBands:IBand[] = await bandsResponse.json()
  const bands = AllBands.filter(band=>band.userId === uid)
  return bands;
};
