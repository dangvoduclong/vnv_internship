import * as yup from "yup";
import { commonListResponseSchema } from "../common";

export const voucherSchema = yup.object().shape({
  id: yup.string(),
  code: yup.string(),
  description: yup.string(),
  startDate: yup.string(),
  endDate: yup.string(),
  status: yup.string(),
  type: yup.string(),
  amount: yup.string(),
  quantityUse: yup.number(),
  minPayAmount: yup.string(),
  maxDiscountAmount: yup.string(),
  stripeCouponId: yup.string().nullable(),
  createdBy: yup.string(),
  updatedBy: yup.string().nullable(),
  createdAt: yup.string(),
  updatedAt: yup.string(),
  numOfUsed: yup.string(),
});

export const voucherListSchema = commonListResponseSchema.shape({
  data: yup.array().of(voucherSchema),
});

export const postVoucherResponseSchema = yup.object().shape({
  message: yup.string(),
  data: yup
    .object()
    .shape({
      id: yup.string().required(),
      code: yup.string().required(),
      description: yup.string().required(),
      startDate: yup.string().required(),
      endDate: yup.string().required(),
      quantityUse: yup.number().required(),
      type: yup.string().required(),
      amount: yup.string().required(),
      minPayAmount: yup.string().required(),
      maxDiscountAmount: yup.string().required(),
      status: yup.string().required(),
      createdBy: yup.string().required(),
      updatedAt: yup.string().required(),
      createdAt: yup.string().required(),
      stripeCouponId: yup.string().required().nullable(),
      updatedBy: yup.string().required().nullable(),
    })
    .required(),
});

export const putVoucherResponseSchema = yup.object().shape({
  message: yup.string(),
});

export const getVoucherByIdResponseSchema = yup.object().shape({
  message: yup.string(),
  data: yup
    .object()
    .shape({
      id: yup.string().required(),
      code: yup.string().required(),
      description: yup.string().required(),
      startDate: yup.string().required(),
      endDate: yup.string().required(),
      status: yup.string().required(),
      type: yup.string().required(),
      amount: yup.string().required(),
      quantityUse: yup.number().required(),
      minPayAmount: yup.string().required(),
      maxDiscountAmount: yup.string().required(),
      stripeCouponId: yup.string().required().nullable(),
      createdBy: yup.string().required(),
      updatedBy: yup.string().required().nullable(),
      createdAt: yup.string().required(),
      updatedAt: yup.string().required(),
      numOfUsed: yup.string().required(),
    })
    .required(),
});
