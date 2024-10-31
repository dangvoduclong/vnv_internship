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
