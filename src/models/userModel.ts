import validator from 'validator';
import { Schema, model, type Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: Date;
  address: string;
  verificationToken: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'name 未填寫'],
      validate: {
        validator(value: string) {
          return validator.isLength(value, { min: 2 });
        },
        message: 'name 至少 2 個字元以上'
      }
    },
    email: {
      type: String,
      required: [true, 'email 未填寫'],
      validate: {
        validator(value: string) {
          return validator.isEmail(value);
        },
        message: 'Email 格式不正確'
      }
    },
    password: {
      type: String,
      required: [true, 'password 未填寫'],
      select: false
    },
    phone: {
      type: String,
      required: [true, 'phone 未填寫']
    },
    birthday: {
      type: Date,
      required: [true, 'birthday 未填寫']
    },
    address: {
      type: String,
      required: [true, 'addres 未填寫']
    },
    verificationToken: {
      type: String,
      default: '',
      select: false
    }
  },
  {
    versionKey: false,
    timestamps: true,
    toObject: {
      virtuals: true
    }
  }
);

export default model('user', userSchema);

