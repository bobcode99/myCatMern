import { CatModel } from "../models/cat";
import { TCat } from "../types/catTypes";

export const getCats: () => Promise<Array<TCat>> = () => {
    return CatModel.find().exec();
};

export const addCats: (dataBody: TCat) => Promise<TCat> = (dataBody) => {
    return CatModel.create(dataBody);
};
