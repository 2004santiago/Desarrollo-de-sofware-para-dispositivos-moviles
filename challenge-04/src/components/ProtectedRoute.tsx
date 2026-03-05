import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn } from "../services/auth";

type Props = {
  exact?: boolean;
  path: string;
  children: React.ReactNode;
};

export default function ProtectedRoute({ exact, path, children }: Props) {
  return (
    <Route
      exact={exact}
      path={path}
      render={() => (isLoggedIn() ? children : <Redirect to="/login" />)}
    />
  );
}