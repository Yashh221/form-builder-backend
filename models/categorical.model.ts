import mongoose, { Schema, Document } from "mongoose";
interface CategoricalItem {
  item: string;
  category: string;
}

interface CategoricalQuestion extends Document {
  categories: string[];
  items: CategoricalItem[];
}

const categoricalQuestionSchema = new Schema<CategoricalQuestion>({
  categories: [{ type: String, required: true }],
  items: [
    {
      item: { type: String, required: true },
      category: { type: String, required: true },
    },
  ],
});

const CategoricalQuestionModel = mongoose.model<CategoricalQuestion>(
  "CategoricalQuestion",
  categoricalQuestionSchema
);

export { CategoricalQuestionModel };
