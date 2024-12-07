import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface FaqInput {
  title: string;
  description: string;
  expedition: ExpeditionDocument["_id"];
}

export interface FaqDocument extends FaqInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const faqSchema = new mongoose.Schema(
  {
    faqId: {
      type: String,
      required: true,
      unique: true,
      default: () => `faq_${nanoid()}`,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition" },
  },
  {
    timestamps: true,
  }
);

const FaqModel = mongoose.model<FaqDocument>("Faq", faqSchema);

export default FaqModel;
