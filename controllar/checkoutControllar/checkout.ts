
import  { Request, Response } from "express";
import ProductsModel from "../../model/productsModel/productsModel";

export const Checkout  = async (req:Request, res:Response) =>{
    const {id} = req.params;
 
    const products = await ProductsModel.findById(id).lean();

    res.status(200).json(products);
}