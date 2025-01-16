import { Routes, Route } from "react-router-dom";
import Accueil from "./Accueil";
import Article from "./Article";
import Categorie from "./Categorie";
import { GestionArticle } from "./Article";
import { NouveauCommande } from "./Commande";
import { PayerCommande } from "./Commande";
import { ListeCommande } from "./Commande";
import JournalPaye, {
  RechercherEntreDeuxDate,
  RechercherEntreDeuxDatesParProduits,
} from "./JournalPaye";
import Statistique from "./Statistique";
import Table from "./Table";
import Nopage from "../example/NoPage";
import Login, { Connected, Deconnection } from "./Login";
import { ConnectedPage } from "../components/Login";

function Router() {
  return (
    <Routes>
      <Route index path="/" element={<Accueil />} />
      <Route path="blogs" element={<Nopage />} />
      <Route path="accueil" element={<Accueil />} />
      <Route path="article" element={<Article />} />
      <Route path="categorie" element={<Categorie />} />
      <Route path="gestion_article" element={<GestionArticle />} />
      <Route path="login" element={<Login />} />
      <Route path="connected_page" element={<Connected />} />
      <Route path="deconnection" element={<Deconnection />} />

      <Route
        path="nouveau_commande"
        element={<NouveauCommande titre="Nouveau commande" />}
      />
      <Route path="payer_commande" element={<PayerCommande />} />
      <Route
        path="modifier_commande"
        element={<NouveauCommande titre="Modifier commande" />}
      />
      <Route path="liste_commande" element={<ListeCommande />} />
      <Route path="journal_paye" element={<JournalPaye />} />
      <Route
        path="journal_paye/rechercher_entre_deux_dates"
        element={<RechercherEntreDeuxDate />}
      />
      <Route
        path="journal_paye/rechercher_entre_deux_dates_par_produits"
        element={<RechercherEntreDeuxDatesParProduits />}
      />
      <Route path="gestion_table" element={<Table />} />
      <Route path="statistique" element={<Statistique />} />
    </Routes>
  );
}

export default Router;
