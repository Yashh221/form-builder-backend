import mongoose, { Schema, Document } from "mongoose";

interface ClozeQuestion extends Document {
  question: string;
  options: string[];
  preview: string;
}

const clozeQuestionSchema = new Schema<ClozeQuestion>({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  preview: { type: String, required: true },
});

const ClozeQuestionModel = mongoose.model<ClozeQuestion>(
  "ClozeQuestion",
  clozeQuestionSchema
);

export { ClozeQuestionModel };
