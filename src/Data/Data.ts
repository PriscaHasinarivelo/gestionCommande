export interface Articles {
    id_article: string;
    reference: string;
    libelle: string;
    prix: string;
    date: string;
    disponible: string;
    url_photos: string;
    categorie_article: {
      id_categorie_article: string,
      reference: string,
      libelle: string
    },
  }

  export interface CategorieArticle{
    id_categorie_article: string;
    libelle: string;
    reference: string; 
  }

  export type User= {
    id: number,
      username: string,
      email: string,
      password: string,
      is_connected: string
  }

  export interface Commande{
    id_commande: number;
    id_article: number;
	  reference: string;
    article: {
      id_article: string;
      reference: string;
      libelle: string;
      prix: string;
      date: string;
      disponible: string;
      url_photos: string;
      categorie_article: {
        id_categorie_article: string,
        reference: string,
        libelle: string
      },
    },
    table_restaurant : {
      id: string;
      numero: string;
    },
    nombre: number;
	  date: string;
    status:string;
  }

  export interface TableRestaurant{
    id : string;
    numero: string;
  }
