import { Request, Response } from "express";
import ProductsModel from "../../model/productsModel/productsModel";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductsModel.find({}).lean();

    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server Error" });
  }
};
