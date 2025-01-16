import { Link, useNavigate } from "react-router-dom";
import RechercherEntreDeuxDatesParProduit from "./RechercheEntreDeuxDatesParProduit";
import RechercheEntreDeuxDates from "./RechercheEntreDeuxDates";
import ListeCommandeProduitVenduPage from "./ListeCommandeProduitVenduPage";
import { UserContext } from "../Utilisateur/Utilisateur";
import { useContext, useEffect } from "react";

function JournalPayePage() {
  const { utilisateurConnecte, setUtilisateurConnecte } =
    useContext(UserContext);
  const navigate = useNavigate();
  console.log("utilisateurConnecte" + utilisateurConnecte);

  useEffect(() => {
    if (
      utilisateurConnecte === undefined ||
      utilisateurConnecte?.is_connected === "false"
    ) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="row container_caissier">
        <div className="col-xl-12">
          <div className="container">
            <div className="heading_container heading_center title">
              <h2>Journal de paye</h2>
            </div>
          </div>
        </div>
        <div className="col-xl-3"></div>
        <div className="col-xl-6">
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-chart-area me-1"></i>
              Type de recherche
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <Link to="/journal_paye/rechercher_entre_deux_dates">
                    <button type="button" className="btn btn-success">
                      Recherche en deux date
                    </button>
                  </Link>
                </div>
                <div className="col-md-6">
                  <Link to="/journal_paye/rechercher_entre_deux_dates_par_produits">
                    <button type="button" className="btn btn-success">
                      Recherche en deux date par produit
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function RechercherEntreDeuxDatesPage() {
  const { utilisateurConnecte, setUtilisateurConnecte } =
    useContext(UserContext);
  const navigate = useNavigate();

  if (
    utilisateurConnecte?.is_connected === "false" ||
    utilisateurConnecte === undefined
  ) {
    navigate("/login");
  }

  return (
    <>
      <RechercheEntreDeuxDates />
    </>
  );
}

function RechercherEntreDeuxDatesParProduitsPage() {
  const { utilisateurConnecte, setUtilisateurConnecte } =
    useContext(UserContext);
  const navigate = useNavigate();

  if (
    utilisateurConnecte?.is_connected === "false" ||
    utilisateurConnecte === undefined
  ) {
    navigate("/login");
  }

  return (
    <>
      <RechercherEntreDeuxDatesParProduit />
    </>
  );
}

export default JournalPayePage;
export {
  RechercherEntreDeuxDatesPage,
  RechercherEntreDeuxDatesParProduitsPage,
  ListeCommandeProduitVenduPage,
};
