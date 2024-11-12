import * as yup from "yup";
import { QueryParamsProps } from "../common/QueryParamsProps";
import {
  doulaListSchema,
  putDoulaResponseSchema,
  doulaVoucherIdSchema,
  getDoulaByIdResponseSchema,
  getDoulaPackageResponseSchema,
  getPackageByIdResponseSchema,
} from "../../schemas/doula-management";

interface User {
  fullName?: string;
  birthDate?: string;
  email?: string;
  countryCode?: string;
  phoneNumber?: string;
}

interface Address {
  fullAddress: string;
}

interface Picture {
  uri: string;
}

export interface DoulaParamsProps extends QueryParamsProps {
  user?: User;
  id?: string;
  picture?: Picture;
  status?: string;
  address?: Address;
}

export type DoulaResponseProps = yup.InferType<typeof doulaListSchema>;

export interface DoulaGetVoucherIdParamsProps extends QueryParamsProps {
  user?: User;
  createAt?: string;
}

export type DoulaGetVoucherIdResponseProps = yup.InferType<
  typeof doulaVoucherIdSchema
>;

export type DoulaPutPayloadProps = {
  status: string;
  user?: User;
};

export type DoulaPutResponseProps = yup.InferType<
  typeof putDoulaResponseSchema
>;

export interface DoulaGetByIdParamsProps {
  user?: User;
  address?: Address;
  status?: string;
  description?: string;
  businessName?: string;
}

export type DoulaGetByIdResponseProps = yup.InferType<
  typeof getDoulaByIdResponseSchema
>;

export interface DoulaPackageGetByIdParamsProps extends QueryParamsProps {
  name?: string;
  picture?: Picture;
  price?: string;
  createAt?: string;
  numberOfClients?: string;
}

export type DoulaPackageGetByIdResponseProps = yup.InferType<
  typeof getDoulaPackageResponseSchema
>;

interface Cares {
  createAt: string;
  id: string;
  status: string;
  user: User2;
}

interface User2 {
  email: string;
  firstName: string;
  fullName: string;
  id: string;
  lastName: string;
  middleName: string;
  picture: Picture;
  status: string;
}

export interface PackageGetByIdParamsProps extends QueryParamsProps {
  cares: Cares;
  picture: Picture;
  name: string;
  shortDescription: string;
  price: string;
  createdAt: string;
  description: string;
}

export type PackageGetByIdResponseProps = yup.InferType<
  typeof getPackageByIdResponseSchema
>;
