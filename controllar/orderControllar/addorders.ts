import  { Request, Response } from "express";
import Order from "../../model/ordersModel/ordersModel";

export const AddOrder = async (req:Request, res:Response) =>{
    const orderInfo = req.body.orderDetails;
    const order = await Order.insertOne(orderInfo);
    res.status(200).send({message:"Order Save Successfully!", order})
}