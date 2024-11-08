import {
  getDoulaById,
  getListDoula,
  updateDoula,
} from "../../api/account/doula";
import {
  DoulaGetByIdResponseProps,
  DoulaParamsProps,
  DoulaPutPayloadProps,
  DoulaPutResponseProps,
  DoulaResponseProps,
} from "../../types/doula-management";
import useApi from "../common/useApi";

export const useGetListDoulaManagement = (
  immediate: boolean = false,
  params?: DoulaParamsProps
) => {
  const { data, loading, error, act } = useApi<
    DoulaResponseProps,
    [DoulaParamsProps]
  >(getListDoula, immediate, [params]);

  return { data, loading, error, act };
};

export const useUpdateDoulaManagement = (
  id: string,
  immediate: boolean = false,
  payload?: DoulaPutPayloadProps
) => {
  const { data, loading, error, act } = useApi<
    DoulaPutResponseProps,
    [string, DoulaPutPayloadProps]
  >(updateDoula, immediate, [id, payload]);
  return { data, loading, error, act };
};

export const useGetDoulaById = (id: string, immediate: boolean = false) => {
  const { data, loading, error, act } = useApi<
    DoulaGetByIdResponseProps,
    [string]
  >(getDoulaById, immediate, [id]);
  return { data, loading, error, act };
};
