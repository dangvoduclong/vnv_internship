import { voucherListSchema } from "../../schemas/voucher";
import yup from "../../utils/yup";
import { QueryParamsProps } from "../common/QueryParamsProps";

export interface VoucherParamsProps extends QueryParamsProps {
  id?: string;
  code?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  numOfUsed?: string;
}

export type VoucherResponseProps = yup.InferType<typeof voucherListSchema>;
