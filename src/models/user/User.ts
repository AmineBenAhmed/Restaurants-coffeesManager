import mongoose, { Document, Schema } from 'mongoose';

import { Roles  } from '@enums/roles';

export interface IUser {
  name: string;
  password: string;
  role: string;
  email: string;
  deleted: boolean;
};

export interface IUserModel extends IUser, Document {};

const UserSchema: Schema = new Schema(
  {
    name: { 
      type: String,
      required: true
    },

    password: { 
      type: String, 
      required: true
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email address is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    role: { 
      type: String, 
      enum: Roles,
    },

    deleted: { type: Boolean }
  },
  {
    versionKey: false
  }
);

export default mongoose.model<IUserModel>('user', UserSchema)

