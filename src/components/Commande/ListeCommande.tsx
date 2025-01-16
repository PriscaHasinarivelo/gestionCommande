import { Link, useSearchParams } from "react-router-dom";
import TableauDePayement from "./TableauDePayement";
import { useState, useEffect } from "react";
import { Commande } from "../../Data/Data";
import { voirCommandeNonPaye } from "../../Data/DataApi";
import { creerCommande } from "../../Data/DataApi";
import Notification from "../Notification/Notification";
import { formattageMontant } from "../Formatter/Formatter";
import { TotalCommande } from "./TableauDePayement";

function ListeCommande() {
  const [commandeNonPayeList, setCommandeNonPayeList] = useState<Commande[]>(
    []
  );
  const [articleACommanderList, setArticleACommanderList] = useState<
    Commande[]
  >([]);
  const [commandeCourant, setCommandeCourant] = useState<Commande>();

  const getCommandeNonPaye = async () => {
    try {
      const result = await voirCommandeNonPaye();
      setCommandeNonPayeList(result);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  const getListeCommandesParTable = async (reference: string) => {
    setArticleACommanderList([]);
    try {
      commandeNonPayeList.forEach((commande) => {
        commande.reference === reference
          ? setArticleACommanderList((prevCart) => [...prevCart, commande])
          : "";
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  const annulerCommandes = async (commande: Commande, status: string) => {
    try {
      commande["status"] = status;
      await creerCommande(commande);
      getCommandeNonPaye();
      setArticleACommanderList([]);
    } catch (error) {
      console.error("Error:", error);
    }
    handleShowNotificationAnnulation();
  };

  const [showNotificationAnnulation, setShowNotificationAnnulation] =
    useState(false);
  const handleShowNotificationAnnulation = () => {
    setShowNotificationAnnulation(true);
    setTimeout(() => {
      setShowNotificationAnnulation(false);
    }, 5000); // La notification disparaît après 3 secondes
  };

  useEffect(() => {
    getCommandeNonPaye();
  }, [commandeCourant]);
  return (
    <>
      <div className="row container_caissier">
        <div className="col-xl-12">
          <div className="container">
            <div className="heading_container heading_center title">
              <h2>Liste des commandes non payé</h2>
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
              <table className="table table-hover table-dark table-striped">
                <thead>
                  <tr>
                    <th>Table n°</th>
                    <th>Article</th>
                    <th className="champ_nombre">Nombre</th>
                    <th className="champ_chiffre">Prix unitaire</th>
                    <th className="champ_chiffre">Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th className="champ_chiffre">Total</th>
                    <th className="champ_chiffre">
                      <TotalCommande
                        articleACommanderList={commandeNonPayeList}
                      ></TotalCommande>

                      <b> Ar</b>
                    </th>
                    <th></th>
                  </tr>
                </tfoot>
                <tbody>
                  {commandeNonPayeList?.map((item, index) => (
                    <tr
                      onClick={() => getListeCommandesParTable(item.reference)}
                    >
                      <td>{item.table_restaurant.numero}</td>
                      <td>{item.article.libelle}</td>
                      <td className="champ_nombre">{item.nombre}</td>
                      <td className="champ_chiffre">
                        {formattageMontant(parseInt(item.article.prix))}{" "}
                        <b>Ar</b>
                      </td>
                      <td className="champ_chiffre">
                        {formattageMontant(
                          item.nombre * parseInt(item.article.prix)
                        )}{" "}
                        <b>Ar</b>
                      </td>
                      <td>{item.status}</td>
                      <td>
                        <div className="row">
                          <div className="col-md-2">
                            {item.status === "EN_ATTENTE" && (
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => setCommandeCourant(item)}
                              >
                                <i className="bi bi-shield-x" />
                              </button>
                            )}

                            {item.status === "ANNULER" && (
                              <i className="bi bi-patch-check-fill" />
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-xl-3">
          <div className="notification_fixed">
            <div className="row">
              <div className="col-xs-6">
                {showNotificationAnnulation && (
                  <Notification message="Annulation_commande" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Confirmation de l'annulation du commande
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <span>
                Voulez-vous vraiment annuler la commande n°{" "}
                {commandeCourant?.reference} ?
              </span>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() =>
                  commandeCourant !== undefined
                    ? annulerCommandes(commandeCourant, "ANNULER")
                    : ""
                }
              >
                Valider
              </button>
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListeCommande;
