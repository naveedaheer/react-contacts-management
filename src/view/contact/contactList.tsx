import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ContactTable from "components/table";
import { IContactData } from "interfaces/components/table";
import styled from "@emotion/styled";
import { ContactFormModal } from "./contactFormModal";
import {  useState } from "react";

const ContactListHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding: 10px 0px;
`;
const data: IContactData[] = [
  {
    id: "1234",
    email: "test@test.com",
    first_name: "test",
    last_name: "test last",
    phone_number: 3000000000000,
  },
  {
    id: "13333",
    email: "test2@test.com",
    first_name: "test2",
    last_name: "test last",
    phone_number: 3000000000000,
  },
  {
    id: "1222",
    email: "test3@test.com",
    first_name: "test3",
    last_name: "test last",
    phone_number: 3000000000000,
  },
  {
    id: "12134",
    email: "test4@test.com",
    first_name: "test4",
    last_name: "test last",
    phone_number: 3000000000000,
  },
  {
    id: "133233",
    email: "test5@test.com",
    first_name: "test5",
    last_name: "test last",
    phone_number: 3000000000000,
  },
  {
    id: "12322",
    email: "test6@test.com",
    first_name: "test6",
    last_name: "test last",
    phone_number: 3000000000000,
  },
];

export const ContactList = () => {
  const [createContactModal, setCreateContactModal] = useState<boolean>(false);

  const onEdit = (data: IContactData) => {
    console.log(data, "edit");
  };
  const onDelete = (data: IContactData) => {
    console.log(data, "delete");
  };

  return (
    <Box padding={5}>
      <ContactListHeader>
        <Typography variant="h5" component="h2">
          Contacts
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCreateContactModal(true)}
        >
          Add Contact
        </Button>
      </ContactListHeader>
      <ContactTable data={data} actions={{ onEdit, onDelete }} />
      <ContactFormModal
        onClose={() => setCreateContactModal(false)}
        open={createContactModal}
        onCreate={(data) => {
          console.log(data);
        }}
      />
    </Box>
  );
};
