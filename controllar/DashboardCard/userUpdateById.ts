import { Request, Response } from "express";
import userModel from "../../model/UserModel/userModel";

export const UserUpdateById = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const updateUserData = req.body;
    console.log(updateUserData)

    const updateUser = await userModel.findOneAndUpdate(
        { _id: id },
        { $set:  updateUserData  },
        { new: true }
    )
    console.log("update user",updateUser)
    if (!updateUser) {
        return res.status(404).json({ message: 'updateUser not found' })
    }
    res.status(200).json({
        message: 'User updated successfully',

    })
}