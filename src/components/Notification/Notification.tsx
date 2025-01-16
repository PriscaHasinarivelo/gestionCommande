import "bootstrap/dist/css/bootstrap.min.css";

interface NotificationSuccessProps {
  message: string;
}

function Notification({ message }: NotificationSuccessProps) {
  switch (message) {
    case "Payement":
      return (
        <>
          <ModificationPayementSuccess />
        </>
      );

    case "Validation_commande":
      return (
        <>
          <ValidationCommandeSuccess />
        </>
      );

    case "Validation_commande_en_attente": {
      return (
        <>
          <ValidationCommandeEnAttenteSuccess />
        </>
      );
    }

    case "Annulation_commande": {
      return (
        <>
          <Annulation_commande_success />
        </>
      );
    }
  }

  return <></>;
}

function Annulation_commande_success() {
  return (
    <>
      <div
        className="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        <strong>Annulation commande réussie !</strong> Vos changements ont été
        enregistrés avec succès.
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </>
  );
}
function ModificationPayementSuccess() {
  return (
    <>
      <div
        className="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        <strong>Payement réussie !</strong> Vos changements ont été enregistrés
        avec succès.
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </>
  );
}

function ValidationCommandeSuccess() {
  return (
    <>
      <div
        className="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        <strong>Validation commande réussie !</strong> Vos changements ont été
        enregistrés avec succès.
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </>
  );
}

function ValidationCommandeEnAttenteSuccess() {
  return (
    <>
      <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <strong>Validation du commande en attente réussie !</strong> Vos
        changements ont été enregistrés avec succès.
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </>
  );
}

export default Notification;
