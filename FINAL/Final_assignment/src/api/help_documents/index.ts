import { END_POINTS } from "../../constants/api-endpoints";
import {
  deleteHelpDocumentResponseSchema,
  postHelpDocumentResponseSchema,
  putHelpDocumentResponseSchema,
  helpDocumentListSchema,
} from "../../schemas/help-documents";
import {
  HelpDocumentDeleteResponseProps,
  HelpDocumentParamsProps,
  HelpDocumentPayloadProps,
  HelpDocumentPostResponseProps,
  HelpDocumentPutResponseProps,
  HelpDocumentResponseProps,
} from "../../types/help-documents";
import axiosInstance from "../../utils/axiosConfig";

export const getListHelpDocuments = async (params: HelpDocumentParamsProps) => {
  const response = await axiosInstance.get(END_POINTS.HELP_DOCS, {
    params,
  });

  return helpDocumentListSchema.cast(response) as HelpDocumentResponseProps;
};

export const createHelpDocuments = async (
  payload: HelpDocumentPayloadProps
) => {
  const response = await axiosInstance.post(END_POINTS.HELP_DOCS, payload);

  return postHelpDocumentResponseSchema.cast(
    response
  ) as HelpDocumentPostResponseProps;
};

export const updateHelpDocuments = async (
  id: string,
  payload: HelpDocumentPayloadProps
) => {
  const response = await axiosInstance.put(
    `${END_POINTS.HELP_DOCS}/${id}`,
    payload
  );

  return putHelpDocumentResponseSchema.cast(
    response
  ) as HelpDocumentPutResponseProps;
};

export const deleteHelpDocuments = async (id: string) => {
  const response = await axiosInstance.delete(`${END_POINTS.HELP_DOCS}/${id}`);

  return deleteHelpDocumentResponseSchema.cast(
    response
  ) as HelpDocumentDeleteResponseProps;
};
