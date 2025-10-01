import { Request, Response } from "express";
import userModel from "../../../model/UserModel/userModel";

export const UserDeleteByid = async (req: Request, res: Response) => {
    const id = req.params.id;
    console.log(id)
    const deletedUser = await userModel.deleteOne({ _id: id });
    res.status(200).json({
        message: 'User deleted successfully',
        deletedUser
    })
}