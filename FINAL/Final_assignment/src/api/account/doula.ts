import { END_POINTS } from "../../constants/api-endpoints";
import {
  doulaListSchema,
  getDoulaByIdResponseSchema,
} from "../../schemas/doula-management";
import {
  DoulaGetByIdResponseProps,
  DoulaParamsProps,
  DoulaPutPayloadProps,
  DoulaPutResponseProps,
  DoulaResponseProps,
} from "../../types/doula-management";
import axiosInstance from "../../utils/axiosConfig";

export const getListDoula = async (params: DoulaParamsProps) => {
  const response = await axiosInstance.get(END_POINTS.DOULA, {
    params,
  });
  return doulaListSchema.cast(response) as DoulaResponseProps;
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
  return getDoulaByIdResponseSchema.cast(response) as DoulaPutResponseProps;
};
