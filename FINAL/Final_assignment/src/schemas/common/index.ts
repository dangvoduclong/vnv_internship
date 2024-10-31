import yup from "../../utils/yup";

export const commonListResponseSchema = yup.object().shape({
  metadata: yup.object().shape({
    page: yup.number(),
    limit: yup.number(),
    totalPages: yup.number(),
    totalCount: yup.number(),
    hasNextPage: yup.boolean(),
  }),
  message: yup.string(),
});
