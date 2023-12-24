import mongoose, { Schema, Document } from "mongoose";

interface ComprehensionQuestion extends Document {
  passage: string;
  question: string;
  correctOption: string;
  options: string[];
}

const comprehensionQuestionSchema = new Schema<ComprehensionQuestion>({
  passage: { type: String, required: true },
  question: { type: String, required: true },
  correctOption: { type: String, required: true },
  options: [{ type: String, required: true }],
});

const ComprehensionQuestionModel = mongoose.model<ComprehensionQuestion>(
  "ComprehensionQuestion",
  comprehensionQuestionSchema
);

export { ComprehensionQuestionModel };
