import { Schema, model, type Document } from 'mongoose';
import validator from 'validator';

export interface IProduct extends Document {
  name: string;
  category: string;
  description: string;
  descriptionList: string[];
  colorType: { color: string; count: number; status: number }[];
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  maxCount: number;
  price: number;
  // 可使用：1，已刪除：-1
  status: number;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'name 未填寫']
    },
    category: {
      type: String,
      required: [true, 'category 未填寫']
    },
    description: {
      type: String,
      required: [true, 'description 未填寫']
    },
    descriptionList: [
      {
        type: String,
        required: [true, 'descriptionList 未填寫']
      }
    ],
    colorType: [
      {
        color: { type: String },
        count: {
          type: Number,
          min: [1, 'quantity 至少為 1']
        },
        status: {
          type: Number,
          default: 1
        }
      }
    ],
    imageUrl: {
      type: String,
      required: [true, 'imageUrl 未填寫'],
      validate: {
        validator(value: string) {
          return validator.isURL(value, { protocols: ['https'] });
        },
        message: 'imageUrl 格式不正確'
      }
    },
    imageUrlList: [
      {
        type: String,
        trim: true,
        validate: {
          validator(value: string) {
            return validator.isURL(value, { protocols: ['https'] });
          },
          message: 'imageUrlList 格式不正確'
        }
      }
    ],
    areaInfo: {
      type: String,
      required: [true, 'areaInfo 未填寫']
    },
    maxCount: {
      type: Number,
      required: [true, 'maxCount 未填寫'],
      validate: {
        validator(value: number) {
          return validator.isInt(`${value}`, { min: 1 });
        },
        message: 'maxCount 格式不正確'
      }
    },
    price: {
      type: Number,
      required: [true, 'price 未填寫']
    },
    status: {
      type: Number,
      default: 1
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export default model('product', productSchema);

