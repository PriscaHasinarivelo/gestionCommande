import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState, useEffect } from "react";
import { Articles } from "../../Data/Data";
import { uploadPhotos } from "../../Data/DataApi";
import { listeArticle } from "../../Data/DataApi";
import { supprimerArticle } from "../../Data/DataApi";
import { formattageMontant } from "../Formatter/Formatter";

interface ListArticleProps {
  articleList: Articles[];
}

function TableauProduit({
  articleCourant,
  setArticleCourant,
  modifierSelectionner,
  setModifierSelectionner,
  listeArticles,
  setListArticles,
}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const getListArticles = async () => {
    try {
      let result = await listeArticle();
      setListArticles(result);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  //Gestion de l'image de l'article
  const [selectedFile, setSelectedFile] = useState(null);
  const onFileUpload = async () => {
    const formData = new FormData();

    if (selectedFile !== null) {
      formData.append("image", selectedFile);
    }
    if (modifierSelectionner) {
      await uploadPhotos(formData, articleCourant.id);
    } else await uploadPhotos(formData, articleCourant.id_article);
    effacerFormulaire();
    getListArticles();
  };
  //image à afficher dans un ajout
  const [image, setImage] = useState("");

  const onFileChange = (event: React.ChangeEvent<any>) => {
    setSelectedFile(event.target.files[0]);
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    setImage(imageUrl);
  };

  const modifierImage = async (article: Articles) => {
    setArticleCourant({ ...article });
  };

  const effacerFormulaire = () => {
    setArticleCourant({
      reference: "",
      libelle: "",
      id_categorie_article: "",
      prix: "",
      url_photos: "",
      disponible: "",
      date: "",
    });
    setImage("");
    setSelectedFile(null);
  };

  //Modification article
  const modifierArticle = async (article: Articles) => {
    setArticleCourant({ ...article });
    setModifierSelectionner(true);
  };

  //Suppression article
  const suppressionArticle = async (article: Articles) => {
    try {
      await supprimerArticle(articleCourant.id);
      getListArticles();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {}, [
    listeArticles,
    modifierSelectionner,
    articleCourant,
    selectedFile,
    image,
  ]);

  return (
    <>
      <div className="col-xl-8">
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-chart-bar me-1"></i>
            Liste des produits
          </div>
          <div className="card-body card-body-table">
            <table className="table table-hover table-dark table-striped">
              <thead>
                <tr>
                  <th>Libellé</th>
                  <th>Réference</th>
                  <th className="champ_chiffre">Prix</th>
                  <th>Image</th>
                  <th className="disponible">Disponible</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {listeArticles?.map((item, index) => (
                  <tr
                    className={selectedIndex === index ? "table-active" : ""}
                    key={index}
                  >
                    <td>{item.libelle} </td>
                    <td>{item.reference}</td>
                    <td className="champ_chiffre">
                      {formattageMontant(parseInt(item.prix))} <b> Ar</b>
                    </td>
                    <td>
                      <div className="cellule_tableau">
                        {item.url_photos === null ||
                        item.url_photos === "" ||
                        item.url_photos === "string" ? (
                          <button
                            type="button"
                            className="btn btn-success"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => {
                              modifierImage({
                                id_article: item.id,
                                reference: item.reference,
                                libelle: item.libelle,
                                categorie_article: item.categorie_article,
                                prix: item.prix,
                                url_photos: item.url_photos,
                                disponible: item.disponible,
                                date: "",
                              });
                            }}
                          >
                            <i className="bi bi-plus" />
                          </button>
                        ) : (
                          <div className="cellule-table-box-img">
                            <img src={item.url_photos} alt="" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="disponible">
                      <div className="row">
                        <div className="col-md-2"></div>
                        {item.disponible ? (
                          <div className="col-md-4">
                            <button type="button" className="btn btn-success">
                              <i className="bi bi-patch-check-fill" />
                            </button>
                          </div>
                        ) : (
                          <div className="col-md-4">
                            <button type="button" className="btn btn-warning">
                              <i className="bi bi-patch-exclamation-fill" />
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="row">
                        <div className="col-md-3">
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => modifierArticle(item)}
                          >
                            <i className="bi bi-pencil-square" />
                          </button>
                        </div>
                        <div className="col-md-3">
                          <button
                            type="button"
                            className="btn btn-warning"
                            data-bs-toggle="modal"
                            data-bs-target="#modalSuppression"
                            onClick={() => modifierArticle(item)}
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
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modification de l'image
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="card-body">
                <div className="card-image-article">
                  {image === "" ? (
                    <img src="src/assets/assets/images/f1.png" alt="" />
                  ) : (
                    <img src={image} alt="" />
                  )}
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Image
                  </span>
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Image"
                    aria-label="Image"
                    aria-describedby="basic-addon2"
                    onChange={onFileChange}
                  ></input>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={onFileUpload}
              >
                Valider
              </button>
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="modalSuppression"
        aria-labelledby="modalSuppression"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Confirmation du suppression produit
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <span>
                Voulez-vous vraiment supprimer l'article:{" "}
                {articleCourant?.reference}?
              </span>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => suppressionArticle(articleCourant)}
              >
                Valider
              </button>
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableauProduit;
