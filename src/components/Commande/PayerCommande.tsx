import TableauDePayement, {
  TableauPayementAImprimer,
} from "./TableauDePayement";
import { useState, useEffect, useRef, useContext } from "react";
import { Commande, TableRestaurant } from "../../Data/Data";
import { voirCommandeNonPayeParTable } from "../../Data/DataApi";
import { TotalCommande } from "./TableauDePayement";
import { modifierCommande } from "../../Data/DataApi";
import Notification from "../Notification/Notification";
import ConstInformation from "../Notification/ConstInformation";
import { UserContext } from "../Utilisateur/Utilisateur";

interface PayerCommandeProps {
  tableRestaurantList: TableRestaurant[];
}

function PayerCommande({ tableRestaurantList }: PayerCommandeProps) {
  let [tableCourant, setTableCourant] = useState<TableRestaurant>();
  let [articleACommanderList, setArticleACommanderList] = useState<Commande[]>(
    []
  );
  let [referenceCommande, setReferenceCommande] = useState("");

  const handleTableRestaurant = (e: React.ChangeEvent<any>) => {
    setTableCourant({ ...tableRestaurantList[e.target.value] });
    getListeCommandes(tableRestaurantList[e.target.value].id);
  };

  const getListeCommandes = async (id_table_restaurant: string) => {
    try {
      let result = await voirCommandeNonPayeParTable(id_table_restaurant);
      setArticleACommanderList(result);
      if (
        articleACommanderList !== null &&
        articleACommanderList[0].status === "PAYE"
      ) {
        setArticleACommanderList([]);
        setReferenceCommande(articleACommanderList[0].reference);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  const payerCommandes = async (commande: Commande) => {
    commande["status"] = "PAYE";
    modifierCommande(commande);
  };

  const payerCommandeList = async () => {
    articleACommanderList.map((item, index) => payerCommandes(item));
    tableCourant !== undefined ? getListeCommandes(tableCourant.id) : "";
    handleShowNotification();
  };

  const [showNotification, setShowNotification] = useState(false);

  const handleShowNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000); // La notification disparaît après 3 secondes
  };

  //Impression
  const printRef = useRef();

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
  };

  const { utilisateurConnecte, setUtilisateurConnecte } =
    useContext(UserContext);

  useEffect(() => {}, [tableCourant, articleACommanderList, referenceCommande]);
  return (
    <>
      <div className="row container_caissier">
        <div className="col-xl-12">
          <div className="container">
            <div className="heading_container heading_center title">
              <h2>Payer Commande</h2>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-chart-area me-1"></i>
              Rechercher commande
            </div>
            <div className="card-body">
              <form>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Table n°
                  </span>
                  <div>
                    <select
                      className="form-control nice-select wide"
                      onClick={handleTableRestaurant}
                    >
                      <option value="" disabled selected>
                        Numéro du table
                      </option>
                      {tableRestaurantList?.map((item, index) => (
                        <option value={index} key={index}>
                          {item.numero}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="mb-4">
            <ConstInformation />
          </div>
          <div className="mb-4">
            {showNotification && <Notification message="Payement" />}
          </div>
        </div>

        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-chart-bar me-1"></i>
              Liste des commandes non payés
            </div>
            <div className="card-body card-body-table">
              <TableauDePayement
                articleACommanderList={articleACommanderList}
              />
            </div>
            <div className="row">
              <div className="col-md-6"></div>
              <div className="col-md-2">
                <b>Total:</b>
              </div>
              <div className="col-md-4">
                <TotalCommande
                  articleACommanderList={articleACommanderList}
                ></TotalCommande>
                <b> Ar</b>
              </div>
              <div className="col-md-12">
                <br />
              </div>
              <div className="col-md-6"></div>
              <div className="col-md-2">
                <button
                  type="button"
                  className="btn btn-warning"
                  data-bs-dismiss="modal"
                  onClick={handlePrint}
                >
                  Imprimer
                </button>
              </div>
              <div className="col-md-3">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={payerCommandeList}
                >
                  Payer
                </button>
              </div>
              <div className="col-md-12">
                <br />
              </div>
            </div>
          </div>
        </div>

        {/* Tableau à imprimer */}
        <div className="col-xl-4 contenu_a_imprimer">
          <div ref={printRef}>
            <TableauPayementAImprimer
              articleACommanderList={articleACommanderList}
            />
          </div>
        </div>
        {/* fin tableau à imprimer */}
      </div>
    </>
  );
}

export default PayerCommande;
