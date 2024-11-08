import {
  createVoucher,
  getListVoucher,
  getVoucherById,
  updateVoucher,
} from "../../api/voucher";
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
import useApi from "../common/useApi";

export const useGetListVoucher = (
  immediate: boolean = false,
  params?: VoucherParamsProps
) => {
  const { data, loading, error, act } = useApi<
    VoucherResponseProps,
    [VoucherParamsProps]
  >(getListVoucher, immediate, [params]);

  return { data, loading, error, act };
};

export const useCreateVoucher = (
  immediate: boolean = false,
  payload?: VoucherPayloadProps
) => {
  const { data, loading, error, act } = useApi<
    VoucherPostResponseProps,
    [VoucherPayloadProps]
  >(createVoucher, immediate, [payload]);
  return { data, loading, error, act };
};

export const useUpdateVoucher = () => {
  const { data, loading, error, act } = useApi<
    VoucherPutResponseProps,
    [string, VoucherPutPayloadProps]
  >(updateVoucher, false);
  return { data, loading, error, act };
};

export const useGetVoucherById = (id: string, immediate: boolean = false) => {
  const { data, loading, error, act } = useApi<
    VoucherGetByIdResponseProps,
    [string]
  >(getVoucherById, immediate, [id]);
  return { data, loading, error, act };
};
