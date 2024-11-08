import React, { useEffect } from "react";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import InputTextField from "../../form/InputTextField";
import InputSelectField from "../../form/InputSelectField";
import InputTextAreaField from "../../form/InputTextAreaField";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  status: yup.string().required("Status is required"),
});

interface CreateFormHelpDocumentProps {
  outletName: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    status: string;
    content: string;
  }) => Promise<void>;
  initialData: {
    title: string;
    status: string;
    content: string;
  };
  isEditMode: boolean;
}

const CreateFormHelpDocument: React.FC<CreateFormHelpDocumentProps> = ({
  outletName,
  open,
  onClose,
  onSubmit,
  initialData,
  isEditMode,
}) => {
  const methods = useForm({
    defaultValues: initialData || {
      title: "",
      status: "",
      content: "",
    },
    resolver: yupResolver(validationSchema),
  });

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
                  name="title"
                  placeholder="Title"
                  label="Title"
                  initialValue={initialData?.title}
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
                <InputTextAreaField
                  name="content"
                  placeholder="Enter your content here..."
                  label="Content"
                  initialValue={initialData?.content}
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

export default CreateFormHelpDocument;
