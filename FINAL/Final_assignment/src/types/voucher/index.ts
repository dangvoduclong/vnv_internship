import {
  getVoucherByIdResponseSchema,
  postVoucherResponseSchema,
  putVoucherResponseSchema,
  voucherListSchema,
} from "../../schemas/voucher";
import { QueryParamsProps } from "../common/QueryParamsProps";
import * as yup from "yup";

export interface VoucherParamsProps extends QueryParamsProps {
  id?: string;
  code?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  numOfUsed?: string;
}

export type VoucherResponseProps = yup.InferType<typeof voucherListSchema>;

export type VoucherPayloadProps = {
  amount: string;
  code: string;
  description: string;
  endDate: string;
  maxDiscountAmount: string;
  minPayAmount: string;
  quantityUse: string;
  startDate: string;
  status: string;
  type: string;
};

export type VoucherPutPayloadProps = {
  status: string;
};

export type VoucherPutResponseProps = yup.InferType<
  typeof putVoucherResponseSchema
>;

export type VoucherPostResponseProps = yup.InferType<
  typeof postVoucherResponseSchema
>;

export interface VoucherGetByIdParamsProps {
  code?: string;
  startDate?: string;
  endDate?: string;
  numOfUsed?: string;
  type: string;
  amount: string;
  minPayAmount: string;
  maxDiscountAmount: string;
}

export type VoucherGetByIdResponseProps = yup.InferType<
  typeof getVoucherByIdResponseSchema
>;
