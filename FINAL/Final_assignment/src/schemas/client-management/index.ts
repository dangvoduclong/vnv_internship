import * as yup from "yup";

export const userProfileSchema = yup.object().shape({
  fullName: yup.string(),
  id: yup.string(),
  firstName: yup.string(),
  middleName: yup.string().nullable(),
  lastName: yup.string(),
  birthDate: yup.date(),
  email: yup.string().email(),
  phoneNumber: yup.string(),
  googleId: yup.string().nullable(),
  appleId: yup.string().nullable(),
  status: yup.string().oneOf(["active", "inactive"]),
  verifiedEmail: yup.boolean(),
  countryCode: yup.string(),
  verifiedPhoneNumber: yup.boolean(),
  updatedBy: yup.string().nullable(),
  deletedBy: yup.string().nullable(),
  deActiveAt: yup.date().nullable(),
  isExternal: yup.boolean(),
  createdAt: yup.date(),
  updatedAt: yup.date(),
  address: yup.object().shape({
    fullAddress: yup.string(),
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
