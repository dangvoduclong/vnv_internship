import * as yup from "yup";
import { commonListResponseSchema } from "../common";

export const doulaSchema = yup.object().shape({
  id: yup.string(),
  title: yup.string(),
  status: yup.string().oneOf(["active", "inactive"]),
  user: yup.object().shape({
    fullName: yup.string(),
    firstName: yup.string(),
    middleName: yup.string().nullable(),
    lastName: yup.string(),
    birthDate: yup.string(),
    email: yup.string().email(),
    countryCode: yup.string().nullable(),
    phoneNumber: yup.string().nullable(),
  }),
  address: yup.object().shape({
    id: yup.string(),
    fullAddress: yup.string(),
  }),
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

export const doulaListSchema = commonListResponseSchema.shape({
  data: yup.array().of(doulaSchema),
});

export const putDoulaResponseSchema = yup.object().shape({
  message: yup.string(),
});

export const getDoulaByIdResponseSchema = yup.object().shape({
  message: yup.string(),
  data: yup
    .object()
    .shape({
      id: yup.string().required(),
      title: yup.string().required(),
      description: yup.string().required(),
      status: yup.string().required(),
      user: yup
        .object()
        .shape({
          fullName: yup.string().required(),
          firstName: yup.string().required(),
          middleName: yup.string().nullable(),
          lastName: yup.string().required(),
          birthDate: yup.date().required(),
          email: yup.string().email().required(),
          countryCode: yup.string().required(),
          phoneNumber: yup.string().required(),
        })
        .required(),
      address: yup
        .object()
        .shape({
          id: yup.string().required(),
          fullAddress: yup.string().required(),
        })
        .required(),
      picture: yup
        .object()
        .shape({
          id: yup.string().required(),
          uri: yup.string().url().required(),
          type: yup.string().required(),
        })
        .required(),
    })
    .required(),
});
