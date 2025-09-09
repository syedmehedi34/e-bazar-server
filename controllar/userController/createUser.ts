
import { Request, Response } from 'express'
import userModel from '../../model/UserModel/userModel'

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body
    if (!name || !email) {
      res.status(400).json({ message: 'Name and email are required' })
      return
    }
    const existUser = await userModel.find({ email: email })
    if (existUser) {
      return res.send({ message: 'user already have an account' })
    }
    const userData = { email, name }
    const user = await userModel.insertOne(userData)
    res.status(201).json({
      message: 'User created successfully',
      user
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error
    })
  }
}
