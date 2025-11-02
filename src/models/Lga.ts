import mongoose, { Schema } from 'mongoose';

const lgaSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    stateId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'State',
    },
  },
  {
    timestamps: true,
  }
);

lgaSchema.index({ stateId: 1 });
lgaSchema.index({ name: 1 });

const modelName = 'Lga';
export const LgaModel = (mongoose.models[modelName] || mongoose.model(modelName, lgaSchema)) as any;

