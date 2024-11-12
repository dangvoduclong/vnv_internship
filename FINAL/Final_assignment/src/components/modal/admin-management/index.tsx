import React, { useEffect } from "react";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import InputTextField from "../../form/InputTextField";
import InputSelectField from "../../form/InputSelectField";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../../hooks/common/useAuth";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .when("isEditMode", (isEditMode, schema) =>
      isEditMode ? schema : schema.required("Email is required")
    ),
  firstName: yup.string().required("Content is required"),
  lastName: yup.string().required("Content is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$/,
      "Password must contain at least one letter, one number, and one special character."
    )
    .required(),
  status: yup.string().required("Status is required"),
  username: yup
    .string()
    .when("isEditMode", (isEditMode, schema) =>
      isEditMode ? schema : schema.required("Username is required")
    ),
});

interface CreateFormAdminProps {
  outletName: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    password: string;
  }) => Promise<void>;
  initialData: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    password: string;
  };
  isEditMode: boolean;
}

const CreateFormAdmin: React.FC<CreateFormAdminProps> = ({
  outletName,
  open,
  onClose,
  onSubmit,
  initialData,
  isEditMode,
}) => {
  const methods = useForm({
    defaultValues: initialData || {
      email: "",
      firstName: "",
      lastName: "",
      username: "",
      status: "active",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { user } = useAuth();

  const isCurrentUser = initialData?.username === user?.username;

  useEffect(() => {
    if (open) {
      methods.reset(initialData || {});
    }
  }, [initialData, open, methods]);

  const handleSubmit = async (data: {
    title: string;
    status: string;
    content: string;
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
                  name="username"
                  placeholder="Title"
                  label="Title"
                  initialValue={initialData?.username}
                  disabled={isEditMode}
                />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  gap={2}
                  marginBottom={2}
                >
                  <InputTextField
                    name="firstName"
                    placeholder="Title"
                    label="Title"
                    initialValue={initialData?.firstName}
                  />
                  <InputTextField
                    name="lastName"
                    placeholder="Title"
                    label="Title"
                    initialValue={initialData?.lastName}
                  />
                </Box>
                <InputTextField
                  name="email"
                  placeholder="Title"
                  label="Title"
                  initialValue={initialData?.email}
                  disabled={isEditMode}
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
                  disabled={isCurrentUser}
                />
                <InputTextField
                  name="password"
                  placeholder="Password"
                  type="password"
                  label="Password"
                />
              </>
              <Button type="submit">{isEditMode ? "Update" : "Create"}</Button>
            </form>
          </FormProvider>
        )}
      </Box>
    </Modal>
  );
};

export default CreateFormAdmin;
