import yup from "../../utils/yup";
import { QueryParamsProps } from "./../common/QueryParamsProps";
import {
  deleteSearchSettingResponseSchema,
  postSearchSettingResponseSchema,
  putSearchSettingResponseSchema,
  trendingKeywordListSchema,
} from "../../schemas/search-settings";

export interface SearchSettingParamsProps extends QueryParamsProps {
  id?: string;
  keyword?: string;
  count?: number;
  createdAt?: string;
  isSuggestion?: boolean;
}

export type SearchSettingResponseProps = yup.InferType<
  typeof trendingKeywordListSchema
>;

export type SearchSettingPayloadProps = Omit<
  SearchSettingParamsProps,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "page"
  | "limit"
  | "search"
  | "sort"
  | "embed"
  | "f_type"
>;

export type SearchSettingPutResponseProps = yup.InferType<
  typeof putSearchSettingResponseSchema
>;

export type SearchSettingPostResponseProps = yup.InferType<
  typeof postSearchSettingResponseSchema
>;

export type SearchSettingDeleteResponseProps = yup.InferType<
  typeof deleteSearchSettingResponseSchema
>;
