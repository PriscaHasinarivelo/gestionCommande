import { CategorieArticle } from "../../Data/Data";
import { listeCategorieArticle } from "../../Data/DataApi";
import React, { useState, useEffect } from "react";
import { supprimerCategorie } from "../../Data/DataApi";

function ListeCategorie({
  categorieArticle,
  setCategorieArticle,
  modifierSelectionner,
  setModifierSelectionner,
  listeCategorie,
  setListeCategorie,
}) {
  //Charger la liste des catégories
  const getListeCategorie = async () => {
    try {
      const result = await listeCategorieArticle();
      setListeCategorie(result);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  //suppression catégorie
  const suppressionCategorie = async (categorie: CategorieArticle) => {
    try {
      await supprimerCategorie(categorie);
      getListeCategorie();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //Modification catégorie
  const modifierCategorie = async (categorie: CategorieArticle) => {
    setCategorieArticle({ ...categorie });
    setModifierSelectionner(true);
  };

  useEffect(() => {}, [
    categorieArticle,
    modifierSelectionner,
    setListeCategorie,
  ]);

  return (
    <>
      <div className="card mb-4">
        <div className="card-header">
          <i className="fas fa-chart-bar me-1"></i>
          Liste des catégories
        </div>
        <div className="card-body card-body-table">
          <table className="table table-hover table-dark table-striped">
            <thead>
              <tr>
                <th>Libellé</th>
                <th>Réference</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listeCategorie.map((item, index) => (
                <tr>
                  <td>{item.libelle}</td>
                  <td>{item.reference}</td>
                  <td>
                    <div className="row">
                      <div className="col-md-2">
                        <button
                          type="button"
                          className="btn btn-warning"
                          title="Modifier catégorie"
                          onClick={() => modifierCategorie(item)}
                        >
                          <i className="bi bi-pencil-square" />
                        </button>
                      </div>
                      <div className="col-md-2">
                        <button
                          type="button"
                          className="btn btn-warning"
                          title="Supprimer catégorie"
                          onClick={() => suppressionCategorie(item)}
                        >
                          <i className="bi bi-shield-x" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ListeCategorie;
