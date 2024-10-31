import * as yup from "yup";

export const postSchema = yup.object().shape({
  id: yup.string(),
  title: yup.string(),
  content: yup.string(),
  status: yup.string().oneOf(["active", "inactive"]),
  createdAt: yup.date(),
  updatedAt: yup.date(),
});
