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

export const DoulaVoucherIdSchema = yup.object().shape({
  id: yup.string().required(),
  doulaId: yup.string().required(),
  voucherId: yup.string().required(),
  status: yup.string().required(),
  createdAt: yup.string(),
  doulaUser: yup
    .object()
    .shape({
      fullName: yup.string().required(),
      id: yup.string().required(),
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      middleName: yup.string().nullable(),
    })
    .required(),
});

export const doulaVoucherIdSchema = commonListResponseSchema.shape({
  data: yup.array().of(DoulaVoucherIdSchema),
});

export const getDoulaByIdResponseSchema = yup.object().shape({
  message: yup.string(),
  data: yup.object().shape({
    address: yup
      .object()
      .shape({
        fullAddress: yup.string().required(),
        id: yup.string().required(),
      })
      .required(),
    id: yup.string().required(),
    businessName: yup.string().nullable(),
    categories: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.string().required(),
          name: yup.string().required(),
          title: yup.string().required(),
          picture: yup
            .object()
            .shape({
              createdAt: yup.string().required(),
              id: yup.string().required(),
              metadata: yup.object().shape({
                thumbnail: yup.object().shape({
                  key: yup.string().required(),
                  uri: yup.string().url().required(),
                }),
                medium: yup.object().shape({
                  key: yup.string().required(),
                  uri: yup.string().url().required(),
                }),
              }),
              type: yup.string().required(),
              uri: yup.string().url().required(),
            })
            .nullable(),
        })
      )
      .required(),
    cometChatUid: yup.string().required(),

    createdAt: yup.string().required(),

    deletedAt: yup.string().nullable(),
    description: yup.string().nullable(),

    isTrialed: yup.boolean().required(),

    photos: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.string().required(),
          media: yup.object().shape({
            createdAt: yup.string().required(),
            id: yup.string().required(),
            metadata: yup.object().shape({
              thumbnail: yup.object().shape({
                key: yup.string().required(),
                uri: yup.string().url().required(),
              }),
              medium: yup.object().shape({
                key: yup.string().required(),
                uri: yup.string().url().required(),
              }),
            }),
            type: yup.string().required(),
            uri: yup.string().url().required(),
          }),
        })
      )
      .nullable(),

    picture: yup
      .object()
      .shape({
        createdAt: yup.string().required(),
        id: yup.string().required(),
        metadata: yup.object().shape({
          thumbnail: yup.object().shape({
            key: yup.string().required(),
            uri: yup.string().url().required(),
          }),
          medium: yup.object().shape({
            key: yup.string().required(),
            uri: yup.string().url().required(),
          }),
        }),
        type: yup.string().required(),
        uri: yup.string().url().required(),
      })
      .nullable(),

    qualifications: yup.array().of(yup.string()).nullable(),

    starAvg: yup.string().nullable(),

    status: yup.string().oneOf(["active", "inactive"]).required(),

    stripeCustomerId: yup.string().nullable(),

    title: yup.string().required(),

    updatedAt: yup.string().required(),

    user: yup
      .object()
      .shape({
        fullName: yup.string().required(),
        id: yup.string().required(),
        firstName: yup.string().required(),
        lastName: yup.string().nullable(),
        middleName: yup.string().nullable(),
        birthDate: yup.string().required(),
        countryCode: yup.string().nullable(),
        email: yup.string().email().required(),
        phoneNumber: yup.string().nullable(),
      })
      .required(),
  }),
});

export const DoulaPackagesResponseSchema = yup.object().shape({
  createdAt: yup.string(),
  doula: yup.object().shape({
    id: yup.string(),
    user: yup.object().shape({
      firstName: yup.string(),
      fullName: yup.string(),
      id: yup.string(),
      lastName: yup.string(),
      middleName: yup.string().nullable(),
    }),
  }),
  doulaId: yup.string(),
  id: yup.string(),
  name: yup.string(),
  numberOfClients: yup.string(),
  picture: yup.object().shape({
    createAt: yup.string(),
    metadata: yup.object().shape({
      medium: yup.object().shape({
        key: yup.string(),
        uri: yup.string().url(),
      }),
      thumbnail: yup.object().shape({
        key: yup.string(),
        uri: yup.string().url(),
      }),
      type: yup.string(),
      uri: yup.string().url(),
    }),
    type: yup.string(),
    uri: yup.string(),
  }),
});

export const getDoulaPackageResponseSchema = commonListResponseSchema.shape({
  data: yup.array().of(DoulaPackagesResponseSchema),
});

export const getPackageByIdResponseSchema = yup.object().shape({
  message: yup.string(),
  data: yup.object().shape({
    cares: yup.array().of(
      yup.object().shape({
        createdAt: yup.string(),
        id: yup.string(),
        status: yup.string(),
        user: yup.object().shape({
          email: yup.string().nullable(),
          firstName: yup.string(),
          fullName: yup.string(),
          id: yup.string(),
          lastName: yup.string(),
          middleName: yup.string().nullable(),
          picture: yup
            .object()
            .shape({
              createdAt: yup.string(),
              id: yup.string(),
              metadata: yup.object().shape({
                thumbnail: yup.object().shape({
                  key: yup.string(),
                  uri: yup.string().url(),
                }),
                medium: yup.object().shape({
                  key: yup.string(),
                  uri: yup.string().url(),
                }),
              }),
              type: yup.string(),
              uri: yup.string().url(),
            })
            .nullable(),
          status: yup.string(),
        }),
      })
    ),
    createdAt: yup.string(),
    deletedAt: yup.string().nullable(),
    description: yup.string(),
    doulaId: yup.string(),
    id: yup.string(),
    name: yup.string(),
    picture: yup.object().shape({
      id: yup.string(),
      uri: yup.string().url(),
      type: yup.string(),
      metadata: yup.object().shape({}),
    }),
    price: yup.string(),
    qualifications: yup.array().of(yup.string()),
    shortDescription: yup.string(),
    updatedAt: yup.string(),
  }),
});
