import { getListAdmins } from "../../api/account/admin";
import {
  AdminParamsProps,
  AdminResponseProps,
} from "../../types/admin-management";
import useApi from "../common/useApi";

export const useGetListAdmins = (
  immediate: boolean = true,
  params?: AdminParamsProps
) => {
  const { data, loading, error, act } = useApi<
    AdminResponseProps,
    [AdminParamsProps]
  >(getListAdmins, immediate, [params]);

  return { data, loading, error, act };
};
