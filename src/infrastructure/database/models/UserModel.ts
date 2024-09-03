import mongoose, { Document, Schema, Model, CallbackError } from "mongoose";
import bcrypt from "bcryptjs";
import PasswordService from "../../../api/services/PasswordService";

enum UserRole {
  ADMIN = "admin",
  USER = "user",
  SUBADMIN = "subadmin",
}
export interface UserDocument extends Document {
  fullname: string;
  email: string;
  phone: string;
  referralCode: string;
  username: string;
  ipAddress: string;
  role: UserRole;
  password: string;
  country: string;
  profileImage: string;
  pin: string;
  referedBy: string;
  isVerified: boolean;
  isActive: boolean;
  isDeleted: boolean;
  isLocked: boolean;
  resetToken: string;
  createdAt: Date;
  updatedAt: Date;
  isModified: (path?: string) => boolean;
}
const UserSchema: Schema = new Schema<UserDocument>({
  fullname: {
    type: String,
    required: [true, "Fullname is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  referralCode: {
    type: String,
    required: [true, "Referral Code invalid"],
    default: `BILL-${Math.floor(Math.random() * 9000) + 1000}`,
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  ipAddress: {
    type: String,
    required: [true, "Ip Address is required"],
  },
  role: {
    type: String,
    required: [true, "Role invalid"],
    enum: [UserRole.ADMIN, UserRole.SUBADMIN, UserRole.USER],
    default: UserRole.USER,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  profileImage: {
    type: String,
    required: [true, "Profile Invalid"],
    default: "http://localhost:8080/static/profile.png",
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  isLocked: {
    type: Boolean,
    required: true,
    default: false,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  resetToken: String,
  pin: {
    type: String,
    required: [true, "Pin is required to proceed"],
  },
  referedBy: String,
  createdAt: {
    type: Date,
    required: true,
    default: new Date(Date.now()),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date(Date.now()),
  },
});

UserSchema.pre<UserDocument>("save", async function (next) {
  try {
    const passwordService = new PasswordService();
    if (this.isModified("password") || this.isNew) {
      this.password = await passwordService.hashPassword(this.password);
    }
    if (this.isModified()) {
      this.updatedAt = new Date(Date.now());
    }
    if (this.isModified("pin") || this.isNew) {
      this.pin = await passwordService.hashPassword(this.pin);
    }
  } catch (error) {
    next(<CallbackError>error);
  }
});

const UserModel: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  UserSchema
);

export default UserModel;
