import { Schema, model, type Document } from 'mongoose';
import validator from 'validator';

export interface IProduct extends Document {
  name: string;
  category: string[];
  description: string;
  descriptionList: string[];
  colorType: { color: string; info: { size: string; count: number; status: number }[] }[];
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  totalCount: number;
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
    category: [
      {
        type: String
      }
    ],
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
        info: [
          {
            size: { type: String },
            count: {
              type: Number,
              min: [0, '數量不能低於0']
            },
            status: {
              type: Number,
              default: 1
            }
          }
        ]
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
    totalCount: {
      type: Number,
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
productSchema.pre('save', function (next) {
  // 檢查 colorType 是否存在且為陣列
  if (this.isModified('colorType') && Array.isArray(this.colorType)) {
    // 計算 totalCount
    const totalCount = this.colorType.reduce((sum, colorItem) => {
      if (Array.isArray(colorItem.info)) {
        return sum + colorItem.info.reduce((subSum, info) => subSum + (info.count || 0), 0);
      }
      return sum;
    }, 0);
    // 更新 totalCount
    this.totalCount = totalCount;
  }
  next();
});

export default model('product', productSchema);

