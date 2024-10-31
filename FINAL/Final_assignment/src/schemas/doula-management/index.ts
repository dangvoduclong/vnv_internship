import * as yup from "yup";

export const userDetailSchema = yup.object().shape({
  id: yup.string(),
  title: yup.string(),
  status: yup.string().oneOf(["active", "inactive"]),
  user: yup.object().shape({
    fullName: yup.string(),
    firstName: yup.string(),
    middleName: yup.string().nullable(),
    lastName: yup.string(),
    birthDate: yup.date(),
    email: yup.string().email(),
    countryCode: yup.string(),
    phoneNumber: yup.string(),
  }),
  address: yup.object().shape({
    id: yup.string(),
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
