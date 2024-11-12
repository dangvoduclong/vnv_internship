import * as yup from "yup";
import { commonListResponseSchema } from "../common";

export const adminSchema = yup.object().shape({
  id: yup.string(),
  username: yup.string(),
  firstName: yup.string(),
  lastName: yup.string(),
  role: yup.string(),
  status: yup.string().oneOf(["active", "inactive"]),
  email: yup.string().email(),
  createdAt: yup.string(),
  updatedAt: yup.string(),
  picture: yup
    .object()
    .shape({
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
      createdAt: yup.string(),
    })
    .nullable(),
});

export const adminListSchema = commonListResponseSchema.shape({
  data: yup.array().of(adminSchema),
});

export const putAdminResponseSchema = yup.object().shape({
  message: yup.string(),
  data: yup.boolean().required(),
});

export const postAdminResponseSchema = yup.object().shape({
  message: yup.string(),
  data: yup.boolean().required(),
});

export const deleteAdminResponseSchema = yup.object().shape({
  message: yup.string().optional(),
  data: yup.boolean().required(),
});
