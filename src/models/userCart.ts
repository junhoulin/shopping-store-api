import { Schema, model, type Document } from 'mongoose';

export interface ICart extends Document {
  userId: Schema.Types.ObjectId;
  cartList: {
    productId: string;
    productName: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
    total: number;
  }[];
  totalPrice: number;
}

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'userId 找不到']
    },
    cartList: [
      {
        productId: { type: String },
        productName: { type: String },
        color: { type: String },
        size: { type: String },
        quantity: {
          type: Number,
          min: [1, 'quantity 至少為 1']
        },
        price: {
          type: Number,
          min: [1, 'quantity 至少為 1']
        },
        total: { type: Number }
      }
    ],
    totalPrice: { type: Number, default: 0 }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export default model('cart', cartSchema);

