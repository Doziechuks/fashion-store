/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { handleToggleAuth } from "../redux/toggleReducer/toggle.action";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/userReducer/user.selector";
import { CurrentUserProps } from "../redux/userReducer/user.type";

interface RouteProps {
  Component: React.ComponentType<object>;
  currentUser: CurrentUserProps | null;
  setShowAuth: () => void;
}

const ProtectedRoute = (props: RouteProps) => {
  const { Component, currentUser, setShowAuth } = props;

  useEffect(() => {
    if (!currentUser?.token) {
      setShowAuth();
    }
  }, [currentUser, setShowAuth]);

  return <Component />;
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch: Function) => ({
  setShowAuth: () => dispatch(handleToggleAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
