import { END_POINTS } from "../../constants/api-endpoints";
import {
  adminListSchema,
  deleteAdminResponseSchema,
  postAdminResponseSchema,
  putAdminResponseSchema,
} from "../../schemas/admin-management";
import {
  AdminDeleteResponseProps,
  AdminParamsProps,
  AdminPostPayloadProps,
  AdminPostResponseProps,
  AdminPutPayloadProps,
  AdminPutResponseProps,
  AdminResponseProps,
} from "../../types/admin-management";
import axiosInstance from "../../utils/axiosConfig";

export const getListAdmins = async (params: AdminParamsProps) => {
  const response = await axiosInstance.get(END_POINTS.ADMIN, {
    params,
  });

  return adminListSchema.cast(response) as AdminResponseProps;
};

export const createAdmin = async (payload: AdminPostPayloadProps) => {
  const response = await axiosInstance.post(END_POINTS.ADMIN, payload);
  return postAdminResponseSchema.cast(response) as AdminPostResponseProps;
};

export const updateAdmin = async (
  id: string,
  payload: AdminPutPayloadProps
) => {
  const response = await axiosInstance.put(
    `${END_POINTS.ADMIN}/${id}`,
    payload
  );
  return putAdminResponseSchema.cast(response) as AdminPutResponseProps;
};

export const deleteAdmin = async (id: string) => {
  const response = await axiosInstance.delete(`${END_POINTS.ADMIN}/${id}`);
  return deleteAdminResponseSchema.cast(response) as AdminDeleteResponseProps;
};
