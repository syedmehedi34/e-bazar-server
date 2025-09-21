
import  { Request, Response } from "express";
import ProductsModel from "../../model/productsModel/productsModel";

export const Checkout  = async (req:Request, res:Response) =>{
    const {id} = req.params;
    console.log(id);
    const products = await ProductsModel.findById(id).lean();
    console.log(products);
    res.status(200).json(products);
}