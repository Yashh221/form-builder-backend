// mainquestionController.ts
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { MainQuestionModel, QuestionType } from "../models/mainquestion.model";
import { ComprehensionQuestionModel } from "../models/comprehension.model";
import { CategoricalQuestionModel } from "../models/categorical.model";
import { ClozeQuestionModel } from "../models/cloze.model";
import { FormModel } from "../models/form.model";

export const addForm = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { headerImage, name } = req.body;
    if (!headerImage || !name) {
      res.status(400).json({ message: "Please fill all the details!" });
      return;
    }
    const newForm = await FormModel.create({
      headerImage,
      name,
      questions: [],
    });
    res.status(201).json({ message: "Form added successfully", newForm });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const addComprehensionQuestionToForm = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { formId, passage, options, correctOption, question } = req.body;

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

      const form = await FormModel.findByIdAndUpdate(
        formId,
        { $push: { questions: newMainQuestion._id } },
        { new: true }
      );

      res.status(201).json({
        message: "Comprehension question added to the form successfully",
        newMainQuestion,
        form,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export const addCategoricalQuestionToForm = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { formId, categories, items } = req.body;

      const newCategoricalQuestion = await CategoricalQuestionModel.create({
        categories,
        items,
      });

      const newMainQuestion = await MainQuestionModel.create({
        type: QuestionType.Categorical,
        categoricalQuestion: newCategoricalQuestion._id,
      });

      const form = await FormModel.findByIdAndUpdate(
        formId,
        { $push: { questions: newMainQuestion._id } },
        { new: true }
      );

      res.status(201).json({
        message: "Categorical question added to the form successfully",
        newMainQuestion,
        form,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export const addClozeQuestionToForm = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { formId, question, options, preview } = req.body;

      const newClozeQuestion = await ClozeQuestionModel.create({
        question,
        options,
        preview,
      });

      const newMainQuestion = await MainQuestionModel.create({
        type: QuestionType.Cloze,
        clozeQuestion: newClozeQuestion._id,
      });

      const form = await FormModel.findByIdAndUpdate(
        formId,
        { $push: { questions: newMainQuestion._id } },
        { new: true }
      );

      res.status(201).json({
        message: "Cloze question added to the form successfully",
        newMainQuestion,
        form,
      });
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
