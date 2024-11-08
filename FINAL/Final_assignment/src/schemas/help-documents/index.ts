import * as yup from "yup";
import { commonListResponseSchema } from "../common";

export const helpDocumentSchema = yup.object().shape({
  id: yup.string(),
  title: yup.string(),
  content: yup.string(),
  status: yup.string().oneOf(["active", "inactive"]),
  createdAt: yup.string(),
  updatedAt: yup.string(),
});

export const helpDocumentListSchema = commonListResponseSchema.shape({
  data: yup.array().of(helpDocumentSchema),
});

export const putHelpDocumentResponseSchema = yup.object().shape({
  message: yup.string(),
  data: yup
    .object()
    .shape({
      id: yup.string().required(),
      title: yup.string().required(),
      content: yup.string().required(),
      status: yup.string().required(),
      createdAt: yup.string().required(),
      updatedAt: yup.string().required(),
      deletedAt: yup.string().required().nullable(),
    })
    .required(),
});

export const postHelpDocumentResponseSchema = yup.object().shape({
  message: yup.string(),
  data: yup
    .object()
    .shape({
      id: yup.string().required(),
      title: yup.string().required(),
      content: yup.string().required(),
      status: yup.string().required(),
      createdAt: yup.string().required(),
      updatedAt: yup.string().required(),
      deletedAt: yup.string().required().nullable(),
    })
    .required(),
});

export const deleteHelpDocumentResponseSchema = yup.object().shape({
  message: yup.string().optional(),
  data: yup.boolean().required(),
});
