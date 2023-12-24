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
exports.getAllMainQuestions = exports.addClozeQuestionToForm = exports.addCategoricalQuestionToForm = exports.addComprehensionQuestionToForm = exports.addForm = void 0;
// mainquestionController.ts
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mainquestion_model_1 = require("../models/mainquestion.model");
const comprehension_model_1 = require("../models/comprehension.model");
const categorical_model_1 = require("../models/categorical.model");
const cloze_model_1 = require("../models/cloze.model");
const form_model_1 = require("../models/form.model");
exports.addForm = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { headerImage, name } = req.body;
        if (!headerImage || !name) {
            res.status(400).json({ message: "Please fill all the details!" });
            return;
        }
        const newForm = yield form_model_1.FormModel.create({
            headerImage,
            name,
            questions: [],
        });
        res.status(201).json({ message: "Form added successfully", newForm });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.addComprehensionQuestionToForm = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { formId, passage, options, correctOption, question } = req.body;
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
        const form = yield form_model_1.FormModel.findByIdAndUpdate(formId, { $push: { questions: newMainQuestion._id } }, { new: true });
        res.status(201).json({
            message: "Comprehension question added to the form successfully",
            newMainQuestion,
            form,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.addCategoricalQuestionToForm = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { formId, categories, items } = req.body;
        const newCategoricalQuestion = yield categorical_model_1.CategoricalQuestionModel.create({
            categories,
            items,
        });
        const newMainQuestion = yield mainquestion_model_1.MainQuestionModel.create({
            type: mainquestion_model_1.QuestionType.Categorical,
            categoricalQuestion: newCategoricalQuestion._id,
        });
        const form = yield form_model_1.FormModel.findByIdAndUpdate(formId, { $push: { questions: newMainQuestion._id } }, { new: true });
        res.status(201).json({
            message: "Categorical question added to the form successfully",
            newMainQuestion,
            form,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.addClozeQuestionToForm = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { formId, question, options, preview } = req.body;
        const newClozeQuestion = yield cloze_model_1.ClozeQuestionModel.create({
            question,
            options,
            preview,
        });
        const newMainQuestion = yield mainquestion_model_1.MainQuestionModel.create({
            type: mainquestion_model_1.QuestionType.Cloze,
            clozeQuestion: newClozeQuestion._id,
        });
        const form = yield form_model_1.FormModel.findByIdAndUpdate(formId, { $push: { questions: newMainQuestion._id } }, { new: true });
        res.status(201).json({
            message: "Cloze question added to the form successfully",
            newMainQuestion,
            form,
        });
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
