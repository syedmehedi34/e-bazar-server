import { Request, Response } from "express";
import ProductsModel from "../../model/productsModel/productsModel";

export const addProducts =  async (req: Request, res: Response) => {
  
    console.log(req.body);
    const productsData = req.body;
    const product = await ProductsModel.create(productsData);
    res.status(200).send({
      message: "Data inserted Successfully!",
      product,
    });
  
  
};
