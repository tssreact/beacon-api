import { UserModel, UserSchema } from "../../data";

export const login = async (
  _: void,
  { email, password }: { email: string; password: string },
): Promise<{ user: UserSchema; token: string }> => {
  try {
    const user = await UserModel.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    return { user, token };
  } catch (error) {
    throw error;
  }
};
