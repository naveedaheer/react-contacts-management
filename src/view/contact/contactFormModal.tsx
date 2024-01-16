import { FC } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ContactFormModalProps } from "interfaces/view/contact";
import styled from "@emotion/styled";

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 300px;
  }
`;

const validationSchema = Yup.object({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone_number: Yup.string().required("Phone is required"),
});

export const ContactFormModal: FC<ContactFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  mode,
}) => {
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      ...initialData, // Set initial data for editing mode
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      onClose();
    },
  });
  const handleClose = () => {
    formik.resetForm(); // Reset the form when closing the modal
    onClose();
  };
  return (
    <StyledDialog open={open} onClose={handleClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          {mode === "create" ? "Create Contact" : "Edit Contact"}
        </DialogTitle>
        <DialogContent>
          <TextField
            name="first_name"
            label="First Name"
            variant="outlined"
            fullWidth
            margin="dense"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            error={
              formik.touched.first_name && Boolean(formik.errors.first_name)
            }
            helperText={formik.touched.first_name && formik.errors.first_name}
          />
          <TextField
            name="last_name"
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="dense"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="dense"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            name="phone_number"
            label="Phone"
            variant="outlined"
            fullWidth
            margin="dense"
            value={formik.values.phone_number}
            onChange={formik.handleChange}
            error={
              formik.touched.phone_number && Boolean(formik.errors.phone_number)
            }
            helperText={
              formik.touched.phone_number && formik.errors.phone_number
            }
          />
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            {mode === "create" ? "Create" : "Save Changes"}
          </Button>
        </DialogActions>
      </form>
    </StyledDialog>
  );
};

export default ContactFormModal;
