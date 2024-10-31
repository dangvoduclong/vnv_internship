import * as yup from "yup";
import { commonListResponseSchema } from "../common";

export const adminSchema = yup.object().shape({
  id: yup.string(),
  username: yup.string(),
  firstName: yup.string(),
  lastName: yup.string(),
  role: yup.string().oneOf(["superAdmin", "admin", "user"]),
  status: yup.string().oneOf(["active", "inactive"]),
  email: yup.string().email(),
  createdAt: yup.string(),
  updatedAt: yup.string(),
  picture: yup.string().nullable(),
});

export const adminListSchema = commonListResponseSchema.shape({
  data: yup.array().of(adminSchema),
});
