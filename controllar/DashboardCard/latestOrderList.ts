import  { Request, Response } from "express";
import Order from "../../model/ordersModel/ordersModel";

export const LatestOrderList  = async (req:Request, res:Response) =>{
    const order = await Order.find().sort({createdAt:-1}).lean().limit(10)
    res.status(200).send(order)
}