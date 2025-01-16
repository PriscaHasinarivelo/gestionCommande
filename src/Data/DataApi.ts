import axios from "axios";
import { Articles, CategorieArticle, Commande, TableRestaurant, User } from "./Data";

export const listeArticle = async (): Promise<Articles[]> => {
    try {
        const response = await axios.get<Articles[]>('http://localhost:8181/api/articles/getAllArticles');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
        throw error;
    }
};

export const listeCategorieArticle = async (): Promise<CategorieArticle[]> => {
    try {
        const response = await axios.get<CategorieArticle[]>('http://localhost:8181/api/categoriearticles/getAllCategorieArticles');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
        throw error;
    }
};

export const listeCommande = async (): Promise<Commande[]> => {
    try {
        const response = await axios.get<Commande[]>('http://localhost:8181/api/commandes/getAllCommandes');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
        throw error;
    }
};

//article
export const ajoutArticle = async (article: Articles)  : Promise<Articles> => {
    
    try {
      const response = await axios.post(
        "http://localhost:8181/api/articles/createArticle",
        article
      );
      return response.data
    } catch (error) {
      throw error;
    }

    
  };
  export const modifierArticle = async (article: Articles, id_article: string)  : Promise<Articles> => {
    
    try {
      const response = await axios.put( 
        "http://localhost:8181/api/articles/updateArticle/"+id_article,
        article
      );
      return response.data
    } catch (error) {
      throw error;
    }
  };

  export const supprimerArticle = async (id_article: string)  => {
    
    try {
      const response = await axios.delete(
        "http://localhost:8181/api/article/deleteArticle/"+id_article
      );
      return response.data
    } catch (error) {
      throw error;
    }
  };

  export const uploadPhotos = async (data: FormData, id_article: string)  : Promise<FormData> => {
    
    try {
      await axios.post(
        "http://localhost:8181/api/article/uploadImage/"+id_article,data, {headers:{
            'Content-Type' : 'multipart/form-data', 'Access-Control-Allow-Origin': '*'
          }}
        );
        console.log("upload OK!")
      return data;
    } catch (error) {
      throw error;
    }

    
  };

  //Catégorie
  export const ajoutCategorie = async (categorie: CategorieArticle)  : Promise<CategorieArticle> => {
    
    try {
      const response = await axios.post(
        "http://localhost:8181/api/categoriearticles/createCategorieArticle",
        categorie
      );
      return response.data
    } catch (error) {
      throw error;
    }
  };

  export const modifierCategorie = async (categorie: CategorieArticle)  : Promise<CategorieArticle> => {
    
    try {
      const response = await axios.put(
        "http://localhost:8181/api/categoriearticles/updateCategorieArticle/"+categorie.id_categorie_article,
        categorie
      );
      return response.data
    } catch (error) {
      throw error;
    }
  };

  export const supprimerCategorie = async (categorie: CategorieArticle)  : Promise<CategorieArticle> => {
    
    try {
      const response = await axios.delete(
        "http://localhost:8181/api/categoriearticle/deleteCategorieArticle/"+categorie.id_categorie_article
      );
      return response.data
    } catch (error) {
      throw error;
    }
  };

  //Table restaurant*
  export const ajoutTableRestaurant = async (table: TableRestaurant)  : Promise<TableRestaurant> => {  
    try {
      const response = await axios.post(
        "http://localhost:8181/api/table/createTable",
        table
      );
      return response.data
    } catch (error) {
      throw error;
    }
  };

  export const modifierTableRestaurant = async (table: TableRestaurant)  : Promise<TableRestaurant> => {
    
    try {
      const response = await axios.put(
        "http://localhost:8181/api/table/updatTable/"+table.id,
        table
      );
      return response.data
    } catch (error) {
      throw error;
    }
  };

  export const supprimerTable= async (table: TableRestaurant)  : Promise<TableRestaurant> => {
    
    try {
      const response = await axios.delete(
        "http://localhost:8181/api/table/deleteTable/"+table.id
      );
      return response.data
    } catch (error) {
      throw error;
    }
  };

export const listeTableRestaurant = async (): Promise<TableRestaurant[]> => {
    try {
        const response = await axios.get<TableRestaurant[]>('http://localhost:8181/api/tables/getAllTableRestaurant');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
        throw error;
    }
};

//Commande
export const creerCommande = async (commande: Commande)  : Promise<Commande> => {  
  try {
    const response = await axios.post(
      "http://localhost:8181/api/commande/createCommande",
      commande
    );
    return response.data
  } catch (error) {
    throw error;
  }
};

//commande non payé par table

export const voirCommandeNonPayeParTable = async (id_table_restaurant: string)  : Promise<Commande[]> => {  
  try {
    const response = await axios.get(
      "http://localhost:8181/api/voirCommandeNonPayeParTable/table/"+id_table_restaurant
    );
    return response.data
  } catch (error) {
    throw error;
  }
};

export const voirCommandeNonPaye = async ()  : Promise<Commande[]> => {  
  try {
    const response = await axios.get(
      "http://localhost:8181/api/voirCommandeNonPaye/"
    );
    return response.data
  } catch (error) {
    throw error;
  }
};

export const voirCommandePayeOuEnAttenteParTable = async (id_table_restaurant: string)  : Promise<Commande[]> => {  
  try {
    const response = await axios.get(
      "http://localhost:8181/api/voirCommandePayeOuEnAttenteParTable/table/"+id_table_restaurant
    );
    return response.data
  } catch (error) {
    throw error;
  }
};

export const voirCommandeEntreDeuxDates = async (date_debut: string, date_fin: string)  : Promise<Commande[]> => {  
  try {
    const response = await axios.get(
      "http://localhost:8181/api/rechercheCommandeParDate/"+date_debut+"/"+date_fin
    );
    return response.data
  } catch (error) {
    throw error;
  }
};


export const rechercheParDateParArticle = async (date_debut: string, date_fin: string)  : Promise<Commande[]> => {  
  try {
    const response = await axios.get<Commande[]>('http://localhost:8181/api/rechercheCommandeParDateParArticle/'+date_debut+'/'+date_fin);
        return response.data; 
  } catch (error) {
    throw error;
  }
};

export const modifierCommande = async (commande: Commande)  : Promise<Commande> => {
    
  try {
    const response = await axios.put(
      "http://localhost:8181/api/commande/updateCommande/"+commande.id_commande,
      commande
    );
    return response.data
  } catch (error) {
    throw error;
  }
};

// Utilisateur
export const listeUtilisateur = async ()  : Promise<User[]> => {  
  try {
    const response = await axios.get(
      "http://localhost:8181/api/v1/getAllUser"
    );
     return response.data
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (user: User)  : Promise<User> => {
    
  try {
    const response = await axios.put(
      "http://localhost:8181/api/v1/updateUser/"+user.id, user
    );
    return response.data
  } catch (error) {
    throw error;
  }
};

export const createUser = async (user: User)  : Promise<User> => {
    
  try {
    const response = await axios.post(
      "http://localhost:8181/api/v1/createUser", user
    );
    return response.data
  } catch (error) {
    throw error;
  }
};



