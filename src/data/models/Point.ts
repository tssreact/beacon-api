import { Document, model, Model, Schema } from "mongoose";

export interface PointSchema extends Document {
  location: "Point";
  coordinates: number[];
}

export const pointSchema = new Schema<PointSchema>({
  location: {
    type: String,
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

export interface PointModel extends Model<PointSchema> {}

export const PointModel = model<PointSchema, PointModel>("Point", pointSchema);
