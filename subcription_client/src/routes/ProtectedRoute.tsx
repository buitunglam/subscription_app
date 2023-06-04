import React, { useContext } from "react";
import { UserContext } from "../context";
import { Navigate, Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

type Props = {};

const ProtectedRoute = (props: Props) => {
  const [user] = useContext(UserContext);

  if (user.loading) return <Container>Loading...</Container>;

  return user.data ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
