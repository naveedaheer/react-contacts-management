import { useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ContactTable from "components/table";
import styled from "@emotion/styled";

import { ContactFormModal } from "./contactFormModal";
import { useState } from "react";
import { ContactFormData } from "interfaces/view/contact";
import { useAppDispatch } from "hooks/storeHook";
import { fetchContactFormDataAsync } from "store/features/contact/contactSlice";

const ContactListHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding: 10px 0px;
`;
const data: ContactFormData[] = [
  {
    id: "1234",
    email: "test@test.com",
    firstName: "test",
    lastName: "test last",
    phoneNumber: 3000000000000,
  },
  {
    id: "13333",
    email: "test2@test.com",
    firstName: "test2",
    lastName: "test last",
    phoneNumber: 3000000000000,
  },
  {
    id: "1222",
    email: "test3@test.com",
    firstName: "test3",
    lastName: "test last",
    phoneNumber: 3000000000000,
  },
  {
    id: "12134",
    email: "test4@test.com",
    firstName: "test4",
    lastName: "test last",
    phoneNumber: 3000000000000,
  },
  {
    id: "133233",
    email: "test5@test.com",
    firstName: "test5",
    lastName: "test last",
    phoneNumber: 3000000000000,
  },
  {
    id: "12322",
    email: "test6@test.com",
    firstName: "test6",
    lastName: "test last",
    phoneNumber: 3000000000000,
  },
];

export const ContactList = () => {
  const [contactFormModal, setContactFormModal] = useState<boolean>(false);
  const [contactToEdit, setContactToEdit] = useState<ContactFormData | null>(
    null
  );
  const dispatch = useAppDispatch();

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
      <ContactTable data={data} actions={{ onEdit, onDelete }} />
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
