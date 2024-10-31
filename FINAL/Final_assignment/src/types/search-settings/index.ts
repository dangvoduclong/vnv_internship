import yup from "../../utils/yup";
import { QueryParamsProps } from "./../common/QueryParamsProps";
import {
  deleteResponseSchema,
  postResponseSchema,
  putResponseSchema,
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
  typeof putResponseSchema
>;

export type SearchSettingPostResponseProps = yup.InferType<
  typeof postResponseSchema
>;

export type SearchSettingDeleteResponseProps = yup.InferType<
  typeof deleteResponseSchema
>;
