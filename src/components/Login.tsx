import { useContext, useEffect, useState } from "react";
import { UserContext } from "./Utilisateur/Utilisateur";
import { useNavigate } from "react-router-dom";
import { User } from "../Data/Data";
import { listeUtilisateur, updateUser } from "../Data/DataApi";
import Login from "../route/Login";

function LoginPage() {
  const {
    utilisateurConnecte,
    setUtilisateurConnecte,
    listUtilisateur,
    setListUtilisateur,
  } = useContext(UserContext);

  let [allUser, setAllUser] = useState<User[]>([]);

  useContext(UserContext);
  const navigate = useNavigate();

  const getAllUser = async () => {
    try {
      const result = await listeUtilisateur();
      setAllUser(result);
      console.log(allUser);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  let [champ_Valide, setChamp_valide] = useState(false);
  let [pseudo_Valide, setPseudo_valide] = useState(false);
  let [mdp_Valide, setMdp_valide] = useState(false);

  let [user_non_trouver, setUser_non_trouver] = useState(true);
  let [pswd_pseudo_incorrect, set_pswd_pseudo_incorrect] = useState(false);

  let [userTrouver, setUserTrouver] = useState(true);
  let handleChanged = (e: React.ChangeEvent<any>) => {
    let username = document.getElementById("pseudo").value;
    let password = document.getElementById("mdp").value;
    setPseudo_valide(false);
    setMdp_valide(false);
    setChamp_valide(false);
    set_pswd_pseudo_incorrect(false);
    setUserTrouver(true);

    if (username.trim() !== "") {
      setPseudo_valide(true);
    }

    if (password.trim() !== "") {
      setMdp_valide(true);
    }

    if (username.trim() !== "" && password.trim() !== "") {
      setChamp_valide(true);
    }
  };

  const connection = () => {
    getAllUser();
    //parcourrir tout les utilisateurs et fait un comparaison si oui modifier l'état de l'utilisateur en connecté
    //puis rediriger
    let username = document.getElementById("pseudo").value;
    let password = document.getElementById("mdp").value;
    set_pswd_pseudo_incorrect(false);
    setUserTrouver(false);
    allUser.forEach((item) => {
      item.username === username.trim() && item.password !== password.trim()
        ? pseudo_ou_mdp_incorrect()
        : "";

      item.username === username.trim() && item.password === password.trim()
        ? setUserConnected(item)
        : "";
    });
  };

  const pseudo_ou_mdp_incorrect = () => {
    set_pswd_pseudo_incorrect(true);
    setUser_non_trouver(false);
    setUserTrouver(true);
  };
  let setUserConnected = async (user: User) => {
    user["is_connected"] = "true";
    await updateUser(user);
    setUtilisateurConnecte(user);
    setUser_non_trouver(true);
    navigate("/connected_page");
  };

  useEffect(() => {}, [utilisateurConnecte, listUtilisateur, allUser]);

  return (
    <>
      <div className="row container_caissier ">
        <div className="col-xl-12">
          <div className="container_login">
            <div className="login_form">
              <center>
                <h3>Authentification</h3>
                {pswd_pseudo_incorrect && (
                  <h3 className="message_erreur">Mot de passe incorrect</h3>
                )}
                {!userTrouver && (
                  <h3 className="message_erreur">L'utilisateur n'existe pas</h3>
                )}
              </center>
              {!pseudo_Valide && (
                <label className="message_erreur">
                  *Le nom de l'utilisateur est obligatoire.
                </label>
              )}

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Nom de l'utilisateur
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Pseudo"
                  aria-label="Pseudo"
                  aria-describedby="basic-addon1"
                  name="pseudo"
                  id="pseudo"
                  onChange={handleChanged}
                ></input>
              </div>
              {!mdp_Valide && (
                <label className="message_erreur">
                  *Le mot de passe est obligatoire.
                </label>
              )}
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Mot de passe
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Mot de passe"
                  aria-label="Mot de passe"
                  aria-describedby="basic-addon2"
                  name="mdp"
                  id="mdp"
                  onChange={handleChanged}
                ></input>
              </div>
              <div className="row">
                <button
                  type="submit"
                  className=" col-md-12  btn btn-primary"
                  id="submit_button"
                  onClick={connection}
                  disabled={!champ_Valide}
                >
                  Connection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ConnectedPage() {
  const {
    utilisateurConnecte,
    setUtilisateurConnecte,
    listUtilisateur,
    setListUtilisateur,
  } = useContext(UserContext);

  useEffect(() => {}, [utilisateurConnecte, listUtilisateur]);

  return (
    <>
      <div className="row container_caissier ">
        <div className="col-xl-12">
          <div className="container_login">
            <div className="login_form">
              <center>
                <h3>Authentification</h3>
              </center>

              <center>
                <button type="button" className="btn btn-success">
                  <i className="bi bi-patch-check-fill" />
                </button>{" "}
                <h3>Vous êtes connecté!!</h3>
              </center>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function DeconnectionPage() {
  const { utilisateurConnecte, setUtilisateurConnecte } =
    useContext(UserContext);

  let [allUser, setAllUser] = useState<User[]>([]);
  const getAllUser = async () => {
    try {
      const result = await listeUtilisateur();
      setAllUser(result);
      console.log(allUser);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  const deconnection = () => {
    getAllUser();
    //parcourrir tout les utilisateurs et fait un comparaison si oui modifier l'état de l'utilisateur en connecté
    //puis rediriger

    allUser.forEach((item) => {
      item.username === utilisateurConnecte?.username &&
      item.password === utilisateurConnecte?.password
        ? setUserDeconnected(item)
        : "";
    });
  };

  const navigate = useNavigate();
  let setUserDeconnected = async (user: User) => {
    user["is_connected"] = "false";
    await updateUser(user);
    setUtilisateurConnecte(user);
    navigate("/login");
  };

  if (
    utilisateurConnecte !== undefined &&
    utilisateurConnecte?.is_connected === "true"
  ) {
    deconnection();
  }

  return (
    <>
      <Login></Login>
    </>
  );
}

export default LoginPage;
export { DeconnectionPage, ConnectedPage };
