import ListArticlePage from "../components/Article/ListArticle";
import NavigationMenu from "../components/NavigationMenu";
import React, { useState, useEffect, useContext } from "react";
import { GestionArticlePage } from "../components/Article/GestionArticle";
import axios from "axios";
import { listeArticle } from "../Data/DataApi";
import { Articles } from "../Data/Data";
import { UserContext } from "../example/Blog";
import { useNavigate } from "react-router-dom";

function Article() {
  return (
    <>
      <div id="layoutSidenav">
        <ListArticlePage />
      </div>
    </>
  );
}

function GestionArticle() {
  const [listArticle, setListArticle] = useState<Articles[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await listeArticle();
        setListArticle(result);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    getData();
  }, []);
  return (
    <>
      <div id="layoutSidenav">
        <GestionArticlePage articleList={listArticle} />
      </div>
    </>
  );
}

export default Article;
export { GestionArticle };
