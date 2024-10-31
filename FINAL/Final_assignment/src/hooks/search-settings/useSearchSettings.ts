import {
  createSearchSettings,
  deleteSearchSettings,
  getListSearchSettings,
  updateSearchSettings,
} from "../../api/search_settings";
import {
  SearchSettingDeleteResponseProps,
  SearchSettingParamsProps,
  SearchSettingPayloadProps,
  SearchSettingPostResponseProps,
  SearchSettingPutResponseProps,
  SearchSettingResponseProps,
} from "../../types/search-settings";
import useApi from "../common/useApi";

export const useGetListSearchSettings = (
  immediate: boolean = true,
  params?: SearchSettingParamsProps
) => {
  const { data, loading, error, act } = useApi<
    SearchSettingResponseProps,
    [SearchSettingParamsProps]
  >(getListSearchSettings, immediate, [params]);

  return { data, loading, error, act };
};

export const useCreateSearchSettings = (
  immediate: boolean = false,
  payload?: SearchSettingPayloadProps
) => {
  const { data, loading, error, act } = useApi<
    SearchSettingPostResponseProps,
    [SearchSettingPayloadProps]
  >(createSearchSettings, immediate, [payload]);

  return { data, loading, error, act };
};

export const useUpdateSearchSettings = (
  id: string,
  immediate: boolean = false,
  payload?: SearchSettingPayloadProps
) => {
  const { data, loading, error, act } = useApi<
    SearchSettingPutResponseProps,
    [string, SearchSettingPayloadProps]
  >(updateSearchSettings, immediate, [id, payload]);

  return { data, loading, error, act };
};

export const useDeleteSearchSettings = (
  id: string,
  immediate: boolean = false
) => {
  const { data, loading, error, act } = useApi<
    SearchSettingDeleteResponseProps,
    [string]
  >(deleteSearchSettings, immediate, [id]);

  return { data, loading, error, act };
};
