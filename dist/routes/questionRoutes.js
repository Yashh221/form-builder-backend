"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const questions_controller_1 = require("../controllers/questions.controller");
const questionRouter = (0, express_1.Router)();
questionRouter.route("/addComprehension").post(questions_controller_1.addComprehensionQuestionToForm);
questionRouter.route("/addCategorical").post(questions_controller_1.addCategoricalQuestionToForm);
questionRouter.route("/addCloze").post(questions_controller_1.addClozeQuestionToForm);
questionRouter.route("/getQuestions").get(questions_controller_1.getAllMainQuestions);
exports.default = questionRouter;
