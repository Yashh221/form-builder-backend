"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMainQuestions = exports.addClozeQuestion = exports.addCategoricalQusetion = exports.addComprhensionQuestion = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mainquestion_model_1 = require("../models/mainquestion.model");
const comprehension_model_1 = require("../models/comprehension.model");
const categorical_model_1 = require("../models/categorical.model");
const cloze_model_1 = require("../models/cloze.model");
exports.addComprhensionQuestion = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { passage, options, correctOption, question } = req.body;
        const newComprehensionQuestion = yield comprehension_model_1.ComprehensionQuestionModel.create({
            passage,
            question,
            correctOption,
            options,
        });
        const newMainQuestion = yield mainquestion_model_1.MainQuestionModel.create({
            type: mainquestion_model_1.QuestionType.Comprehension,
            comprehensionQuestion: newComprehensionQuestion._id,
        });
        res.status(201).json({
            message: "Comprehension question added successfully",
            newMainQuestion,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.addCategoricalQusetion = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categories, items } = req.body;
        const newCategoricalQuestion = new categorical_model_1.CategoricalQuestionModel({
            categories,
            items,
        });
        const savedCategoricalQuestion = yield newCategoricalQuestion.save();
        const mainQuestion = new mainquestion_model_1.MainQuestionModel({
            type: mainquestion_model_1.QuestionType.Categorical,
            categoricalQuestion: savedCategoricalQuestion._id,
        });
        const savedMainQuestion = yield mainQuestion.save();
        res.status(200).json({ savedCategoricalQuestion, savedMainQuestion });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.addClozeQuestion = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question, options, preview } = req.body;
        const newClozeQuestion = new cloze_model_1.ClozeQuestionModel({
            question,
            options,
            preview,
        });
        const savedClozeQuestion = yield newClozeQuestion.save();
        const mainQuestion = new mainquestion_model_1.MainQuestionModel({
            type: mainquestion_model_1.QuestionType.Cloze,
            clozeQuestion: savedClozeQuestion._id,
        });
        const savedMainQuestion = yield mainQuestion.save();
        res.status(200).json({ savedClozeQuestion, savedMainQuestion });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
const getAllMainQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mainQuestions = yield mainquestion_model_1.MainQuestionModel.find()
            .populate({
            path: "comprehensionQuestion",
            model: "ComprehensionQuestion",
        })
            .populate({
            path: "categoricalQuestion",
            model: "CategoricalQuestion",
        })
            .populate({
            path: "clozeQuestion",
            model: "ClozeQuestion",
        });
        res.status(200).json({ mainQuestions });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllMainQuestions = getAllMainQuestions;
