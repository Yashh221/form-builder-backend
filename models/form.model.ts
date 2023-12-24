import mongoose, { Document, Schema } from "mongoose";

interface FormModel extends Document {
  name: string;
  headerImage: string;
  questions: mongoose.Types.ObjectId[];
}

const formSchema = new Schema<FormModel>({
  name: { type: String, required: true },
  headerImage: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "MainQuestion" }],
});

const FormModel = mongoose.model<FormModel>("Form", formSchema);

export { FormModel };
