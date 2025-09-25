import { Request, Response } from "express";
import ProductsModel from "../../model/productsModel/productsModel";


export const getProductsAnalytics = async (req: Request, res: Response) => {

  
    const products = await ProductsModel.find({}, "title price rating createdAt").lean();


    const formattedData = products.map((item) => ({
      name: item.title,
      price: item.price,
      rating: item.rating,
     date: item.createdAt
        ? new Date(item.createdAt).toISOString().split("T")[0] 
        : "N/A",
    }));

    res.status(200).json(formattedData);
  
};
