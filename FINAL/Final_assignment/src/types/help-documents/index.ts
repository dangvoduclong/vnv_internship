import {
  deleteHelpDocumentResponseSchema,
  helpDocumentListSchema,
  postHelpDocumentResponseSchema,
  putHelpDocumentResponseSchema,
} from "../../schemas/help-documents";
import { QueryParamsProps } from "../common/QueryParamsProps";
import * as yup from "yup";
export interface HelpDocumentParamsProps extends QueryParamsProps {
  id?: string;
  title?: string;
  content?: string;
  status?: string;
  createdAt?: string;
}

export type HelpDocumentResponseProps = yup.InferType<
  typeof helpDocumentListSchema
>;

export type HelpDocumentPayloadProps = Omit<
  HelpDocumentParamsProps,
  | "page"
  | "limit"
  | "search"
  | "sort"
  | "embed"
  | "f_type"
  | "id"
  | "createdAt"
  | "updatedAt"
>;

export type HelpDocumentPutResponseProps = yup.InferType<
  typeof putHelpDocumentResponseSchema
>;

export type HelpDocumentDeleteResponseProps = yup.InferType<
  typeof deleteHelpDocumentResponseSchema
>;

export type HelpDocumentPostResponseProps = yup.InferType<
  typeof postHelpDocumentResponseSchema
>;
