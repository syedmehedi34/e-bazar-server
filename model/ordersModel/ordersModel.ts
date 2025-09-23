import mongoose, { Schema } from 'mongoose';

const OrderSchema: Schema = new Schema({
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    note: { type: String, default: "" },
  },
  product: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    brand: { type: String },
    category: { type: String },
    sizes: { type: [String], default: [] },
    colors: { type: [String], default: [] },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    currency: { type: String, required: true },
    image: { type: String },
    description: { type: String },
  },
  payment: {
    method: { type: String, required: true },
    orderStatus: { type: String, default: "pending" },
    paymentStatus: { type: String, default: "pending" },
    verifiedByAdmin: { type: Boolean, default: false },
    transactionId: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  delivery: {
    date: { type: Date, required: true },
    status: { type: String, default: "pending" },
    charge: { type: Number, default: 100 },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
