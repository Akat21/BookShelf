import React from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import BorrowedPage from "../navbar/BorrowedPage";

export default function CatalogueNavbar(props) {
  const data = props.data;

  const catalogueNavbarStyle = {
    minWidth: "190px",
    width: "300px",
    height: `${data.length * 42 + 100}px`,
    backgroundColor: "white",
    borderRadius: "30px",
    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
  };
  const headerStyle = { textAlign: "center", fontWeight: "bold", padding: "10px" };

  const items = data.map((category) => {
    return (
      <ListGroup.Item
        action
        href={"#" + category.name}
        variant="secondary"
        key={category.id}
        style={{ height: "42px" }}
      >
        {category.name}
      </ListGroup.Item>
    );
  });

  return (
    <Container fluid style={catalogueNavbarStyle}>
      <h1 style={headerStyle}>Katalog</h1>
      <ListGroup>{items}</ListGroup>
      
    </Container>
  );
}
