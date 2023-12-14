import mongoose, { Document, Schema } from "mongoose";
import { ComprehensionQuestionModel } from "./comprehension.model";
import { CategoricalQuestionModel } from "./categorical.model";
import { ClozeQuestionModel } from "./cloze.model";

enum QuestionType {
  Comprehension = "comprehension",
  Categorical = "categorical",
  Cloze = "cloze",
}

interface MainQuestionModel extends Document {
  type: QuestionType;
  comprehensionQuestion?: mongoose.Types.ObjectId;
  categoricalQuestion?: mongoose.Types.ObjectId;
  clozeQuestion?: mongoose.Types.ObjectId;
}

const mainQuestionSchema = new Schema<MainQuestionModel>({
  type: { type: String, enum: Object.values(QuestionType), required: true },
  comprehensionQuestion: {
    type: Schema.Types.ObjectId,
    ref: "ComprehensionQuestion",
  },
  categoricalQuestion: {
    type: Schema.Types.ObjectId,
    ref: "CategoricalQuestion",
  },
  clozeQuestion: { type: Schema.Types.ObjectId, ref: "ClozeQuestion" },
});

const MainQuestionModel = mongoose.model<MainQuestionModel>(
  "MainQuestion",
  mainQuestionSchema
);

export { MainQuestionModel, QuestionType };
