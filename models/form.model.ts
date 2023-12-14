import mongoose, { Document, Schema } from "mongoose";
import { MainQuestionModel } from "./mainquestion.model";

interface FormModel extends Document {
  name: string;
  image: string;
  questions: mongoose.Types.ObjectId[];
}

const formSchema = new Schema<FormModel>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "MainQuestion" }],
});

const FormModel = mongoose.model<FormModel>("Form", formSchema);

export { FormModel };
