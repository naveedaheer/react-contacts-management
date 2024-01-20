import { useEffect } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ContactTable from "components/table";
import styled from "@emotion/styled";

import { ContactFormModal } from "./contactFormModal";
import { useState } from "react";
import { ContactFormData } from "interfaces/view/contact";
import { useAppDispatch, useAppSelector } from "hooks/storeHook";
import { createContactFormDataAsync, deleteContactFormDataAsync, fetchContactFormDataAsync, updateContactFormDataAsync } from "store/features/contact/contactSlice";
import { DeleteConfirmationDialog } from "components/confirmation";
import SimpleSnackbar from "components/snackbar";

const ContactListHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding: 10px 0px;
`;
const ContactListFilter = styled(Box)`
  margin-bottom: 20px;
  padding: 10px 0px;
  display: flex;
  align-items: end;
`;

export const ContactList = () => {
  const [contactFormModal, setContactFormModal] = useState<boolean>(false);
  const [deleteId, setDeletedId] = useState<string>('');


  const [contactToEdit, setContactToEdit] = useState<ContactFormData | null>(
    null
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSizeRowNumber, setPageSizeRowNumber] = useState(5);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false)
  const [snackBarType, setSnackBarType] = useState<'success' | 'error'>('success')


  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector(
    (state) => state.contact.fetchData
  );
  const { status: deleteStatus } = useAppSelector(
    (state) => state.contact.deleteData
  );
  const onEdit = (data: ContactFormData) => {
    setContactToEdit(data);
    setContactFormModal(true);
  };
  const onDelete = (data: ContactFormData) => {
    setDeletedId(data?.id as string);
  };
  const handleDeleteConfirmed = () => {
    dispatch(
      deleteContactFormDataAsync(deleteId)
    );
  }
  const onCreateContact = (data: ContactFormData) => {
    dispatch(
      createContactFormDataAsync(data)
    );
  };
  const onEditContact = (data: ContactFormData) => {
    dispatch(
      updateContactFormDataAsync({ id: contactToEdit?.id as string, formData: data })
    );
  };
  const handleFetchContact = () => {
    dispatch(
      fetchContactFormDataAsync({ pageNumber, pageSize: pageSizeRowNumber, firstName, lastName })
    );
  }
  useEffect(() => {
    handleFetchContact();
  }, [pageNumber, pageSizeRowNumber]);

  const clearFilters = () => {
    setFirstName('')
    setLastName('')
    setPageNumber(1)
    setPageSizeRowNumber(5)
    dispatch(
      fetchContactFormDataAsync({ pageNumber: 1, pageSize: 5, })
    );
  }

  useEffect(() => {
    if (deleteStatus === 'succeeded') {
      setDeletedId('')
      setOpenSnackBar(true)
      handleFetchContact();
      setSnackBarType('success')
    }
    else if (deleteStatus === 'failed') {
      setDeletedId('')
      setOpenSnackBar(true)
      setSnackBarType('error')
    }
  }, [deleteStatus])

  const isDisplayClearFilterButton = firstName || lastName || pageNumber !== 1 || pageSizeRowNumber !== 5
  return (
    <Box padding={5}>
      <ContactListHeader>
        <Typography variant="h5" component="h2">
          Contacts
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setContactFormModal(true)}
        >
          Add Contact
        </Button>
      </ContactListHeader>
      <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
        Filters:
      </Typography>
      <ContactListFilter>
        <TextField id="first_name" label="First Name" variant="standard" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
        <TextField sx={{ ml: 2 }} id="last_name" label="Last Name" variant="standard" onChange={(e) => setLastName(e.target.value)} value={lastName} />
        <Button
          sx={{ ml: 2 }}
          variant="outlined"
          color="primary"
          onClick={() => handleFetchContact()}
        >
          Search
        </Button>
        {isDisplayClearFilterButton && <Button
          sx={{ ml: 2 }}
          variant="outlined"
          color="primary"
          onClick={() => clearFilters()}
        >
          Clear Filters
        </Button>}
      </ContactListFilter>
      <ContactTable
        data={data ?? null}
        actions={{ onEdit, onDelete }}
        isLoading={status === "loading"}
        pageNumber={pageNumber}
        pageSizeRowNumber={pageSizeRowNumber}
        setPageNumber={setPageNumber}
        setPageSizeRowNumber={setPageSizeRowNumber}
      />
      <ContactFormModal
        onClose={() => {
          setContactFormModal(false);
          setContactToEdit(null);
        }}
        open={contactFormModal}
        onSubmit={(data) =>
          contactToEdit ? onEditContact(data) : onCreateContact(data)
        }
        mode={contactToEdit ? "edit" : "create"}
        initialData={contactToEdit ?? undefined}
      />
      <DeleteConfirmationDialog
        onDelete={handleDeleteConfirmed}
        open={Boolean(deleteId)}
        handleClose={() => setDeletedId('')}
        isLoading={deleteStatus === 'loading'}
      />
      <SimpleSnackbar open={openSnackBar} handleClose={() => setOpenSnackBar(false)} type={snackBarType} />
    </Box>
  );
};
