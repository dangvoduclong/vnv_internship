import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InputTextField from "../../form/InputTextField";
import InputSelectField from "../../form/InputSelectField";
import { useEffect } from "react";
import InputDateField from "../../form/InputDateField";
import dayjs from "dayjs";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
  description: Yup.string(),
  startDate: Yup.string(),
  endDate: Yup.string(),
  quantityUse: Yup.string().required("Quantity Use is required"),
  type: Yup.string().required("Type is required"),
  amount: Yup.string().required("Amount is required"),
  minPayAmount: Yup.string().required("Min of Payment is required"),
  maxDiscountAmount: Yup.string().required("Max of Discount is required"),
  status: Yup.string().required("Status is required"),
});

interface CreateFormVoucherProps {
  outletName: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    amount: string;
    code: string;
    description: string;
    endDate: string;
    maxDiscountAmount: string;
    minPayAmount: string;
    quantityUse: string;
    startDate: string;
    status: string;
    type: string;
  }) => Promise<void>;
  initialData?: {
    amount: string;
    code: string;
    description: string;
    endDate: string;
    maxDiscountAmount: string;
    minPayAmount: string;
    quantityUse: string;
    startDate: string;
    status: string;
    type: string;
  };
}
const currentDate = dayjs();
const nextDate = currentDate.add(1, "day");

const CreateFormVoucher: React.FC<CreateFormVoucherProps> = ({
  outletName,
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const methods = useForm({
    defaultValues: initialData || {
      amount: "",
      code: "",
      description: "",
      endDate: "",
      maxDiscountAmount: "",
      minPayAmount: "",
      quantityUse: "",
      startDate: "",
      status: "active",
      type: "",
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (open) {
      methods.reset(initialData || {});
    }
  }, [initialData, open, methods]);

  const handleSubmit = async (data: {
    amount: string;
    code: string;
    description: string;
    endDate: string;
    maxDiscountAmount: string;
    minPayAmount: string;
    quantityUse: string;
    startDate: string;
    status: string;
    type: string;
  }) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 3,
          position: "fixed",
          right: 0,
          width: "50%",
          height: "100vh",
          backgroundColor: "white",
          overflowY: "auto",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          borderBottom="1px solid #ccc"
        >
          <Typography variant="h6">{outletName}</Typography>
          <IconButton onClick={onClose} color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>
        {open && (
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(handleSubmit)}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <InputTextField
                name="code"
                label="Code"
                placeholder="Enter code"
                initialValue={initialData?.code}
              />

              <InputTextField
                name="description"
                label="Description"
                placeholder="Enter description"
                initialValue={initialData?.description}
              />
              <Box
                display="flex"
                justifyContent="space-between"
                gap={2}
                marginBottom={2}
              >
                <InputDateField
                  name="startDate"
                  label="Start Date"
                  initialValue={currentDate}
                />
                <InputDateField
                  name="endDate"
                  label="End Date"
                  initialValue={nextDate}
                />
              </Box>
              <InputTextField
                name="quantityUse"
                label="Quantity"
                type="number"
                placeholder="Quantity"
                initialValue={initialData?.quantityUse?.toString()}
              />
              <InputSelectField
                name="type"
                label="Type of coupon"
                placeholder="Select"
                options={[
                  { value: "percentage", label: "Percentage" },
                  { value: "fixed", label: "Fixed" },
                ]}
                initialValue={initialData?.type}
              />
              <InputTextField
                name="amount"
                label="Amount"
                type="number"
                placeholder="Amount"
                initialValue={initialData?.amount}
              />
              <InputTextField
                name="minPayAmount"
                label="Condition"
                type="number"
                placeholder="Min of Payment"
                initialValue={initialData?.minPayAmount}
              />
              <InputTextField
                name="maxDiscountAmount"
                label="Condition max of discount"
                type="number"
                placeholder="Max of Discount"
                initialValue={initialData?.maxDiscountAmount}
              />
              <Button type="submit">Create</Button>
            </form>
          </FormProvider>
        )}
      </Box>
    </Modal>
  );
};

export default CreateFormVoucher;
