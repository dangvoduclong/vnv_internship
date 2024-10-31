import { adminListSchema } from "../../schemas/admin-management";
import yup from "../../utils/yup";
import { QueryParamsProps } from "../common/QueryParamsProps";

export interface AdminParamsProps extends QueryParamsProps {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  status: string;
  email: string;
  role: string;
}

export type AdminResponseProps = yup.InferType<typeof adminListSchema>;
