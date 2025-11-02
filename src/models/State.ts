import mongoose, { Schema } from 'mongoose';
import { RegionEnum } from '../types';

const stateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    capital: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    region: {
      type: String,
      required: true,
      enum: Object.values(RegionEnum),
    },
  },
  {
    timestamps: true,
  }
);

stateSchema.index({ region: 1 });

export const StateModel = mongoose.model('State', stateSchema);

