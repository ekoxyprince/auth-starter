import mongoose, { Document, Schema, Model } from "mongoose";

export interface TokenDocument extends Document {
  refreshToken: string;
  expiresAt: number;
  isValid: boolean;
  createdAt: Date;
  updatedAt: Date;
  isModified: (path?: string) => boolean;
}

const TokenSchema: Schema<TokenDocument> = new Schema<TokenDocument>({
  refreshToken: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Number,
    required: true,
  },
  isValid: {
    type: Boolean,
    required: true,
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
TokenSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.updatedAt = new Date(Date.now());
  }
  next();
});

const TokenModel: Model<TokenDocument> = mongoose.model<TokenDocument>(
  "Token",
  TokenSchema
);

export default TokenModel;
