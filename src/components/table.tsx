import { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
} from "@mui/material";
import { ContactTableProps } from "interfaces/components/table";
import styled from "@emotion/styled";

const ActionContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;
const ContactTable: FC<ContactTableProps> = ({ data, actions }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSizeRowNumber, setPageSizeRowNumber] = useState(5);

  const handleChangePageNumber = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageNumber(newPage);
  };

  const handleChangePageSize = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSizeRowNumber(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  const displayedData = data.slice(
    pageNumber * pageSizeRowNumber,
    pageNumber * pageSizeRowNumber + pageSizeRowNumber
  );

  return (
    <>
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
            {displayedData.map((row) => (
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={pageSizeRowNumber}
        page={pageNumber}
        onPageChange={handleChangePageNumber}
        onRowsPerPageChange={handleChangePageSize}
      />
    </>
  );
};

export default ContactTable;
