import { voirCommandeEntreDeuxDates } from "../../Data/DataApi";
import { useState, useEffect } from "react";
import { Commande } from "../../Data/Data";
import TableauDePayement from "../Commande/TableauDePayement";
import { useContext } from "react";
import { UserContext } from "../Utilisateur/Utilisateur";
import { useNavigate } from "react-router-dom";

function RechercheEntreDeuxDates() {
  const { utilisateurConnecte, setUtilisateurConnecte } =
    useContext(UserContext);
  const navigate = useNavigate();

  let [articleACommanderList, setArticleACommanderList] = useState<Commande[]>(
    []
  );
  let [dateDebut, setDateDebut] = useState("");
  let [dateFin, setDateFin] = useState("");
  const getListeCommandes = async (date_debut: string, date_fin: string) => {
    try {
      let result = await voirCommandeEntreDeuxDates(date_debut, date_fin);

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
        <div className="col-xl-3"></div>
      </div>

      <div className="row container_caissier liste_commande_title">
        <div className="col-xl-12">
          <div className="container">
            <div className="heading_container heading_center title">
              <h2>Liste des commandes</h2>
            </div>
          </div>
        </div>
        <div className="col-xl-12">
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-chart-area me-1"></i>
              Commande par table
            </div>
            <div className="card-body card-body-table">
              <TableauDePayement
                articleACommanderList={articleACommanderList}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RechercheEntreDeuxDates;
