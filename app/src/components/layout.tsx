import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import NavMenu from "./nav";

export default props => (
  <Grid fluid className="mainApp">
    <Row>
      <Col sm={3}>
        <NavMenu />
      </Col>
      <Col sm={9}>{props.children}</Col>
    </Row>
  </Grid>
);
