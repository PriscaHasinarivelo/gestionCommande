import { useEffect, useState } from "react";
import { ajoutTableRestaurant } from "../../Data/DataApi";

function FormulaireTable({
  tableRestaurant,
  setTableRestaurant,
  listeTablesRestaurant,
  setListeTableRestaurant,
}) {
  const [isFormValide, setIsFormValide] = useState(false);
  let valide = true;

  const handleSubmit = async () => {
    try {
      await ajoutTableRestaurant(tableRestaurant);
      setTableRestaurant({
        numero: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    setTableRestaurant({
      numero: e.target.value,
    });
    valide = true;

    const submit_button = document.getElementById("submit_button");
    e.target.value === ""
      ? (submit_button.disabled = true)
      : (submit_button.disabled = false);
  };

  useEffect(() => {}, [tableRestaurant, listeTablesRestaurant]);
  return (
    <>
      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-chart-area me-1"></i>
          Formulaire d'insertion
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Numero du table
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="Numéro du table"
                aria-label="Numéro du table"
                aria-describedby="basic-addon1"
                name="numero"
                value={tableRestaurant?.numero}
                onChange={handleChange}
                required
              ></input>
            </div>
          </form>
          <div>
            <button
              id="submit_button"
              type="submit"
              className="btn btn-success"
              onClick={handleSubmit}
              disabled={!valide}
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormulaireTable;
