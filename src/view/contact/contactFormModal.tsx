import { FC } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ContactFormModalProps } from "interfaces/view/contact";
import styled from "@emotion/styled";

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    min-width: 300px
    width: 100%;
    max-width: 650px;
  }
`;

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string().required("Phone is required"),
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
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                name="firstName"
                label="First Name"
                variant="outlined"
                fullWidth
                margin="dense"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="lastName"
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="dense"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12} md={12}>
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
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                name="phoneNumber"
                label="Phone"
                variant="outlined"
                fullWidth
                margin="dense"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained">
            {mode === "create" ? "Create" : "Save Changes"}
          </Button>
        </DialogActions>
      </form>
    </StyledDialog>
  );
};

export default ContactFormModal;
