function FormulaireDeRecherche() {
  return (
    <>
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
                <select className="form-control nice-select wide">
                  <option value="" disabled selected>
                    Numéro du table
                  </option>
                  <option value="">2</option>
                  <option value="">3</option>
                  <option value="">4</option>
                  <option value="">5</option>
                </select>
              </div>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                CMD n°
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Commande numéro"
                aria-label="Commande numéro"
                aria-describedby="basic-addon1"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormulaireDeRecherche;
