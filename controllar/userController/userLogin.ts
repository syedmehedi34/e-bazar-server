import { Request, Response } from 'express'
import userModel from '../../model/UserModel/userModel'
import bcrypt from 'bcrypt'

export const loginUser = async (req: Request, res: Response) => {
  try {
  
    const { email,password } = req.body
    if (!password || !email) {
      res.status(400).json({ message: 'Name and email are required' })
      return
    }

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPassMatch = await bcrypt.compare(password, user.password)
     if (!isPassMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
       res.status(200).json({
      message: 'User login successful',
      user
    })

  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error
    })
  }
}
