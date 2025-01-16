import { useEffect, useState } from "react";
import ButtonList from "./ButtonList";
import TableauDePayement from "./TableauDePayement";
import { creerCommande } from "../../Data/DataApi";
import { formattageMontant } from "../Formatter/Formatter";
import {
  Articles,
  CategorieArticle,
  Commande,
  TableRestaurant,
} from "../../Data/Data";
import Notification from "../Notification/Notification";
import { voirCommandePayeOuEnAttenteParTable } from "../../Data/DataApi";

interface NouveauCommandeProps {
  listeArticles: Articles[];
  listeCategories: CategorieArticle[];
  listeTableRestaurant: TableRestaurant[];
  titre: string;
}

function NouveauCommande({
  listeArticles,
  listeCategories,
  listeTableRestaurant,
  titre,
}: NouveauCommandeProps) {
  // si modification charger la listedes articles a commander à partir du BDD
  let [tableCourant, setTableCourant] = useState<TableRestaurant>();
  let [articleACommanderList, setArticleACommanderList] = useState<Commande[]>(
    []
  );
  let [listeArticlesState, setListeArticlesState] = useState<Articles[]>([]);
  let [listeFiltrerState, setListeFiltrerState] = useState(false);
  let [referenceCommande, setReferenceCommande] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const chargerListeArticlesState = () => {
    tableCourant ? setListeArticlesState(listeArticles) : "";
  };

  const handleTableRestaurant = (e: React.ChangeEvent<any>) => {
    setTableCourant({ ...listeTableRestaurant[e.target.value] });
    chargerListeArticlesState();
    setReferenceCommande(
      formatReference(listeTableRestaurant[e.target.value].numero)
    );

    titre === "Modifier commande"
      ? chargerArticleACommanderList(listeTableRestaurant[e.target.value].id)
      : "";
  };

  const formatReference = (numero: string) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return (
      "CMD_" +
      numero +
      "_" +
      day +
      month +
      year +
      "_" +
      hours +
      minutes +
      seconds
    );
  };

  //addition du commande
  const additionCommandeCourant = (article: Articles) => {
    let newCommande: Commande = {
      id_article: parseInt(article.id),
      reference: referenceCommande,
      article: { ...article },
      table_restaurant: {
        id: tableCourant?.id,
        numero: tableCourant?.numero,
      },
      nombre: 1,
      date: "",
      status: "EN_ATTENTE",
    };
    //si l'enregistrement n'existe pas encore on l'ajoute si non on l'incremente
    if (!isExisteArticleCommander(parseInt(article.id))) {
      setArticleACommanderList((prevCart) => [...prevCart, newCommande]);
    } else {
      incrementValue(parseInt(article.id));
    }
  };

  const isExisteArticleCommander = (id: number) => {
    return articleACommanderList.some(
      (item) => parseInt(item.article.id) === id
    );
  };

  const incrementValue = (id: number) => {
    setArticleACommanderList((prevItems) =>
      prevItems.map((item) =>
        item.article.id === id ? { ...item, nombre: item.nombre + 1 } : item
      )
    );
  };

  //soustraction du commande
  const soustractionCommandeCourant = (article: Articles) => {
    //si l'enregistrement existe  alors decrementation
    if (isExisteArticleCommander(parseInt(article.id))) {
      decrementationValue(parseInt(article.id));

      //verifier si le nombre est 0 alors supprimer
      suppressionSiNombreAZero(article.id);
    }
  };

  const decrementationValue = (id: number) => {
    setArticleACommanderList((prevItems) =>
      prevItems.map((item) =>
        item.article.id === id && item.nombre !== 0
          ? { ...item, nombre: item.nombre - 1 }
          : item
      )
    );
  };

  const suppressionSiNombreAZero = (id: number) => {
    if (
      articleACommanderList.some(
        (item) => item.article.id === id && item.nombre === 0
      )
    ) {
      setArticleACommanderList((prevCarts) =>
        prevCarts.filter((item) => item.article.id !== id)
      );
    }
  };

  //Filtre d'affichage à partir de la liste des articles
  const filtreArticle = (categorie: CategorieArticle) => {
    const listFiltered = listeArticles.filter(
      (item) => item.categorie_article.libelle === categorie.libelle
    );
    tableCourant ? setListeArticlesState(listFiltered) : "";
    setListeFiltrerState(true);
  };

  const neChargePasLaListeState = () => {};

  //Creation commande
  let [creationCommandeSuccess, setCreationCommandeSuccess] = useState(false);
  const creerCommandes = async (commande: Commande, status: string) => {
    try {
      commande["status"] = status;
      console.log("creation  " + commande);
      await creerCommande(commande);
      setArticleACommanderList([]);
      setCreationCommandeSuccess(true);
    } catch (error) {
      console.error("Error:", error);
      setCreationCommandeSuccess(false);
    }
  };

  const creerCommandeList = () => {
    articleACommanderList.map((item, index) => creerCommandes(item, "VALIDE"));
    handleShowNotificationValidation();
  };

  const modifierCommandeList = () => {
    articleACommanderList.map(
      (item, index) => (
        item.status === "EN_ATTENTE", creerCommandes(item, "EN_ATTENTE")
      )
    );
    setArticleACommanderList([]);
    handleShowNotificationEnAttente();
  };

  const [showNotification, setShowNotification] = useState(false);

  const handleShowNotificationValidation = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000); // La notification disparaît après 3 secondes
  };

  const [showNotificationEnAttente, setShowNotificationEnAttente] =
    useState(false);

  const handleShowNotificationEnAttente = () => {
    setShowNotificationEnAttente(true);
    setTimeout(() => {
      setShowNotificationEnAttente(false);
    }, 5000); // La notification disparaît après 3 secondes
  };

  //En cas de modification
  const chargerArticleACommanderList = async (id_table_restaurant: string) => {
    try {
      let result = await voirCommandePayeOuEnAttenteParTable(
        id_table_restaurant
      );

      setArticleACommanderList(result);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  useEffect(() => {
    !listeFiltrerState
      ? chargerListeArticlesState()
      : neChargePasLaListeState();
  }, [
    tableCourant,
    articleACommanderList,
    listeArticlesState,
    referenceCommande,
  ]);

  return (
    <>
      <div className="row container_caissier">
        {/* début entete */}
        {/* afficher si la table n'est pas encore selectionner */}

        <div className="col-xl-12">
          <div className="container">
            <div className="heading_container heading_center title">
              <h2>{titre}</h2>
            </div>
          </div>
        </div>
        <div className="col-xl-3"></div>
        <div className="col-xl-6">
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-chart-area me-1"></i>
              {titre}
            </div>
            <div className="card-body">
              <form>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Table n°
                  </span>
                  <div>
                    <select
                      className="form-control nice-select wide"
                      name="table_restaurant"
                      onChange={handleTableRestaurant}
                    >
                      <option value="" disabled selected>
                        Numéro du table
                      </option>
                      {listeTableRestaurant.map((item, index) => (
                        <option value={index} key={index}>
                          {item.numero}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-xl-6"></div>
        <div className="col-xl-3">
          <div className="notification_fixed">
            <div className="row">
              <div className="col-xs-6">
                {showNotification && (
                  <Notification message="Validation_commande" />
                )}
              </div>
              <div className="col-xs-6">
                {showNotificationEnAttente && (
                  <Notification message="Validation_commande_en_attente" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* fin de l'entete */}
        <ButtonList />

        {/* modal confirmation commande */}
        <div
          className="modal fade "
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Confirmation du commande n° {referenceCommande}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <TableauDePayement
                  articleACommanderList={articleACommanderList}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  data-bs-dismiss="modal"
                >
                  Modifier
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => creerCommandeList()}
                  data-bs-dismiss="modal"
                >
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* fin modal confirmation commande */}

        {/* modal confirmation commande en attente */}
        <div
          className="modal fade "
          id="modalConfirmationCmdEnAttente"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Confirmation de l'attente du commande
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <label>
                  Voullez vous mettre en attente la commande{" "}
                  <b>{referenceCommande}</b> ?
                </label>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  data-bs-dismiss="modal"
                >
                  Modifier
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => modifierCommandeList()}
                  data-bs-dismiss="modal"
                >
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* fin modal confirmation commande */}
        {/* afficher si la table est déjàselectionner */}
        <section className="food_section layout_padding-bottom">
          <div className="container">
            <div className="heading_container heading_center">
              <h2>Nos Menu</h2>
            </div>
            <ul className="filters_menu">
              <li
                className={selectedIndex === -2 ? "active" : ""}
                data-filter="*"
                onClick={() => {
                  chargerListeArticlesState();
                  setSelectedIndex(-2);
                }}
              >
                Tous
              </li>
              {listeCategories.map((item, index) => (
                <li
                  className={selectedIndex === index ? "active" : ""}
                  onClick={() => {
                    filtreArticle(item);
                    setSelectedIndex(index);
                  }}
                >
                  {item.libelle}
                </li>
              ))}
            </ul>
            <div className="filters-content liste_article_a_commander">
              <div className="row grid">
                {listeArticlesState?.map((item, index) => (
                  <div className="col-sm-6 col-lg-3 all pizza">
                    <div className="box">
                      <div>
                        <div className="img-box">
                          {item.url_photos === "" ||
                          item.url_photos === null ? (
                            <img src="src/assets/assets/images/f1.png" alt="" />
                          ) : (
                            <img src={item.url_photos} alt="" />
                          )}
                        </div>
                        <div className="detail-box">
                          <h5>{item.libelle}</h5>
                          <p className="champ_chiffre">
                            {formattageMontant(parseInt(item.prix))} <b> Ar</b>
                          </p>
                          {item.disponible ? (
                            <div className="options">
                              {/* si le produit ne s'affiche pas dans la liste des produits à commander sa valeur sera à 0 */}
                              {!isExisteArticleCommander(item.id) ? (
                                <h6>0</h6>
                              ) : (
                                // parcourir la liste des articles a commander et afficher de celle de cette item

                                <RechercherNombreActuelDuCommande
                                  articleACommanderList={articleACommanderList}
                                  idItemCourant={item.id}
                                ></RechercherNombreActuelDuCommande>
                              )}

                              <div className="row">
                                <div className="col-md-4"></div>
                                <div className="col-md-4">
                                  <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={() =>
                                      additionCommandeCourant(item)
                                    }
                                  >
                                    <i className="bi bi-plus-circle-fill"></i>
                                  </button>
                                </div>
                                <div className="col-md-4">
                                  <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={() =>
                                      soustractionCommandeCourant(item)
                                    }
                                  >
                                    <i className="bi bi-shield-fill-minus"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="options">
                              <h6>Produit indisponible</h6>
                              <i className="bi bi-patch-exclamation-fill" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

interface RechercherNombreActuelDuCommandeProps {
  articleACommanderList: Commande[];
  idItemCourant: number;
}
function RechercherNombreActuelDuCommande({
  articleACommanderList,
  idItemCourant,
}: RechercherNombreActuelDuCommandeProps) {
  return (
    <>
      {articleACommanderList.map((item, index) =>
        item.article.id === idItemCourant ? <h6>{item.nombre}</h6> : ""
      )}
    </>
  );
}

export default NouveauCommande;
