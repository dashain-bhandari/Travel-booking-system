import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import CategoryModel, { CategoryDocument, CategoryInput } from "../models/category.model";

export async function createCategory(input: CategoryInput) {
  const result = await CategoryModel.create(input);
  return result;
}

export async function findCategory(query: FilterQuery<CategoryDocument>, options: QueryOptions = { lean: true }) {
  const result = await CategoryModel.findOne(query, {}, options).populate("collections");
  return result;
}

export async function findManyCategory(query: FilterQuery<CategoryDocument>, options: QueryOptions = { lean: true }) {
  const result = await CategoryModel.find(query, {}, options).populate("collections");
  return result;
}

export async function findAndUpdateCategory(query: FilterQuery<CategoryDocument>, update: UpdateQuery<CategoryDocument>, options: QueryOptions) {
  return CategoryModel.findOneAndUpdate(query, update, options).populate("collections");
}

export async function deleteCategory(query: FilterQuery<CategoryDocument>) {
  return CategoryModel.deleteOne(query);
}

export async function findAllCategory() {
  const result = await CategoryModel.find().sort({ createdAt: -1 }).populate("collections"); 
  return result;
}
