function ButtonList() {
  return (
    <>
      <div className="button-list">
        <ul>
          <li>
            <button
              type="button"
              className="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#modalConfirmationCmdEnAttente"
            >
              <span className="btn-libelle">
                <b>En Attente</b>
              </span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="btn btn-light"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <span className="btn-libelle">
                <b>
                  <i className="bi bi-eye"></i>Voir commande
                </b>
              </span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default ButtonList;
