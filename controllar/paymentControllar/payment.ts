import dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, );

export const CreatePaymentIntent = async (req: Request, res: Response) => {
    const { amount, id } = req.body;
    console.log("Amount:", amount, "ID:", id);
     if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid payment amount." });
    }
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "BDT",
        payment_method_types: ["card"],
        description: "E-Bazaar payment",
        
    })

    res.status(200).json({
        message: "Payment successful",
        success: true,
        clientSecret: paymentIntent.client_secret,
    })
    
}