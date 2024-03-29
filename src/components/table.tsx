import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TablePagination,
  Typography,
  Box,
} from "@mui/material";
import { ContactTableProps } from "interfaces/components/table";
import styled from "@emotion/styled";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";

const ActionContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const BoxCenter = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: absolute;
  padding: 20px;
`;

const NoDataBox = styled(Box)`
  width: 100%;
  padding: 20px;
`;

const BoxPagination = styled(Box)`
  padding: 20px;
`;

const ContactTable: FC<ContactTableProps> = ({
  data: contactData,
  actions,
  isLoading,
  pageNumber,
  pageSize,
  setPageNumber,
  setPageSize,
}) => {
  const handleChangePageNumber = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    console.log(newPage);

    setPageNumber(newPage + 1);
  };

  const handleChangePageSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNumber(1);
  };


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
          {isLoading ? (
            <BoxCenter>
              <CircularProgress />
            </BoxCenter>
          ) : contactData?.data?.length ? (
            <TableBody>
              {contactData?.data?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell align="center">
                    <ActionContainer>
                      <EditIcon
                        onClick={() => actions.onEdit(row)}
                        color="primary"
                        cursor={'pointer'}

                      />
                      <DeleteOutlinedIcon
                        onClick={() => actions.onDelete(row)}
                        color="error"
                        cursor={'pointer'}
                      />
                    </ActionContainer>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <NoDataBox>
                <Typography variant="body1">No data available.</Typography>
              </NoDataBox>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <BoxPagination>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={contactData?.pageInfo?.totalContacts ?? 0}
          rowsPerPage={pageSize}
          page={pageNumber - 1}
          onPageChange={handleChangePageNumber}
          onRowsPerPageChange={handleChangePageSize}
        />
      </BoxPagination>
    </>
  );
};

export default ContactTable;
