import NouveauCommande from "./NouveauCommande";
import PayerCommande from "./PayerCommande";
import ModifierCommande from "./ModifierCommande";
import ListeCommande from "./ListeCommande";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Articles } from "../../Data/Data";
import { listeArticle } from "../../Data/DataApi";
import { CategorieArticle } from "../../Data/Data";
import { listeCategorieArticle } from "../../Data/DataApi";
import { TableRestaurant } from "../../Data/Data";
import { listeTableRestaurant } from "../../Data/DataApi";
import { UserContext } from "../Utilisateur/Utilisateur";

function GestionCommande() {
  return <></>;
}

interface NouveauCommandePageProps {
  titre: string;
}
function NouveauCommandePage({ titre }: NouveauCommandePageProps) {
  const [articleListe, setListArticles] = useState<Articles[]>([]);
  const [categorieListe, setListCategorie] = useState<CategorieArticle[]>([]);
  const [tableRestoList, setListeTableRestaurant] = useState<TableRestaurant[]>(
    []
  );

  const getListeTableRestaurant = async () => {
    try {
      const result = await listeTableRestaurant();
      setListeTableRestaurant(result);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };
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
      let result = await listeArticle();
      setListArticles(result);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  useEffect(() => {
    getListeCategorieArticle();
    getListArticles();
    getListeTableRestaurant();
  }, []);

  return (
    <>
      <NouveauCommande
        listeArticles={articleListe}
        listeCategories={categorieListe}
        listeTableRestaurant={tableRestoList}
        titre={titre}
      />
    </>
  );
}

function PayerCommandePage() {
  const [tableRestoList, setListeTableRestaurant] = useState<TableRestaurant[]>(
    []
  );

  useEffect(() => {
    getListeTableRestaurant();
  }, [tableRestoList]);

  const getListeTableRestaurant = async () => {
    try {
      const result = await listeTableRestaurant();
      setListeTableRestaurant(result);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  const { utilisateurConnecte, setUtilisateurConnecte } =
    useContext(UserContext);
  const navigate = useNavigate();

  if (
    utilisateurConnecte?.is_connected === "false" ||
    utilisateurConnecte === undefined
  ) {
    navigate("/login");
  }

  return (
    <>
      <PayerCommande tableRestaurantList={tableRestoList} />
    </>
  );
}

function ModifierCommandePage() {
  return (
    <>
      <ModifierCommande />
    </>
  );
}

function ListeCommandePage() {
  return (
    <>
      <ListeCommande />
    </>
  );
}

export default GestionCommande;
export {
  NouveauCommandePage,
  PayerCommandePage,
  ModifierCommandePage,
  ListeCommandePage,
};
