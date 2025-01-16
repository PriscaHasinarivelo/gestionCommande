// import NavigationMenu from "../components/NavigationMenu";
// import ListArticlePage from "../components/Article/ListArticle";
// import React, { useState, useEffect } from "react";
// import { listeArticle } from "../Data/DataApi";

// interface Article {
//   id: number;
//   name: string;
//   price: number;
//   value: number;
// }

// function Blog() {
//   //liste des articles qu'on peut commander, avec le cas de notre commande,
//   // on ajoute l'articles dans la listeCommande pour qu'on peut le manipuler
//   const [listArticle, setListeArticle] = useState([
//     { id: 1, name: "Article 1", price: 10, value: 0 },
//     { id: 2, name: "Article 2", price: 10, value: 0 },
//     { id: 3, name: "Article 3", price: 10, value: 0 },
//   ]);
//   const [cart, setCart] = useState([]);
//   const addItemToCart = (newItem: Article) => {
//     if (!isExist(newItem.name)) {
//       setCart((prevCart) => [...prevCart, newItem]);
//     } else {
//       cart.splice(cart.indexOf(cart.some((item) => item.id === newItem.id)));
//       setCart((prevCart) => [...prevCart, newItem]);
//     }
//     incrementValue(newItem.id);
//   };
//   const isExist = (name: string) => {
//     return cart.some((item) => item.name === name);
//   };
//   const incrementValue = (id: number) => {
//     setListeArticle((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, value: item.value + 1 } : item
//       )
//     );
//     console.log(cart);
//   };
//   useEffect(() => {}, [listArticle]);
//   return (
//     <div>
//       <h2>Panier</h2>
//       <ul>
//         {cart.map((item, index) => (
//           <li key={index}>
//             {item.name} - {item.price}€ = {item.value + 1}
//           </li>
//         ))}
//       </ul>
//       {listArticle.map((item, index) => (
//         <button onClick={() => addItemToCart(item)}>{item.name}</button>
//       ))}
//     </div>
//   );
//   //   // const [items, setItems] = useState([
//   //   //   { id: 1, value: 0 },
//   //   //   { id: 2, value: 0 },
//   //   //   { id: 3, value: 0 },
//   //   // ]);
//   //   // const incrementValue = (id) => {
//   //   //   setItems((prevItems) =>
//   //   //     prevItems.map((item) =>
//   //   //       item.id === id ? { ...item, value: item.value + 1 } : item
//   //   //     )
//   //   //   );
//   //   // };
//   //   // return (
//   //   //   <div>
//   //   //     <ul>
//   //   //       {items.map((item) => (
//   //   //         <li key={item.id}>
//   //   //           {item.value}
//   //   //           <button onClick={() => incrementValue(item.id)}>Increment</button>
//   //   //         </li>
//   //   //       ))}
//   //   //     </ul>
//   //   //   </div>
//   //   // );
//   //   // return (
//   //   //   <>
//   //   //     <div id="layoutSidenav">
//   //   //       <NavigationMenu />
//   //   //       <ListArticlePage />
//   //   //     </div>
//   //   //   </>
//   //   // );
// }

// export default Blog;

import React, { createContext, useState } from "react";

const NoteContext = createContext({});

const NoteProv = ({ children }) => {
  const [note, setNote] = useState([
    { nom: "test", no: "5" },
    { nom: "test2", no: "5" },
    { nom: "test3", no: "5" },
  ]);
  return (
    <NoteContext.Provider value={{ note, setNote }}>
      {children}
    </NoteContext.Provider>
  );
};
export { NoteContext, NoteProv };

const UserContext = createContext({});
const UserProv = ({ children }) => {
  const [utilisateurConnecte, setUtilisateurConnecte] = useState("Caissier");
  return (
    <UserContext.Provider
      value={{ utilisateurConnecte, setUtilisateurConnecte }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProv };
