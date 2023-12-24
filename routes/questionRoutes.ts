import { Router } from "express";
import {
  addCategoricalQuestionToForm,
  addClozeQuestionToForm,
  addComprehensionQuestionToForm,
  getAllMainQuestions,
} from "../controllers/questions.controller";
const questionRouter = Router();

questionRouter.route("/addComprehension").post(addComprehensionQuestionToForm);
questionRouter.route("/addCategorical").post(addCategoricalQuestionToForm);
questionRouter.route("/addCloze").post(addClozeQuestionToForm);
questionRouter.route("/getQuestions").get(getAllMainQuestions);
export default questionRouter;
