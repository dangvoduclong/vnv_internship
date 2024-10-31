import { END_POINTS } from "../../constants/api-endpoints";
import { voucherListSchema } from "../../schemas/voucher";
import { VoucherParamsProps, VoucherResponseProps } from "../../types/voucher";
import axiosInstance from "../../utils/axiosConfig";

export const getListVoucher = async (params: VoucherParamsProps) => {
  const response = await axiosInstance.get(END_POINTS.VOUCHER, {
    params,
  });

  return voucherListSchema.cast(response) as VoucherResponseProps;
};
