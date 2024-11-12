import {
  createAdmin,
  deleteAdmin,
  getListAdmins,
  updateAdmin,
} from "../../api/account/admin";
import {
  AdminDeleteResponseProps,
  AdminParamsProps,
  AdminPostPayloadProps,
  AdminPostResponseProps,
  AdminPutPayloadProps,
  AdminPutResponseProps,
  AdminResponseProps,
} from "../../types/admin-management";
import useApi from "../common/useApi";

export const useGetListAdmins = (
  immediate: boolean = false,
  params?: AdminParamsProps
) => {
  const { data, loading, error, act } = useApi<
    AdminResponseProps,
    [AdminParamsProps]
  >(getListAdmins, immediate, [params]);

  return { data, loading, error, act };
};

export const useCreateAdmin = (
  immediate: boolean = false,
  payload?: AdminPostPayloadProps
) => {
  const { data, loading, error, act } = useApi<
    AdminPostResponseProps,
    [AdminPostPayloadProps]
  >(createAdmin, immediate, [payload]);
  return { data, loading, error, act };
};

export const useUpdateAdmin = (
  id: string,
  immediate: boolean = false,
  payload?: AdminPutPayloadProps
) => {
  const { data, loading, error, act } = useApi<
    AdminPutResponseProps,
    [string, AdminPutPayloadProps]
  >(updateAdmin, immediate, [id, payload]);
  return { data, loading, error, act };
};

export const useDeleteAdmin = (id: string, immediate: boolean = false) => {
  const { data, loading, error, act } = useApi<
    AdminDeleteResponseProps,
    [string]
  >(deleteAdmin, immediate, [id]);
  return { data, loading, error, act };
};
