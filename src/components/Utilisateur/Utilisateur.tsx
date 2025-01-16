import React, { createContext, useState, useEffect } from "react";
import { User } from "../../Data/Data";
const UserContext = createContext({});

const UserProv = ({ children }) => {
  const [utilisateurConnecte, setUtilisateurConnecte] = useState<User>();
  const [listUtilisateur, setListUtilisateur] = useState<User[]>([]);

  useEffect(() => {}, [utilisateurConnecte]);
  return (
    <UserContext.Provider
      value={{
        utilisateurConnecte,
        setUtilisateurConnecte,
        listUtilisateur,
        setListUtilisateur,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProv };
