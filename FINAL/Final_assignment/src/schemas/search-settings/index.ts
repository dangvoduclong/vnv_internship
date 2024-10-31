import * as yup from "yup";
import { commonListResponseSchema } from "../common";

export const trendingKeywordSchema = yup.object().shape({
  id: yup.string(),
  keyword: yup.string(),
  count: yup.number(),
  isSuggestion: yup.boolean(),
  createdAt: yup.string(),
  updatedAt: yup.string(),
});

export const trendingKeywordListSchema = commonListResponseSchema.shape({
  data: yup.array().of(trendingKeywordSchema), // list item schema
});

export const putResponseSchema = yup.object().shape({
  message: yup.string(),
  data: yup
    .object()
    .shape({
      id: yup.string().required(),
      keyword: yup.string().required(),
      count: yup.number().required(),
      isSuggestion: yup.boolean().required(),
      createdAt: yup.string().required(),
      updatedAt: yup.string().required(),
    })
    .required(),
});

export const postResponseSchema = yup.object().shape({
  message: yup.string().optional(),
  data: yup.boolean().required(),
});

export const deleteResponseSchema = yup.object().shape({
  message: yup.string().optional(),
  data: yup.number().required(),
});
