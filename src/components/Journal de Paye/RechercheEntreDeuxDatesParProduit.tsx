import { useState, useEffect } from "react";
import { Commande } from "../../Data/Data";
import { rechercheParDateParArticle } from "../../Data/DataApi";
import { formattageMontant } from "../Formatter/Formatter";
import { useContext } from "react";
import { UserContext } from "../Utilisateur/Utilisateur";
import { useNavigate } from "react-router-dom";

function RechercherEntreDeuxDatesParProduit() {
  const { utilisateurConnecte, setUtilisateurConnecte } =
    useContext(UserContext);
  const navigate = useNavigate();

  if (
    utilisateurConnecte?.is_connected === "false" ||
    utilisateurConnecte === undefined
  ) {
    navigate("/login");
  }
  let [articleACommanderList, setArticleACommanderList] = useState<Commande[]>(
    []
  );
  let [dateDebut, setDateDebut] = useState("");
  let [dateFin, setDateFin] = useState("");
  const getListeCommandes = async (date_debut: string, date_fin: string) => {
    try {
      let result = await rechercheParDateParArticle(date_debut, date_fin);

      setArticleACommanderList(result);
      console.log(result);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  const handleSubmit = () => {
    getListeCommandes(dateDebut, dateFin);
  };
  const handleDateDebut = (e: React.ChangeEvent<any>) => {
    setDateDebut(e.target.value);
  };

  const handleDateFin = (e: React.ChangeEvent<any>) => {
    setDateFin(e.target.value);
  };

  useEffect(() => {
    if (
      utilisateurConnecte === undefined ||
      utilisateurConnecte?.is_connected === "false"
    ) {
      navigate("/login");
    }
  }, [dateDebut, dateFin]);

  return (
    <>
      <div className="row container_caissier">
        <div className="col-xl-12">
          <div className="container">
            <div className="heading_container heading_center title">
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Date du
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Réference"
                    aria-label="Réference"
                    aria-describedby="basic-addon1"
                    name="date_debut"
                    onChange={handleDateDebut}
                  ></input>
                  <span className="input-group-text" id="basic-addon1">
                    au
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Réference"
                    aria-label="Réference"
                    aria-describedby="basic-addon1"
                    name="date_fin"
                    onChange={handleDateFin}
                  ></input>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-xl-12">
          <div className="container">
            <div className="heading_container heading_center title">
              <h2>Liste des produits vendu</h2>
            </div>
          </div>
        </div>
        <div className="col-xl-12">
          <div className="card-body card-body-table">
            <table className="table table-hover table-success table-striped">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th className="champ_nombre">Nombre</th>
                  <th className="champ_chiffre">Total</th>
                </tr>
              </thead>
              <tbody>
                {articleACommanderList.map((item) => (
                  <tr>
                    <td>{item.article.libelle}</td>
                    <td className="champ_nombre">{item.nombre}</td>
                    <td className="champ_chiffre">
                      {formattageMontant(
                        item.nombre * parseInt(item.article.prix)
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default RechercherEntreDeuxDatesParProduit;
