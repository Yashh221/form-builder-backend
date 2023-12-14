"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const questions_controller_1 = require("../controllers/questions.controller");
const questionRouter = (0, express_1.Router)();
questionRouter.route("/addComprehension").post(questions_controller_1.addComprhensionQuestion);
questionRouter.route("/addCategorical").post(questions_controller_1.addCategoricalQusetion);
questionRouter.route("/addCloze").post(questions_controller_1.addClozeQuestion);
questionRouter.route("/getQuestions").get(questions_controller_1.getAllMainQuestions);
exports.default = questionRouter;
