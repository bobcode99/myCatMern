import { model, Schema } from "mongoose";
import { TCat } from "../types/catTypes";

const catSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
});
export const CatModel = model<TCat>("cat", catSchema); // Cat Model
