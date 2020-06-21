import { AddressModel, AddressSchema, PointModel } from "data";
import { ContextWithUser } from "models";

export const createAddress = async (
  context: ContextWithUser,
  {
    address,
    location,
    postCode,
  }: { address: string; postCode: string; location: [number, number] },
): Promise<AddressSchema> => {
  try {
    const user = context.user;
    const point = new PointModel({
      location: "Point",
      coordinates: location,
    });
    const a = await AddressModel.create({
      address,
      location: point,
      postCode,
    });
    user.addresses.push(a);
    await user.save();
    return a;
  } catch (error) {
    throw error;
  }
};
