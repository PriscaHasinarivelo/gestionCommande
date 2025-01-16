import React, { useContext } from "react";
import { NoteContext, UserContext } from "./Blog";

function Nopage() {
  const { note, setNote } = useContext(NoteContext);
  const { utilisateurConnecte, setUtilisateurConnecte } =
    useContext(UserContext);
  return (
    <>
      <h1>{utilisateurConnecte}</h1>
      <ul>
        {note.map((item, index) => (
          <li key={index}>
            {item.nom} {item.no}
          </li>
        ))}
      </ul>
    </>
  );
}
export default Nopage;
// import React, { useRef } from "react";
// import ReactToPrint from "react-to-print";

// function ComponentToPrint() {
//   return (
//     <div>
//       <h1>Contenu à imprimer</h1>
//       <p>Ceci est un exemple de contenu imprimable.</p>
//     </div>
//   );
// }

// function NoPage() {
//   const printRef = useRef();

//   const handlePrint = () => {
//     const printContent = printRef.current.innerHTML;
//     const originalContent = document.body.innerHTML;

//     document.body.innerHTML = printContent;
//     window.print();
//     document.body.innerHTML = originalContent;
//   };

//   return (
//     <div>
//       <div ref={printRef}>
//         <ComponentToPrint />
//       </div>
//       <button onClick={handlePrint}>Imprimer</button>
//     </div>
//   );
// }

// export default NoPage;

// class ComponentToPrint extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Contenu à imprimer</h1>
//         <p>Ceci est un exemple de contenu imprimable.</p>
//       </div>
//     );
//   }
// }

// function Nopage() {
//   const componentRef = useRef();

//   return (
//     <div>
//       <h2>Test</h2>
//       <ReactToPrint
//         trigger={() => <button>Imprimer ce contenu</button>}
//         content={() => componentRef.current}
//       />
//       {/* <ComponentToPrint ref={componentRef} /> */}
//     </div>
//   );
// }

// export default Nopage;
