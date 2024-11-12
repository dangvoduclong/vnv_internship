import {
  adminListSchema,
  deleteAdminResponseSchema,
  postAdminResponseSchema,
  putAdminResponseSchema,
} from "../../schemas/admin-management";
import yup from "../../utils/yup";
import { QueryParamsProps } from "../common/QueryParamsProps";

export interface AdminParamsProps extends QueryParamsProps {
  id?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  status?: string;
  email?: string;
  role?: string;
}

export type AdminResponseProps = yup.InferType<typeof adminListSchema>;

export type AdminPostPayloadProps = {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  picture?: string;
  status?: string;
  username?: string;
};

export type AdminPutPayloadProps = Omit<AdminPostPayloadProps, "password">;

export type AdminPostResponseProps = yup.InferType<
  typeof postAdminResponseSchema
>;

export type AdminPutResponseProps = yup.InferType<
  typeof putAdminResponseSchema
>;

export type AdminDeleteResponseProps = yup.InferType<
  typeof deleteAdminResponseSchema
>;
