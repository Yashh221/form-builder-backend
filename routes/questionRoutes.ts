import { Router } from "express";
import {
  addCategoricalQusetion,
  addClozeQuestion,
  addComprhensionQuestion,
  getAllMainQuestions,
} from "../controllers/questions.controller";
const questionRouter = Router();

questionRouter.route("/addComprehension").post(addComprhensionQuestion);
questionRouter.route("/addCategorical").post(addCategoricalQusetion);
questionRouter.route("/addCloze").post(addClozeQuestion);
questionRouter.route("/getQuestions").get(getAllMainQuestions);
export default questionRouter;
