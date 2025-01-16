import JournalPayePage, {
  RechercherEntreDeuxDatesPage,
  RechercherEntreDeuxDatesParProduitsPage,
} from "../components/Journal de Paye/GestionJournalPaye";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../example/Blog";

function JournalPaye() {
  return (
    <>
      <JournalPayePage />
    </>
  );
}

function RechercherEntreDeuxDate() {
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
      <RechercherEntreDeuxDatesPage />
    </>
  );
}

function RechercherEntreDeuxDatesParProduits() {
  return (
    <>
      <RechercherEntreDeuxDatesParProduitsPage />
    </>
  );
}

function ListeCommandeProduitVendu() {
  <>
    <RechercherEntreDeuxDatesParProduitsPage />
  </>;
}

export default JournalPaye;
export {
  RechercherEntreDeuxDate,
  RechercherEntreDeuxDatesParProduits,
  ListeCommandeProduitVendu,
};
