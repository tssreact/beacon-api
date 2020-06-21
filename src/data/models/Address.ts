import { Document, model, Model, Schema } from "mongoose";
import { pointSchema } from "./Point";

export interface AddressSchema extends Document {
  location: "Point";
  coordinates: number[];
}

export const addressSchema = new Schema<AddressSchema>({
  address: {
    type: String,
    required: true,
    trim: true,
  },
  postCode: {
    type: String,
    required: true,
    trim: true,
  },
  location: pointSchema,
});

export interface AddressModel extends Model<AddressSchema> {}

export const AddressModel = model<AddressSchema, AddressModel>(
  "Address",
  addressSchema,
);
