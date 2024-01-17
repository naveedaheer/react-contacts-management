import { useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ContactTable from "components/table";
import styled from "@emotion/styled";

import { ContactFormModal } from "./contactFormModal";
import { useState } from "react";
import { ContactFormData } from "interfaces/view/contact";
import { useAppDispatch, useAppSelector } from "hooks/storeHook";
import { fetchContactFormDataAsync } from "store/features/contact/contactSlice";

const ContactListHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding: 10px 0px;
`;

export const ContactList = () => {
  const [contactFormModal, setContactFormModal] = useState<boolean>(false);
  const [contactToEdit, setContactToEdit] = useState<ContactFormData | null>(
    null
  );
  const dispatch = useAppDispatch();
  const { data, status, error } = useAppSelector(
    (state) => state.contact.fetchData
  );

  const onEdit = (data: ContactFormData) => {
    setContactToEdit(data);
    setContactFormModal(true);
  };
  const onDelete = (data: ContactFormData) => {
    console.log(data, "delete");
  };
  const onCreateContact = (data: ContactFormData) => {
    console.log(data, "create");
  };
  const onEditContact = (data: ContactFormData) => {
    console.log(data, "edit");
  };
  function handleFetchContact() {
    dispatch(fetchContactFormDataAsync());
  }
  useEffect(() => {
    handleFetchContact();
  }, []);

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
      <ContactTable
        data={data ?? []}
        actions={{ onEdit, onDelete }}
        isLoading={status === "loading"}
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
    </Box>
  );
};
