import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FormulaireProduit from "./FormulaireArticle";
import { Articles } from "../../Data/Data";
import TableauProduit from "./TableauArticle";
import { listeArticle } from "../../Data/DataApi";
import { CategorieArticle } from "../../Data/Data";
import { listeCategorieArticle } from "../../Data/DataApi";

interface ListArticleProps {
  articleList: Articles[];
}
function GestionArticle() {
  return <></>;
}
function GestionArticlePage({ articleList }: ListArticleProps) {
  //UseState partagé
  const [articleCourant, setArticleCourant] = useState<Articles>();
  const [modifierSelectionner, setModifierSelectionner] = useState(false);
  const [listeArticles, setListArticles] = useState<Articles[]>([]);
  //charger les catérogies
  const [listCategorie, setListCategorie] = useState<CategorieArticle[]>([]);
  const getListeCategorieArticle = async () => {
    try {
      const result = await listeCategorieArticle();
      setListCategorie(result);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  const getListArticles = async () => {
    try {
      const result = await listeArticle();
      setListArticles(result);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  useEffect(() => {
    getListeCategorieArticle();
    getListArticles();
  }, [listCategorie]);

  // fin upload file
  return (
    <>
      <div className="row container_caissier">
        <div className="col-xl-12">
          <div className="container">
            <div className="heading_container heading_center title">
              <h2>Gestion des Produits</h2>
            </div>
          </div>
        </div>
        <FormulaireProduit
          articleCourant={articleCourant}
          setArticleCourant={setArticleCourant}
          modifierSelectionner={modifierSelectionner}
          setModifierSelectionner={setModifierSelectionner}
          listeArticles={listeArticles}
          setListArticles={setListArticles}
          listCategorie={listCategorie}
          setListCategorie={setListCategorie}
        />

        <TableauProduit
          articleCourant={articleCourant}
          setArticleCourant={setArticleCourant}
          modifierSelectionner={modifierSelectionner}
          setModifierSelectionner={setModifierSelectionner}
          listeArticles={listeArticles}
          setListArticles={setListArticles}
        />
      </div>
    </>
  );
}

export { GestionArticlePage };
export default GestionArticle;
