import { Schema, model, type Document } from 'mongoose';

export interface IOrder extends Document {
  userId: Schema.Types.ObjectId;
  orderList: {
    cartList: {
      productId: string;
      productName: string;
      imageUrl: string;
      color: string;
      size: string;
      quantity: number;
      price: number;
      total: number;
    }[];
    recipient: {
      name: string;
      mail: string;
      phone: string;
      address: string;
    };
    ShippingArea: string;
    ShippingType: string;
    supermarket: string;
    totalPrice: number;
    payType: string;
    payFinal: boolean;
    billType: string;
    bill: string;
    isShip: boolean;
  }[];
}

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'userId 找不到']
    },
    orderList: [
      {
        cartList: [
          {
            productId: { type: String },
            productName: { type: String },
            imageUrl: { type: String },
            color: { type: String },
            size: { type: String },
            quantity: { type: Number, min: 1 },
            price: { type: Number, min: 1 },
            total: { type: Number }
          }
        ],
        recipient: {
          name: { type: String },
          mail: { type: String },
          phone: { type: String },
          address: { type: String }
        },
        ShippingArea: { type: String },
        ShippingType: { type: String },
        supermarket: { type: String },
        totalPrice: { type: Number, min: 0 },
        payType: { type: String },
        payFinal: { type: Boolean },
        billType: { type: String },
        bill: { type: String },
        isShip: { type: Boolean }
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true
  }
);
export default model('order', orderSchema);

