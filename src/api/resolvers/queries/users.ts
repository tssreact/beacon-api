import { UserModel } from "data";

export const users = async (
  _: void,
  args: void,
): Promise<{ name: string }[]> => {
  const users = await UserModel.find();
  return users;
};
