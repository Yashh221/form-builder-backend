import asyncHandler from "express-async-handler";
import { MainQuestionModel, QuestionType } from "../models/mainquestion.model";
import { ComprehensionQuestionModel } from "../models/comprehension.model";
import { Request, Response } from "express";
import { CategoricalQuestionModel } from "../models/categorical.model";
import { ClozeQuestionModel } from "../models/cloze.model";

export const addComprhensionQuestion = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { passage, options, correctOption, question } = req.body;
      const newComprehensionQuestion = await ComprehensionQuestionModel.create({
        passage,
        question,
        correctOption,
        options,
      });
      const newMainQuestion = await MainQuestionModel.create({
        type: QuestionType.Comprehension,
        comprehensionQuestion: newComprehensionQuestion._id,
      });

      res.status(201).json({
        message: "Comprehension question added successfully",
        newMainQuestion,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export const addCategoricalQusetion = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { categories, items } = req.body;
      const newCategoricalQuestion = new CategoricalQuestionModel({
        categories,
        items,
      });
      const savedCategoricalQuestion = await newCategoricalQuestion.save();
      const mainQuestion = new MainQuestionModel({
        type: QuestionType.Categorical,
        categoricalQuestion: savedCategoricalQuestion._id,
      });

      const savedMainQuestion = await mainQuestion.save();

      res.status(200).json({ savedCategoricalQuestion, savedMainQuestion });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
export const addClozeQuestion = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { question, options, preview } = req.body;
      const newClozeQuestion = new ClozeQuestionModel({
        question,
        options,
        preview,
      });
      const savedClozeQuestion = await newClozeQuestion.save();

      const mainQuestion = new MainQuestionModel({
        type: QuestionType.Cloze,
        clozeQuestion: savedClozeQuestion._id,
      });

      const savedMainQuestion = await mainQuestion.save();

      res.status(200).json({ savedClozeQuestion, savedMainQuestion });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
export const getAllMainQuestions = async (req: Request, res: Response) => {
  try {
    const mainQuestions = await MainQuestionModel.find()
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
