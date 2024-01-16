import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { ContactTableProps } from "interfaces/components/table";
import styled from "@emotion/styled";

const ActionContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;
const ContactTable: FC<ContactTableProps> = ({ data, actions }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone_number}</TableCell>
              <TableCell align="center">
                <ActionContainer>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => actions.onEdit(row)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => actions.onDelete(row)}
                  >
                    Delete
                  </Button>
                </ActionContainer>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactTable;
