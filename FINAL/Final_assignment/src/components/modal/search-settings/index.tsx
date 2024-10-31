import React, { useEffect } from "react";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import InputTextField from "../../form/InputTextField";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object().shape({
  keyword: Yup.string().required("Keyword is required"),
  count: Yup.number()
    .required("Count is required")
    .positive("Count must be a positive number")
    .integer("Count must be an integer"),
  isSuggestion: Yup.boolean().required("Is Suggestion is required"),
});

interface CreateFormSearchSettingProps {
  outletName: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    keyword: string;
    count: number;
    isSuggestion: boolean;
  }) => Promise<void>;
  initialData: { keyword: string; count: number; isSuggestion: boolean };
  isEditMode: boolean;
}

const CreateFormSearchSetting: React.FC<CreateFormSearchSettingProps> = ({
  outletName,
  open,
  onClose,
  onSubmit,
  initialData,
  isEditMode,
}) => {
  const methods = useForm({
    defaultValues: initialData || { keyword: "", count: 1, isSuggestion: true },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (open) {
      methods.reset(initialData || {});
    }
  }, [initialData, open, methods]);

  const handleSubmit = async (data: {
    keyword: string;
    count: number;
    isSuggestion: boolean;
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
                  name="keyword"
                  placeholder="Text"
                  label="Text"
                  initialValue={initialData?.keyword}
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

export default CreateFormSearchSetting;
