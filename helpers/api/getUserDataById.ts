import { IUser } from "interfaces/User";

export const getUserDataById = async (uid: number) => {
  const bandsResponse = await fetch(`http://localhost:3001/users`);
  const allUsers :IUser[] = await bandsResponse.json()
  const user = allUsers.find(user=>user.id === uid)
  return user;
};
