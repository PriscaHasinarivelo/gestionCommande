import "bootstrap/dist/css/bootstrap.min.css";

function ConstInformation() {
  return (
    <div className="alert alert-info alert-dismissible fade show" role="alert">
      Les commandes affiché ici sont des commandes <strong>non payé</strong> par
      table.
    </div>
  );
}

export default ConstInformation;
