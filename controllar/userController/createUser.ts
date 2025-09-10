import { Request, Response } from 'express'
import userModel from '../../model/UserModel/userModel'
import bcrypt from 'bcrypt'

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const { email, name,password } = req.body
    if (!name || !email) {
      res.status(400).json({ message: 'Name and email are required' })
      return
    }
    const existUser = await userModel.findOne({ email: email })
    if (existUser) {
      return res.status(200).json({
        message: 'User already exists, you can login',
        user: existUser
      })
    }
    const haspassword = await bcrypt.hash(password, 10)
    console.log(haspassword)
    const userData = { email, name ,password:haspassword}
    const user = await userModel.create(userData)
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
