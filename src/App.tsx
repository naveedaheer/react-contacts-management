import React from "react";
import "./App.css";
import { ContactList } from "view/contact/contactList";
import { AppBar, Toolbar } from "@mui/material";
import styled from "@emotion/styled";

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Styledlogo = styled.div`
  font-size: 22px;
  font-weight: 500;
`;

const StyledMenu = styled.div`
  display: flex;
  gap: 24px;

  a {
    color: white;
    text-decoration: none;
  }
`;

const App = () => {
  return (
    <React.Fragment>
      <AppBar position="fixed">
        <StyledToolbar>
          <Styledlogo>Contacts Mangement App</Styledlogo>

          <StyledMenu>
            <a href="#">Home</a>
            <a href="#">Contact</a>
          </StyledMenu>
        </StyledToolbar>
      </AppBar>
      <Toolbar />
      <ContactList />
    </React.Fragment>
  );
};

export default App;
