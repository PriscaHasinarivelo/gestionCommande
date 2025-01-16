import { TableRestaurant } from "../../Data/Data";
import FormulaireTable from "./FormulaireTable";
import ListeTable from "./ListeTable";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Utilisateur/Utilisateur";
import { listeTableRestaurant } from "../../Data/DataApi";
import { useNavigate } from "react-router-dom";

function TablePage() {
  //UseState partagé
  const [tableRestaurant, setTableRestaurant] = useState<TableRestaurant>();
  const [listeTablesRestaurant, setListeTableRestaurant] = useState<
    TableRestaurant[]
  >([]);

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
  useEffect(() => {
    getListeTableRestaurant();
  }, [listeTablesRestaurant]);

  const navigate = useNavigate();

  if (
    utilisateurConnecte?.is_connected === "false" ||
    utilisateurConnecte === undefined
  ) {
    navigate("/login");
  }

  return (
    <>
      <div className="row container_caissier">
        <div className="col-xl-12">
          <div className="container">
            <div className="heading_container heading_center title">
              <h2>Gestion des tables </h2>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <FormulaireTable
            tableRestaurant={tableRestaurant}
            setTableRestaurant={setTableRestaurant}
            listeTablesRestaurant={listeTablesRestaurant}
            setListeTableRestaurant={setListeTableRestaurant}
          />
        </div>

        <div className="col-xl-8">
          <ListeTable listeTablesRestaurant={listeTablesRestaurant} />
        </div>
      </div>
    </>
  );
}

export default TablePage;
