import {
  createHelpDocuments,
  deleteHelpDocuments,
  getListHelpDocuments,
  updateHelpDocuments,
} from "../../api/help_documents";
import {
  HelpDocumentDeleteResponseProps,
  HelpDocumentParamsProps,
  HelpDocumentPayloadProps,
  HelpDocumentPostResponseProps,
  HelpDocumentPutResponseProps,
  HelpDocumentResponseProps,
} from "../../types/help-documents";

import useApi from "../common/useApi";

export const useGetListHelpDocuments = (
  immediate: boolean = false,
  params?: HelpDocumentParamsProps
) => {
  const { data, loading, error, act } = useApi<
    HelpDocumentResponseProps,
    [HelpDocumentParamsProps]
  >(getListHelpDocuments, immediate, [params]);
  return { data, loading, error, act };
};

export const useCreateHelpDocuments = (
  immediate: boolean = false,
  payload?: HelpDocumentPayloadProps
) => {
  const { data, loading, error, act } = useApi<
    HelpDocumentPostResponseProps,
    [HelpDocumentPayloadProps]
  >(createHelpDocuments, immediate, [payload]);

  return { data, loading, error, act };
};

export const useUpdateHelpDocuments = (
  id: string,
  immediate: boolean = false,
  payload?: HelpDocumentPayloadProps
) => {
  const { data, loading, error, act } = useApi<
    HelpDocumentPutResponseProps,
    [string, HelpDocumentPayloadProps]
  >(updateHelpDocuments, immediate, [id, payload]);

  return { data, loading, error, act };
};

export const useDeleteHelpDocuments = (
  id: string,
  immediate: boolean = false
) => {
  const { data, loading, error, act } = useApi<
    HelpDocumentDeleteResponseProps,
    [string]
  >(deleteHelpDocuments, immediate, [id]);

  return { data, loading, error, act };
};
