import React, { useEffect } from "react";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import InputTextField from "../../form/InputTextField";
import InputSelectField from "../../form/InputSelectField";
import InputTextAreaField from "../../form/InputTextAreaField";
import CloseIcon from "@mui/icons-material/Close";

interface CreateFormProps {
  outletName: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  initialData: any;
  type: "help" | "searchSetting";
}

const CreateForm: React.FC<CreateFormProps> = ({
  outletName,
  open,
  onClose,
  onSubmit,
  initialData,
  type,
}) => {
  const methods = useForm({
    defaultValues: initialData || "",
  });

  useEffect(() => {
    if (open) {
      methods.reset(initialData || {});
    }
  }, [initialData, open, methods]);

  const handleSubmit = async (data: any) => {
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
              {type === "help" && (
                <>
                  <InputTextField
                    name="title"
                    placeholder="Title"
                    label="Title"
                  />
                  <InputSelectField
                    name="status"
                    label="Status"
                    options={[
                      { value: "active", label: "Active" },
                      { value: "inactive", label: "Inactive" },
                    ]}
                  />
                  <InputTextAreaField
                    name="content"
                    placeholder="Enter your content here..."
                    label="Content"
                  />
                </>
              )}
              {type === "searchSetting" && (
                <>
                  <InputTextField
                    name="keyword"
                    placeholder="Text"
                    label="Text"
                    initialValue={initialData?.keyword}
                  />
                </>
              )}
              <Button type="submit">{initialData ? "Update" : "Create"}</Button>
            </form>
          </FormProvider>
        )}
      </Box>
    </Modal>
  );
};

export default CreateForm;
