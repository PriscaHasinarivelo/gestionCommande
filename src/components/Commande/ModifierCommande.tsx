import FormulaireDeRecherche from "./FormulaireDeRecherche";
import TableauDePayement from "./TableauDePayement";
import ButtonList from "./ButtonList";
import Article from "../../route/Article";
import "bootstrap/dist/css/bootstrap.min.css";

function ModifierCommande() {
  return (
    <>
      <div className="row container_caissier">
        <div className="col-xl-12">
          <div className="container">
            <div className="heading_container heading_center title">
              <h2>Modifier Commande</h2>
            </div>
          </div>
        </div>
        <div className="col-xl-3"></div>
        <div className="col-xl-6">
          <FormulaireDeRecherche />
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
                  Confirmation du commande n°
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <TableauDePayement />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  data-bs-dismiss="modal"
                >
                  Modifier
                </button>
                <button type="button" className="btn btn-success">
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
        <ButtonList />
        <Article />
      </div>
    </>
  );
}

export default ModifierCommande;
