import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState, useEffect } from "react";
import { CategorieArticle } from "../../Data/Data";
import { ajoutArticle } from "../../Data/DataApi";
import { listeArticle } from "../../Data/DataApi";
import { modifierArticle } from "../../Data/DataApi";

function FormulaireProduit({
  articleCourant,
  setArticleCourant,
  modifierSelectionner,
  setModifierSelectionner,
  listeArticles,
  setListArticles,
  listCategorie,
  setListCategorie,
}) {
  //charger liste article
  const getListArticles = async () => {
    try {
      let result = await listeArticle();
      setListArticles(result);
      validationSaisie("");
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setArticleCourant({
      ...articleCourant,
      [name]: value,
    });
    validationSaisie(e.target.value);
  };

  const [categorieCourant, setCategorieCourant] = useState("");
  let [champCategorieObligatoire, setChampCategorieObligatoire] =
    useState(false);
  const categorieChanges = (e: React.ChangeEvent<any>) => {
    let categorieSelectionner: CategorieArticle = listCategorie[e.target.value];
    articleCourant["categorie_article"] = { ...categorieSelectionner };
    setChampCategorieObligatoire(true);
  };

  //appel web service créer article
  const handleSubmit = async () => {
    articleCourant === undefined ||
    articleCourant["libelle"] === undefined ||
    articleCourant["libelle"].trim() === ""
      ? validationSaisie("")
      : envoyerAjoutArticle();
  };

  const envoyerAjoutArticle = async () => {
    try {
      await ajoutArticle(articleCourant);
      effacerFormulaire();
      getListArticles();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  let [champLibelleObligatoire, setChampLibelleObligatoire] = useState(true);
  let [champReferenceObligatoire, setChampReferenceObligatoire] =
    useState(true);

  let [champLibelleAutorise, setChampLibelleAutorise] = useState(true);
  let [champReferenceAutorise, setChampReferenceAutorise] = useState(true);
  let valide = true;
  const validationSaisie = (valeurDuChamp: string) => {
    //caractère spéciaux non autorisé
    const regex = /[^\w\s\u00C0-\u00FF]/;
    const submit_button = document.getElementById("submit_button");
    valide = true;
    setChampLibelleObligatoire(true);
    setChampReferenceObligatoire(true);
    setChampLibelleAutorise(true);
    setChampReferenceAutorise(true);

    if (
      articleCourant === undefined ||
      articleCourant["libelle"] === undefined ||
      articleCourant["libelle"].trim() === ""
    ) {
      valide = false;
    }

    if (
      articleCourant === undefined ||
      articleCourant["reference"] === undefined ||
      articleCourant["reference"].trim() === ""
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
    console.log(valide);
    !valide
      ? (submit_button.disabled = true)
      : (submit_button.disabled = false);
  };

  //fin envoie formulaire

  useEffect(() => {}, [
    listCategorie,
    listeArticles,
    modifierSelectionner,
    articleCourant,
    categorieCourant,
  ]);

  //Gestion formulaire article
  const annulerModification = () => {
    setModifierSelectionner(false);
    effacerFormulaire();
  };

  const validerModification = async () => {
    try {
      console.log(articleCourant);
      await modifierArticle(articleCourant, articleCourant.id);
      effacerFormulaire();
      getListArticles();
      setModifierSelectionner(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const effacerFormulaire = () => {
    setArticleCourant({
      reference: "",
      libelle: "",
      categorie_article: {
        id_categorie_article: "",
        libelle: "",
        reference: "",
      },
      prix: "",
      url_photos: "",
      disponible: "",
      date: "",
    });
  };

  return (
    <>
      <div className="col-xl-4">
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-chart-area me-1"></i>
            Formulaire des produits
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
                  id="reference"
                  value={articleCourant?.reference}
                  onChange={handleChange}
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
                  name="libelle"
                  id="libelle"
                  value={articleCourant?.libelle}
                  onChange={handleChange}
                ></input>
              </div>

              {!champCategorieObligatoire ? (
                <label className="message_erreur">*Champ obligatoire</label>
              ) : (
                ""
              )}
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Catégorie
                </span>
                <div>
                  <select
                    className="form-control nice-select wide"
                    name="categorie_article"
                    id="categorie_article"
                    onChange={categorieChanges}
                  >
                    {modifierSelectionner === true ? (
                      <option value="" disabled selected>
                        {articleCourant?.categorie_article?.libelle}
                      </option>
                    ) : (
                      <option value="" disabled selected>
                        Selectionner
                      </option>
                    )}

                    {listCategorie.map((item, index) => (
                      <option value={index} key={index}>
                        {item.libelle}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Prix
                </span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Prix"
                  aria-label="Prix"
                  aria-describedby="basic-addon2"
                  name="prix"
                  id="prix"
                  value={articleCourant?.prix}
                  onChange={handleChange}
                ></input>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Disponibilité
                </span>
                <div>
                  <select
                    className="form-control nice-select wide"
                    name="disponible"
                    id="disponible"
                    value={articleCourant?.disponible}
                    onChange={handleChange}
                  >
                    <option value="" disabled selected>
                      Sélectionner
                    </option>
                    <option value="true">Disponible</option>
                    <option value="false">Non disponible</option>
                  </select>
                </div>
              </div>
              {/* on affiche la modification d'une photos en cas de modification */}
              {modifierSelectionner ? (
                <div className="input-group mb-3">
                  <div>
                    {articleCourant.url_photos === null ||
                    articleCourant.url_photos === "" ||
                    articleCourant.url_photos === "string" ? (
                      ""
                    ) : (
                      <>
                        <div className="row">
                          <div className="col-md-6 ">
                            <div className="image-formulaire">
                              <img src={articleCourant.url_photos} alt="" />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <button
                              type="button"
                              className="btn btn-warning"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                            >
                              <i className="bi bi-pencil-square" />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <span></span>
              )}
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
                      type="submit"
                      className="btn btn-success"
                      onClick={() => validerModification()}
                      id="submit_button"
                      disabled={!valide}
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
                      type="submit"
                      className="btn btn-success"
                      onClick={handleSubmit}
                      id="submit_button"
                      disabled={!valide}
                    >
                      Ajouter
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormulaireProduit;
