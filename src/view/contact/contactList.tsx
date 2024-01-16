import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import ContactTable from "components/table";
import { IContactData } from "interfaces/components/table";

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
];

export const ContactList = () => {
  const onEdit = (data: IContactData) => {
    console.log(data, "edit");
  };
  const onDelete = (data: IContactData) => {
    console.log(data, "delete");
  };

  return (
    <Box padding={5}>
      <Typography variant="h5" component="h2">
        Contacts
      </Typography>
      <ContactTable data={data} actions={{ onEdit, onDelete }} />
    </Box>
  );
};
