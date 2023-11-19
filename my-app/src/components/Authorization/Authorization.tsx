import React, { useState } from "react";
import Login from "./Login";
import Registration from "./Registration";

const Authorization = () => {
  const [changeAuth, setChangeAuth] = useState<boolean>(true);

  return (
    <>
      {changeAuth ? (
        <Login setChangeAuth={setChangeAuth} />
      ) : (
        <Registration setChangeAuth={setChangeAuth} />
      )}
    </>
  );
};

export default Authorization;
