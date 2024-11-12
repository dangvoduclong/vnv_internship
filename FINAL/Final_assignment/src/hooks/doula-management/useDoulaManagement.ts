import {
  getDoulaById,
  getDoulaPackageId,
  getDoulaVoucherId,
  getListDoula,
  getPackageById,
  updateDoula,
} from "../../api/account/doula";
import {
  DoulaGetVoucherIdResponseProps,
  DoulaGetVoucherIdParamsProps,
  DoulaParamsProps,
  DoulaPutPayloadProps,
  DoulaPutResponseProps,
  DoulaResponseProps,
  DoulaGetByIdResponseProps,
  DoulaPackageGetByIdParamsProps,
  DoulaPackageGetByIdResponseProps,
  PackageGetByIdResponseProps,
} from "../../types/doula-management";
import useApi from "../common/useApi";

export const useGetListDoulaManagement = (
  immediate: boolean = false,
  params?: DoulaParamsProps
) => {
  const { data, loading, error, act } = useApi<
    DoulaResponseProps,
    [DoulaParamsProps]
  >(getListDoula, immediate, [params]);

  return { data, loading, error, act };
};

export const useGetDoulaVoucherId = (
  immediate: boolean = false,
  params?: DoulaGetVoucherIdParamsProps
) => {
  const { data, loading, error, act } = useApi<
    DoulaGetVoucherIdResponseProps,
    [DoulaGetVoucherIdParamsProps]
  >(getDoulaVoucherId, immediate, [params]);

  return { data, loading, error, act };
};

export const useGetDoulaById = (id: string, immediate: boolean = false) => {
  const { data, loading, error, act } = useApi<
    DoulaGetByIdResponseProps,
    [string]
  >(getDoulaById, immediate, [id]);

  return { data, loading, error, act };
};

export const useUpdateDoulaManagement = (
  id: string,
  immediate: boolean = false,
  payload?: DoulaPutPayloadProps
) => {
  const { data, loading, error, act } = useApi<
    DoulaPutResponseProps,
    [string, DoulaPutPayloadProps]
  >(updateDoula, immediate, [id, payload]);
  return { data, loading, error, act };
};

export const useGetDoulaPackageId = (
  immediate: boolean = false,
  params?: DoulaPackageGetByIdParamsProps
) => {
  const { data, loading, error, act } = useApi<
    DoulaPackageGetByIdResponseProps,
    [DoulaPackageGetByIdParamsProps]
  >(getDoulaPackageId, immediate, [params]);

  return { data, loading, error, act };
};

export const useGetPackageById = (id: string, immediate: boolean = false) => {
  const { data, loading, error, act } = useApi<
    PackageGetByIdResponseProps,
    [string]
  >(getPackageById, immediate, [id]);

  return { data, loading, error, act };
};
