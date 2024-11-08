import * as yup from "yup";
import { QueryParamsProps } from "../common/QueryParamsProps";
import {
  doulaListSchema,
  getDoulaByIdResponseSchema,
  putDoulaResponseSchema,
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

export type DoulaPutPayloadProps = {
  status: string;
  user?: User;
};

export type DoulaPutResponseProps = yup.InferType<
  typeof putDoulaResponseSchema
>;

export type DoulaGetByIdResponseProps = yup.InferType<
  typeof getDoulaByIdResponseSchema
>;
