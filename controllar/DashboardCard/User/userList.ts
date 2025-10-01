import { Request, Response } from "express";
import userModel from "../../../model/UserModel/userModel";


export const AllUserList = async (req: Request, res: Response) => {
    const pageParam = (req.query.page as string) || '1'
    const page = parseInt(pageParam)
    const limit = 6
    const skip = (page - 1) * limit
    const user = await userModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean()
    const total = await userModel.countDocuments()
    const count = Math.ceil(total / limit)

    const pageArray = Array.from({ length: count }, (_, i) => i + 1);
    res.status(200).json({
        count,
        pageArray,
        user
    })
}