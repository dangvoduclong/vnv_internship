import * as yup from "yup";

export const articleSchema = yup.object().shape({
  id: yup.string(),
  slug: yup.string(),
  title: yup.string(),
  content: yup.string(),
  status: yup.string().oneOf(["published", "draft"]),
  type: yup.string(),
  author: yup.string(),
  categoryId: yup.string(),
  timeToRead: yup.number().positive(),
  index: yup.number().integer(),
  references: yup.string().nullable(),
  createdAt: yup.date(),
  updatedAt: yup.date(),
  category: yup.object().shape({
    id: yup.string(),
    name: yup.string(),
  }),
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
