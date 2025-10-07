import { Request, Response } from "express";
import Blog from "../../model/BlogsModel/blogsModel";

export const BlogsPost = async (req: Request, res: Response) => {
    const blogData = req.body;
    console.log( req.body)
    const blog = await Blog.insertOne(blogData);
    res.status(200).send({message:"blogs post successfull", blog})

}