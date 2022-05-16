import { IBand } from "interfaces/Band";
import { IUser } from "interfaces/User";

export const userCanEditBand = async (uid: number, bandId: string) => {
  const bandsResponse = await fetch("http://localhost:3001/bands");
  const bands: IBand[] = await bandsResponse.json();
  const userResponse = await fetch(`http://localhost:3001/users/${uid}`);
  const user: IUser = await userResponse.json();
  console.log(bands);
  const found = bands.find((band) => band.id == bandId);
  if (found) {
    if (
      found.userId === uid ||
      user.role == "admin" ||
      user.role == "employee"
    ) {
      return true;
    } else {
      return false;
    }
  }
};
