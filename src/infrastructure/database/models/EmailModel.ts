import mongoose, { Document, Schema, Model } from "mongoose";

export interface EmailDocument extends Document {
  email: string;
  otp: number;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  isModified: (path?: string) => boolean;
}

const EmailSchema = new Schema<EmailDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: Number,
    required: [true, "OTP invalid"],
    default: Math.floor(Math.random() * 9000 + 1000),
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
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

EmailSchema.pre<EmailDocument>("save", function (next) {
  if (this.isModified() || this.isNew) {
    this.updatedAt = new Date(Date.now());
  }
  next();
});

const EmailModel: Model<EmailDocument> = mongoose.model<EmailDocument>(
  "Email",
  EmailSchema
);

export default EmailModel;
