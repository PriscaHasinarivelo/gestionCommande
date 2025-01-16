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
      <label className="label_user_login">{utilisateurConnecte}</label>
    </>
  );
}

function ComboLogin() {
  return (
    <>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          id="navbarDropdown"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-user fa-fw"></i>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdown"
        >
          <li>
            <a className="dropdown-item" href="#!">
              Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#!">
              Activity Log
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#!">
              Logout
            </a>
          </li>
        </ul>
      </li>
    </>
  );
}

export default NavigationBar;
export { ComboLogin };
