import { END_POINTS } from "../../constants/api-endpoints";
import { adminListSchema } from "../../schemas/admin-management";
import {
  AdminParamsProps,
  AdminResponseProps,
} from "../../types/admin-management";
import axiosInstance from "../../utils/axiosConfig";

export const getListAdmins = async (params: AdminParamsProps) => {
  const response = await axiosInstance.get(END_POINTS.ADMIN, {
    params,
  });
  return adminListSchema.cast(response) as AdminResponseProps;
};
