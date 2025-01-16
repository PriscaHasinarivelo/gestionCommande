import "bootstrap-icons/font/bootstrap-icons.css";
import FormulaireCategorie from "./FormulaireCategorie";
import ListeCategorie from "./ListeCategorie";
import { CategorieArticle } from "../../Data/Data";
import React, { useState, useEffect } from "react";
import { listeCategorieArticle } from "../../Data/DataApi";

function GestionCategorie() {
  //UseState partagé
  const [categorieArticle, setCategorieArticle] = useState<CategorieArticle>();
  const [modifierSelectionner, setModifierSelectionner] = useState(false);
  const [listeCategorie, setListeCategorie] = useState<CategorieArticle[]>([]);

  const getListeCategorie = async () => {
    try {
      const result = await listeCategorieArticle();
      setListeCategorie(result);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  useEffect(() => {
    getListeCategorie();
  }, []);

  return (
    <>
      <div className="row container_caissier">
        <div className="col-xl-12">
          <div className="container">
            <div className="heading_container heading_center title">
              <h2>Gestion de categorie des articles</h2>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <FormulaireCategorie
            categorieArticle={categorieArticle}
            setCategorieArticle={setCategorieArticle}
            modifierSelectionner={modifierSelectionner}
            setModifierSelectionner={setModifierSelectionner}
            listeCategorie={listeCategorie}
            setListeCategorie={setListeCategorie}
          />
        </div>

        <div className="col-xl-8">
          <ListeCategorie
            categorieArticle={categorieArticle}
            setCategorieArticle={setCategorieArticle}
            modifierSelectionner={modifierSelectionner}
            setModifierSelectionner={setModifierSelectionner}
            listeCategorie={listeCategorie}
            setListeCategorie={setListeCategorie}
          />
        </div>
      </div>
    </>
  );
}

export default GestionCategorie;
