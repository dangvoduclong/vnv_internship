import { END_POINTS } from "../../constants/api-endpoints";
import {
  getVoucherByIdResponseSchema,
  postVoucherResponseSchema,
  putVoucherResponseSchema,
  voucherListSchema,
} from "../../schemas/voucher";
import {
  VoucherGetByIdParamsProps,
  VoucherGetByIdResponseProps,
  VoucherParamsProps,
  VoucherPayloadProps,
  VoucherPostResponseProps,
  VoucherPutPayloadProps,
  VoucherPutResponseProps,
  VoucherResponseProps,
} from "../../types/voucher";
import axiosInstance from "../../utils/axiosConfig";

export const getListVoucher = async (params: VoucherParamsProps) => {
  const response = await axiosInstance.get(END_POINTS.VOUCHER, {
    params,
  });

  return voucherListSchema.cast(response) as VoucherResponseProps;
};

export const createVoucher = async (payload: VoucherPayloadProps) => {
  const response = await axiosInstance.post(END_POINTS.VOUCHER, payload);

  return postVoucherResponseSchema.cast(response) as VoucherPostResponseProps;
};

export const updateVoucher = async (
  id: string,
  payload: VoucherPutPayloadProps
) => {
  const response = await axiosInstance.put(`${END_POINTS.VOUCHER}/${id}`, {
    ...payload,
  });
  return putVoucherResponseSchema.cast(response) as VoucherPutResponseProps;
};

export const getVoucherById = async (id: string) => {
  const response = await axiosInstance.get(`${END_POINTS.VOUCHER}/${id}`);
  return getVoucherByIdResponseSchema.cast(
    response
  ) as VoucherGetByIdResponseProps;
};
