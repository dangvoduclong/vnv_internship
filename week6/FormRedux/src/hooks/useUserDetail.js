import * as userApi from "../api/users";
import useApi from "./api/useApi";

export function useGetUserDetail(immediate = false) {
  const {
    data: userDetail,
    loading,
    error,
    act: getUserDetail,
  } = useApi(userApi.getUserDetail, immediate);

  return { userDetail, loading, error, getUserDetail };
}

export function useDeleteUser(immediate = false) {
  const {
    data: userDetail,
    error,
    loading,
    act: deleteUser,
  } = useApi(userApi.deleteUser, immediate);
  return { userDetail, deleteUser, error, loading };
}

export function useUpdateUser(immediate = false) {
  const {
    data: userDetail,
    error,
    loading,
    act: updateUser,
  } = useApi(userApi.updateUser, immediate);
  return { userDetail, error, loading, updateUser };
}

export function usePatchUser(immediate = false) {
  const {
    data: userDetail,
    error,
    loading,
    act: patchUser,
  } = useApi(userApi.patchUser, immediate);
  return { userDetail, error, loading, patchUser };
}

export function useCreateUser(immediate = false) {
  const {
    data: userDetail,
    error,
    loading,
    act: createUser,
  } = useApi(userApi.createUser, immediate);
  return { userDetail, error, loading, createUser };
}
