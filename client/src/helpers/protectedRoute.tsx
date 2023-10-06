/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserAuth } from "../redux/userReducer/user.selector";
import { handleToggleAuth } from "../redux/toggleReducer/toggle.action";

interface RouteProps {
  Component: React.ComponentType<object>;
  currentUser: object | null;
  setShowAuth: () => void;
}

const ProtectedRoute = ({
  Component,
  currentUser,
  setShowAuth,
}: RouteProps) => {
  useEffect(() => {
    if (currentUser === null) {
      setShowAuth();
    }
  }, [currentUser, setShowAuth]);

  return <Component />;
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectUserAuth,
});

const mapDispatchToProps = (dispatch: Function) => ({
  setShowAuth: () => dispatch(handleToggleAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
