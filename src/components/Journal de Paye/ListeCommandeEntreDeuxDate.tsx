import { useState } from "react";
import { Commande } from "../../Data/Data";
import TableauDePayement from "../Commande/TableauDePayement";
import { Link } from "react-router-dom";

interface ListeCommandeEntreDeuxDateProps {
  commandeEntreDeuxDateList: Commande[];
}
function ListeCommandeEntreDeuxDate({
  commandeEntreDeuxDateList,
}: ListeCommandeEntreDeuxDateProps) {
  const [articleACommanderList, setArticleACommanderList] =
    useState<Commande[]>();
  return (
    <>
      <div className="row container_caissier liste_commande_title">
        <div className="col-xl-12">
          <div className="container">
            <div className="heading_container heading_center title">
              <h2>Liste des commandes</h2>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
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
                    <th>CMD n°</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Table n°</th>
                    <th>CMD n°</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
                <tbody>
                  <tr>
                    <td>item.table</td>
                    <td>item.cmdnum</td>
                    <td>item.status</td>
                    <td>
                      <div className="row">
                        <div className="col-md-4">
                          <Link to="/modifier_commande">
                            <button type="button" className="btn btn-warning">
                              <i className="bi bi-pencil-square" />
                            </button>
                          </Link>
                        </div>
                        <div className="col-md-2">
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="bi bi-shield-x" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>item.table</td>
                    <td>item.cmdnum</td>
                    <td>item.status</td>
                    <td>
                      <div className="row">
                        <div className="col-md-4">
                          <Link to="/modifier_commande">
                            <button type="button" className="btn btn-warning">
                              <i className="bi bi-pencil-square" />
                            </button>
                          </Link>
                        </div>
                        <div className="col-md-2">
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="bi bi-shield-x" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>item.table</td>
                    <td>item.cmdnum</td>
                    <td>item.status</td>
                    <td>
                      <div className="row">
                        <div className="col-md-4">
                          <Link to="/modifier_commande">
                            <button type="button" className="btn btn-warning">
                              <i className="bi bi-pencil-square" />
                            </button>
                          </Link>
                        </div>
                        <div className="col-md-2">
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i className="bi bi-shield-x" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-chart-bar me-1"></i>
              Détails du commande
            </div>
            <div className="card-body card-body-table">
              <TableauDePayement
                articleACommanderList={articleACommanderList}
              />
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
                Confirmation de l'annulation du commande n°
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <span>Voulez-vous vraiment annuler la commande n° ?</span>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
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

export default ListeCommandeEntreDeuxDate;
