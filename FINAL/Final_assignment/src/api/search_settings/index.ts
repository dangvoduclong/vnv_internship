import { END_POINTS } from "../../constants/api-endpoints";
import {
  deleteSearchSettingResponseSchema,
  postSearchSettingResponseSchema,
  putSearchSettingResponseSchema,
  trendingKeywordListSchema,
} from "../../schemas/search-settings";
import {
  SearchSettingDeleteResponseProps,
  SearchSettingParamsProps,
  SearchSettingPayloadProps,
  SearchSettingPostResponseProps,
  SearchSettingPutResponseProps,
  SearchSettingResponseProps,
} from "../../types/search-settings";
import axiosInstance from "../../utils/axiosConfig";

export const getListSearchSettings = async (
  params: SearchSettingParamsProps
) => {
  const response = await axiosInstance.get(END_POINTS.SETTINGS, {
    params,
  });

  return trendingKeywordListSchema.cast(response) as SearchSettingResponseProps;
};

export const createSearchSettings = async (
  payload: SearchSettingPayloadProps
) => {
  const response = await axiosInstance.post(END_POINTS.SETTINGS, payload);

  return postSearchSettingResponseSchema.cast(
    response
  ) as SearchSettingPostResponseProps;
};

export const updateSearchSettings = async (
  id: string,
  payload: SearchSettingPayloadProps
) => {
  const response = await axiosInstance.put(
    `${END_POINTS.SETTINGS}/${id}`,
    payload
  );

  return putSearchSettingResponseSchema.cast(
    response
  ) as SearchSettingPutResponseProps;
};

export const deleteSearchSettings = async (id: string) => {
  const response = await axiosInstance.delete(`${END_POINTS.SETTINGS}/${id}`);

  return deleteSearchSettingResponseSchema.cast(
    response
  ) as SearchSettingDeleteResponseProps;
};
