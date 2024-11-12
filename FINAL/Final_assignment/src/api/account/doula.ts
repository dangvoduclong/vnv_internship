import { END_POINTS } from "../../constants/api-endpoints";
import {
  doulaListSchema,
  DoulaVoucherIdSchema,
  doulaVoucherIdSchema,
  getDoulaByIdResponseSchema,
  getDoulaPackageResponseSchema,
  getPackageByIdResponseSchema,
} from "../../schemas/doula-management";
import {
  DoulaGetByIdResponseProps,
  DoulaGetVoucherIdParamsProps,
  DoulaGetVoucherIdResponseProps,
  DoulaPackageGetByIdParamsProps,
  DoulaPackageGetByIdResponseProps,
  DoulaParamsProps,
  DoulaPutPayloadProps,
  DoulaPutResponseProps,
  DoulaResponseProps,
  PackageGetByIdResponseProps,
} from "../../types/doula-management";
import axiosInstance from "../../utils/axiosConfig";

export const getListDoula = async (params: DoulaParamsProps) => {
  const response = await axiosInstance.get(END_POINTS.DOULA, {
    params,
  });
  return doulaListSchema.cast(response) as DoulaResponseProps;
};

export const getDoulaVoucherId = async (
  params: DoulaGetVoucherIdParamsProps
) => {
  const response = await axiosInstance.get(END_POINTS.DOULA_VOUCHER, {
    params,
  });

  return doulaVoucherIdSchema.cast(response) as DoulaGetVoucherIdResponseProps;
};

export const getDoulaById = async (id: string) => {
  const response = await axiosInstance.get(`${END_POINTS.DOULA}/${id}`);

  return getDoulaByIdResponseSchema.cast(response) as DoulaGetByIdResponseProps;
};

export const updateDoula = async (
  id: string,
  payload: DoulaPutPayloadProps
) => {
  const response = await axiosInstance.put(
    `${END_POINTS.DOULA}/${id}`,
    payload
  );
  return DoulaVoucherIdSchema.cast(response) as DoulaPutResponseProps;
};

export const getDoulaPackageId = async (
  params: DoulaPackageGetByIdParamsProps
) => {
  const response = await axiosInstance.get(END_POINTS.DOULA_PACKAGE, {
    params,
  });

  return getDoulaPackageResponseSchema.cast(
    response
  ) as DoulaPackageGetByIdResponseProps;
};

export const getPackageById = async (id: string) => {
  const response = await axiosInstance.get(`${END_POINTS.DOULA_PACKAGE}/${id}`);
  return getPackageByIdResponseSchema.cast(
    response
  ) as PackageGetByIdResponseProps;
};
