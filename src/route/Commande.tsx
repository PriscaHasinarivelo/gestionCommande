import NavigationMenu from "../components/NavigationMenu";
import {
  ListeCommandePage,
  ModifierCommandePage,
  NouveauCommandePage,
} from "../components/Commande/GestionCommande";
import { PayerCommandePage } from "../components/Commande/GestionCommande";

function Commande() {}
interface NouveauCommandeProps {
  titre: string;
}
function NouveauCommande({ titre }: NouveauCommandeProps) {
  return (
    <>
      <div id="layoutSidenav">
        <NouveauCommandePage titre={titre} />
      </div>
    </>
  );
}

function PayerCommande() {
  return (
    <>
      <div id="layoutSidenav">
        <PayerCommandePage />
      </div>
    </>
  );
}

function ModifierCommande() {
  return (
    <>
      <div id="layoutSidenav">
        <ModifierCommandePage />
      </div>
    </>
  );
}

function ListeCommande() {
  return (
    <>
      <div id="layoutSidenav">
        <ListeCommandePage />
      </div>
    </>
  );
}

export default Commande;
export { NouveauCommande, PayerCommande, ModifierCommande, ListeCommande };
