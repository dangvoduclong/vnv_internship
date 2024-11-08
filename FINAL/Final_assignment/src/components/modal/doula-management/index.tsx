import React, { useEffect } from "react";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import InputTextField from "../../form/InputTextField";
import InputSelectField from "../../form/InputSelectField";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object().shape({
  phoneNumber: yup.string().required("Content is required"),
  status: yup.string().required("Status is required"),
});

interface CreateFormDoulaProps {
  outletName: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { phoneNumber: string; status: string }) => Promise<void>;
  initialData: {
    status: string;
    phoneNumber: string;
  };
}

const CreateFormDoula: React.FC<CreateFormDoulaProps> = ({
  outletName,
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const methods = useForm({
    defaultValues: initialData || {
      phoneNumber: "",
      status: "",
    },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (open) {
      methods.reset(initialData || {});
    }
  }, [initialData, open, methods]);

  const handleSubmit = async (data: {
    phoneNumber: string;
    status: string;
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
          width: "30%",
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
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <>
                <InputTextField
                  name="phoneNumber"
                  label="Title"
                  initialValue={initialData?.phoneNumber}
                />
                <InputSelectField
                  name="status"
                  label="Status"
                  placeholder="Select"
                  options={[
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" },
                  ]}
                  initialValue={initialData?.status}
                />
              </>
              <Button type="submit">"Update"</Button>
            </form>
          </FormProvider>
        )}
      </Box>
    </Modal>
  );
};

export default CreateFormDoula;
