import React, { useState, useEffect } from "react";
import { ajoutCategorie } from "../../Data/DataApi";
import { modifierCategorie } from "../../Data/DataApi";
import { listeCategorieArticle } from "../../Data/DataApi";
function FormulaireCategorie({
  categorieArticle,
  setCategorieArticle,
  modifierSelectionner,
  setModifierSelectionner,
  listeCategorie,
  setListeCategorie,
}) {
  //charger liste catégorie
  const getListeCategorie = async () => {
    validationSaisie("");
    try {
      const result = await listeCategorieArticle();
      setListeCategorie(result);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  const validerModification = async () => {
    try {
      await modifierCategorie(categorieArticle);
      effacerFormulaire();
      getListeCategorie();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const annulerModification = () => {
    setModifierSelectionner(false);
    setCategorieArticle({
      id_categorie_article: 0,
      libelle: "",
      reference: "",
    });
  };

  const effacerFormulaire = () => {
    setCategorieArticle({
      id_categorie_article: 0,
      libelle: "",
      reference: "",
    });
  };

  const ajoutCategorieArticle = async () => {
    console.log(categorieArticle);
    categorieArticle === undefined ||
    categorieArticle["libelle"] === "" ||
    categorieArticle["reference"] === ""
      ? validationSaisie("")
      : envoyerAjout();
  };
  const envoyerAjout = async () => {
    try {
      await ajoutCategorie(categorieArticle);
      effacerFormulaire();
      getListeCategorie();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = async (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setCategorieArticle({
      ...categorieArticle,
      [name]: value,
    });
    validationSaisie(e.target.value);
  };

  //useState utilisé pour la validation saisie
  let [champLibelleObligatoire, setChampLibelleObligatoire] = useState(true);
  let [champReferenceObligatoire, setChampReferenceObligatoire] =
    useState(true);

  let [champLibelleAutorise, setChampLibelleAutorise] = useState(true);
  let [champReferenceAutorise, setChampReferenceAutorise] = useState(true);
  let valide = true;
  const validationSaisie = (valeurDuChamp: string) => {
    const regex = /[^\w\s\u00C0-\u00FF]/;
    const submit_button = document.getElementById("submit_button");

    valide = true;
    setChampLibelleObligatoire(true);
    setChampReferenceObligatoire(true);
    setChampLibelleAutorise(true);
    setChampReferenceAutorise(true);

    if (
      categorieArticle === undefined ||
      categorieArticle["libelle"] === undefined ||
      categorieArticle["libelle"].trim() === ""
    ) {
      valide = false;
    }

    if (
      categorieArticle === undefined ||
      categorieArticle["reference"] === undefined ||
      categorieArticle["reference"].trim() === ""
    ) {
      valide = false;
    }

    if (valeurDuChamp.trim() === "") {
      valide = false;
    }

    let valeurLibelle = document.getElementById("libelle").value;
    valeurLibelle.trim() === "" ? setChampLibelleObligatoire(false) : "";
    regex.test(valeurLibelle) ? setChampLibelleAutorise(false) : "";

    let valeurReference = document.getElementById("reference").value;
    valeurReference.trim() === "" ? setChampReferenceObligatoire(false) : "";
    regex.test(valeurReference) ? setChampReferenceAutorise(false) : "";

    !valide
      ? (submit_button.disabled = true)
      : (submit_button.disabled = false);
  };

  const handleSubmit = async () => {
    try {
      if (modifierSelectionner) {
        await modifierCategorie(categorieArticle);
      } else await ajoutCategorie(categorieArticle);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {}, [
    categorieArticle,
    modifierSelectionner,
    listeCategorie,
    champLibelleObligatoire,
    champReferenceObligatoire,
  ]);

  return (
    <>
      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-chart-area me-1"></i>
          Formulaire catégorie
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {!champReferenceObligatoire ? (
              <label className="message_erreur">*Champ obligatoire</label>
            ) : (
              ""
            )}
            {!champReferenceAutorise ? (
              <label className="message_erreur">
                Les caractères spéciaux ne sont pas autorisé
              </label>
            ) : (
              ""
            )}
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Référence
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Réference"
                aria-label="Réference"
                aria-describedby="basic-addon1"
                name="reference"
                value={categorieArticle?.reference}
                onChange={handleChange}
                id="reference"
              ></input>
            </div>

            {!champLibelleObligatoire ? (
              <label className="message_erreur">*Champ obligatoire</label>
            ) : (
              ""
            )}
            {!champLibelleAutorise ? (
              <label className="message_erreur">
                Les caractères spéciaux ne sont pas autorisé
              </label>
            ) : (
              ""
            )}

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                Libéllé
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Libéllé"
                aria-label="Libéllé"
                aria-describedby="basic-addon2"
                value={categorieArticle?.libelle}
                onChange={handleChange}
                name="libelle"
                id="libelle"
              ></input>
            </div>
          </form>

          <div className="row">
            {modifierSelectionner === true ? (
              <>
                <div className="col-md-3">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => annulerModification()}
                  >
                    Annuler
                  </button>
                </div>
                <div className="col-md-3">
                  <button
                    id="submit_button"
                    disabled
                    type="submit"
                    className="btn btn-success"
                    onClick={() => validerModification()}
                  >
                    Modifier
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="col-md-3">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => effacerFormulaire()}
                  >
                    Effacer
                  </button>
                </div>
                <div className="col-md-3">
                  <button
                    id="submit_button"
                    disabled={!valide}
                    type="submit"
                    className="btn btn-success"
                    onClick={() => ajoutCategorieArticle()}
                  >
                    Ajouter
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FormulaireCategorie;
