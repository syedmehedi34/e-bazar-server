
import  { Request, Response } from "express";
import Order from "../../model/ordersModel/ordersModel";

export const UserOrderscancelById  = async (req:Request, res:Response) =>{
    const orderId = req.params.id;
    const order = await Order.deleteOne({_id: orderId});
    res.status(200).json({ message: "Order cancel successfully" , order});

}