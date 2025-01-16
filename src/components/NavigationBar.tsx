import { useContext, useEffect } from "react";
import { UserContext } from "./Utilisateur/Utilisateur";

function NavigationBar() {
  const { utilisateurConnecte, setUtilisateurConnecte } =
    useContext(UserContext);

  useEffect(() => {
    console.log("utilisateurConnecte = " + utilisateurConnecte);
  }, [utilisateurConnecte]);
  return (
    <>
      <label>Connection or deconnection</label>
    </>
  );
}

function ComboLogin() {
  return <></>;
}

export default NavigationBar;
export { ComboLogin };
