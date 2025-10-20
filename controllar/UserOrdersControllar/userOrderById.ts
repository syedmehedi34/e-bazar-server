import { Request, Response } from "express";
import Order from "../../model/ordersModel/ordersModel";

export const UserOrderById = async (req: Request, res: Response) => {
    const orderId = req.params.id;
    const order = await Order.findOne({ _id: orderId });
    res.status(200).send(order);
}