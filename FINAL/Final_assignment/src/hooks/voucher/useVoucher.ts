import { getListVoucher } from "../../api/voucher";
import { VoucherParamsProps, VoucherResponseProps } from "../../types/voucher";
import useApi from "../common/useApi";

export const useGetListVoucher = (
  immediate: boolean = true,
  params?: VoucherParamsProps
) => {
  const { data, loading, error, act } = useApi<
    VoucherResponseProps,
    [VoucherParamsProps]
  >(getListVoucher, immediate, [params]);
  return { data, loading, error, act };
};
