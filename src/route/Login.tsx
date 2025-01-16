import { useState } from "react";
import LoginPage, {
  ConnectedPage,
  DeconnectionPage,
} from "../components/Login";
import { User } from "../Data/Data";

function Login() {
  return (
    <>
      <div id="layoutSidenav">
        <LoginPage />
      </div>
    </>
  );
}

function Deconnection() {
  return (
    <>
      <div id="layoutSidenav">
        <DeconnectionPage />
      </div>
    </>
  );
}

function Connected() {
  return (
    <>
      <div id="layoutSidenav">
        <ConnectedPage />
      </div>
    </>
  );
}
export default Login;
export { Deconnection, Connected };
