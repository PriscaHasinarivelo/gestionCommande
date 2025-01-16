import { Commande } from "../../Data/Data";
import { formattageMontant } from "../Formatter/Formatter";

interface TableauDePayementProps {
  articleACommanderList: Commande[];
}

function TableauDePayement({ articleACommanderList }: TableauDePayementProps) {
  return (
    <>
      <table className="table table-hover table-dark table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Article</th>
            <th className="champ_nombre">Nombre</th>
            <th className="champ_chiffre">Prix unitaire</th>
            <th className="champ_chiffre">Total</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th className="champ_chiffre">Total</th>
            <th className="champ_chiffre">
              <TotalCommande
                articleACommanderList={articleACommanderList}
              ></TotalCommande>

              <b> Ar</b>
            </th>
          </tr>
        </tfoot>
        <tbody>
          {articleACommanderList?.map((item, index) => (
            <tr>
              <td>{item.date}</td>
              <td>{item.article.libelle}</td>
              <td className="champ_nombre">{item.nombre}</td>
              <td className="champ_chiffre">
                {formattageMontant(parseInt(item.article.prix))} <b>Ar</b>
              </td>
              <td className="champ_chiffre">
                {formattageMontant(item.nombre * parseInt(item.article.prix))}{" "}
                <b>Ar</b>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

interface TotalCommandeProps {
  articleACommanderList: Commande[];
}

function TotalCommande({ articleACommanderList }: TotalCommandeProps) {
  let calculGrandSomme = () => {
    return formattageMontant(
      articleACommanderList?.reduce(
        (total, commande) =>
          total + parseInt(commande.article.prix) * commande.nombre,
        0
      )
    );
  };

  return (
    <>
      <b>{calculGrandSomme()}</b>
    </>
  );
}

function TableauPayementAImprimer({
  articleACommanderList,
}: TableauDePayementProps) {
  return (
    <>
      <table className="table table-hover table-light">
        <thead>
          <tr>
            <th>Article</th>
            <th className="champ_nombre">Nombre</th>
            <th className="champ_chiffre">Prix unitaire</th>
            <th className="champ_chiffre">Total</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th className="champ_chiffre">Total</th>
            <th className="champ_chiffre">
              <TotalCommande
                articleACommanderList={articleACommanderList}
              ></TotalCommande>

              <b> Ar</b>
            </th>
          </tr>
        </tfoot>
        <tbody>
          {articleACommanderList?.map((item, index) => (
            <tr>
              <td>{item.article.libelle}</td>
              <td className="champ_nombre">{item.nombre}</td>
              <td className="champ_chiffre">
                {formattageMontant(parseInt(item.article.prix))} <b>Ar</b>
              </td>
              <td className="champ_chiffre">
                {formattageMontant(item.nombre * parseInt(item.article.prix))}{" "}
                <b>Ar</b>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <center>
        <h1>Merci de votre visite!!!</h1>
      </center>
    </>
  );
}

export default TableauDePayement;
export { TotalCommande, TableauPayementAImprimer };
