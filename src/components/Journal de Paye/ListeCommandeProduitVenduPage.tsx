function ListeCommandeProduitVenduPage() {
  return (
    <>
      <div className="row container_caissier liste_commande_title">
        <div className="col-xl-12">
          <div className="container">
            <div className="heading_container heading_center title">
              <h2>Liste des produits vendu</h2>
            </div>
          </div>
        </div>
        <div className="col-xl-12">
          <div className="card-body card-body-table">
            <table className="table table-hover table-success table-striped">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Nombre</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Produit</th>
                  <th>Nombre</th>
                  <th>Total</th>
                </tr>
              </tfoot>
              <tbody>
                <tr>
                  <td>item.produit</td>
                  <td>item.nombre</td>
                  <td>item.prix</td>
                </tr>
                <tr>
                  <td>item.produit</td>
                  <td>item.nombre</td>
                  <td>item.prix</td>
                </tr>
                <tr>
                  <td>item.produit</td>
                  <td>item.nombre</td>
                  <td>item.prix</td>
                </tr>
                <tr>
                  <td>item.produit</td>
                  <td>item.nombre</td>
                  <td>item.prix</td>
                </tr>
                <tr>
                  <td>item.produit</td>
                  <td>item.nombre</td>
                  <td>item.prix</td>
                </tr>
                <tr>
                  <td>item.produit</td>
                  <td>item.nombre</td>
                  <td>item.prix</td>
                </tr>
                <tr>
                  <td>item.produit</td>
                  <td>item.nombre</td>
                  <td>item.prix</td>
                </tr>
                <tr>
                  <td>item.produit</td>
                  <td>item.nombre</td>
                  <td>item.prix</td>
                </tr>
                <tr>
                  <td>item.produit</td>
                  <td>item.nombre</td>
                  <td>item.prix</td>
                </tr>
                <tr>
                  <td>item.produit</td>
                  <td>item.nombre</td>
                  <td>item.prix</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListeCommandeProduitVenduPage;
