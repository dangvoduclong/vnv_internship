import * as yup from "yup";

export const categorySchema = yup.object().shape({
  id: yup.string(),
  name: yup.string(),
  title: yup.string(),
  index: yup.number().integer(),
  status: yup.string().oneOf(["active", "inactive"]),
  slug: yup.string(),
  createdAt: yup.date(),
  updatedAt: yup.date(),
  picture: yup.object().shape({
    id: yup.string(),
    uri: yup.string().url(),
    type: yup.string(),
    metadata: yup.object().shape({
      thumbnail: yup.object().shape({
        uri: yup.string().url(),
        key: yup.string(),
      }),
      medium: yup.object().shape({
        uri: yup.string().url(),
        key: yup.string(),
      }),
    }),
    createdAt: yup.date(),
  }),
});
