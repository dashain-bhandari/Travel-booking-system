import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";
import { UserDocument } from "./user.model";
import { TrainingDocument } from "./training.model";
import { ActivityDocument } from "./activity.model";
import { GroupDepartureDocument } from "./groupDeparture.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface BookingInput {
  fullName?: string;
  phone?: number;
  postalCode?: number;
  dob?: Date;
  adults?: number;
  childrens?: number;
  note?: string;
  // isTransportation: boolean;
  // isInsurance: boolean;
  paymentMethod?: string;
  paymentStatus?: string;
  startDate?: Date;
  endDate?: Date;
  expedition?: ExpeditionDocument["_id"];
  training?: TrainingDocument["_id"];
  departure?:GroupDepartureDocument["_id"]
  activity?: ActivityDocument["_id"];
  user?: UserDocument["_id"];
  invoiceSent?: boolean;
  emergencyName?: string;
  emergencyPhone?: number;
  emergencyRelationship?: string;
  paymentOption?: "full-payment" | "deposit-payment";
  paymentId?: string;
  totalAmount?: number;
  depositAmount?: number;
  remainingAmount?: number;
  additionalServices?: string[];
}

export interface BookingDocument extends BookingInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}


const BookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      default: () => `booking_${nanoid()}`,
    },
    fullName: { type: String },
    type: { type: String, enum: ["trip", "activity", "training"] },
    phone: { type: Number },
    postalCode: { type: Number },
    dob: { type: Date},
    startDate: { type: Date },
    endDate: { type: Date},
    adults: { type: Number },
    childrens: { type: Number },
    note: { type: String },
    invoiceSent: { type: Boolean, default: false },

    paymentMethod: { type: String },
    paymentStatus: { type: String},
    emergencyName: { type: String, required: false },
    emergencyPhone: { type: Number, required: false },
    emergencyRelationship: { type: String, required: false },
    paymentId: { type: String, required: false },
    totalAmount: { type: Number },
    depositAmount: { type: Number, required: false },
    remainingAmount: { type: Number, required: false },
    additionalServices: { type: [String], required: false },

    paymentOption: {
      type: String,
      
      enum: ["full-payment", "deposit-payment"],
    },

    expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition" },
    departure: { type: mongoose.Schema.Types.ObjectId, ref: "GroupDeparture" },
    activity: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
    training: { type: mongoose.Schema.Types.ObjectId, ref: "Training" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const BookingModel = mongoose.model<BookingDocument>("Booking", BookingSchema);

export default BookingModel;
