import { UserModel, UserSchema } from "../../data";

export const createUser = async (
  _: void,
  { email, password, name }: { email: string; password: string; name: string },
): Promise<{ user: UserSchema; token: string }> => {
  try {
    const user = await UserModel.create({
      email,
      password,
      name,
    });
    const token = await user.generateAuthToken();
    return { user, token };
  } catch (error) {
    throw error;
  }
};
