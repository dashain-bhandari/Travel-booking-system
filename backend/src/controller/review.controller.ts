import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
import {
  createReview,
  deleteReview,
  findReview,
  // findReviewByTeam,
  findAllReview,
  findAndUpdateReview,
  findReviewByExpedition,
  deleteManyReview,
} from "../service/review.service";
import {
  CreateReviewInput,
  UpdateReviewInput,
} from "../schema/review.schema";

var colors = require("colors");

export async function createReviewHandler(
  req: Request<{}, {}, CreateReviewInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
   
    const item :any= await createReview({ ...body });
    console.log(body);
    console.log(item);
    return res.status(201).json({
      status: "success",
      msg: "Create success",
      data: item,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateReviewHandler(
  req: Request<UpdateReviewInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    // const image = req.file;

    const ReviewId = req.params.ReviewId;
    const item = await findReview({ reviewId:ReviewId });

    if (!item) {
      next(new AppError("item does not exist", 404));
      return;
    }
    const updatedItem = await findAndUpdateReview(
      { ReviewId },
      { ...req.body },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedItem,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    next(new AppError(error.message, 500));
  }
}

export async function getReviewHandler(
  req: Request<UpdateReviewInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const ReviewId = req.params.ReviewId;
    const item = await findReview({ reviewId:ReviewId });

    if (!item) {
      next(new AppError("item does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: item,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteReviewHandler(
  req: Request<UpdateReviewInput["params"]>,
  res: Response,
  next: NextFunction
) {
  try {

    const ReviewId = req.params.ReviewId;
    const item = await findReview({ ReviewId });
console.log(item)
    if (!item) {
      next(new AppError("item does not exist", 404));
    }

    await deleteReview({ reviewId:ReviewId });
    return res.json({
      status: "success",
      msg: "Delete success",
      data: {},
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllReviewHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const results = await findAllReview();
    return res.json({
      status: "success",
      msg: "Get all item success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

// export async function getAllReviewByTeamHandler(
//   req: Request<UpdateReviewInput["params"]>,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const teamId = req.params.ReviewId;
//     const iternarnaries = await findReviewByTeam({ team: teamId });
//     console.log(iternarnaries);

//     return res.json({
//       status: "success",
//       msg: "Get success",
//       data: iternarnaries,
//     });
//   } catch (error: any) {
//     console.error(colors.red("msg:", error.message));
//     next(new AppError("Internal server error", 500));
//   }
// }


export async function getReviewByExpeditionHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const expeditionId = req.params.expeditionId;
    const results = await findReviewByExpedition({ expedition: expeditionId });

    return res.json({
      status: "success",
      msg: "Get success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteManyReviewHandler(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("hii")
   if(req.body.id){
    await deleteManyReview({ reviewId:{$in:req.body.id} });
    return res.json({
      status: "success",
      msg: "Delete success",
      data: {},
    });
   }
   else{
    return res.json({
      status: "error",
      msg: "Delete error",
      data: {},
    });
   }
   
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}