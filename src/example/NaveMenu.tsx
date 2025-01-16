function NavMenu() {
  return (
    <>
      <div className="nav">
        <div className="sb-sidenav-menu-heading">Menu</div>
        <a className="nav-link" href="index.html">
          <div className="sb-nav-link-icon">
            <i className="fas fa-tachometer-alt"></i>
          </div>
          Accueil
        </a>
        <a
          className="nav-link collapsed"
          href="#"
          data-bs-toggle="collapse"
          data-bs-target="#collapseLayouts"
          aria-expanded="false"
          aria-controls="collapseLayouts"
        >
          <div className="sb-nav-link-icon">
            <i className="fas fa-columns"></i>
          </div>
          Commandes
          <div className="sb-sidenav-collapse-arrow">
            <i className="fas fa-angle-down"></i>
          </div>
        </a>
        <div
          className="collapse"
          id="collapseLayouts"
          aria-labelledby="headingOne"
          data-bs-parent="#sidenavAccordion"
        >
          <nav className="sb-sidenav-menu-nested nav">
            <a className="nav-link" href="layout-static.html">
              Nouveau commande
            </a>
            <a className="nav-link" href="layout-sidenav-light.html">
              Payer commande
            </a>
            <a className="nav-link" href="layout-sidenav-light.html">
              Modifier commande
            </a>
            <a className="nav-link" href="layout-sidenav-light.html">
              Liste des commandes
            </a>
          </nav>
        </div>
        <a
          className="nav-link collapsed"
          href="#"
          data-bs-toggle="collapse"
          data-bs-target="#collapsePages"
          aria-expanded="false"
          aria-controls="collapsePages"
        >
          <div className="sb-nav-link-icon">
            <i className="fas fa-book-open"></i>
          </div>
          Menu (Produit)
          <div className="sb-sidenav-collapse-arrow">
            <i className="fas fa-angle-down"></i>
          </div>
        </a>
        <div
          className="collapse"
          id="collapsePages"
          aria-labelledby="headingTwo"
          data-bs-parent="#sidenavAccordion"
        >
          <nav
            className="sb-sidenav-menu-nested nav accordion"
            id="sidenavAccordionPages"
          >
            <a
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#pagesCollapseAuth"
              aria-expanded="false"
              aria-controls="pagesCollapseAuth"
            >
              Gestion des produits
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              className="collapse"
              id="pagesCollapseAuth"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordionPages"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <a className="nav-link" href="login.html">
                  Ajout nouveau produit
                </a>
                <a className="nav-link" href="register.html">
                  Liste des produits
                </a>
                <a className="nav-link" href="login.html">
                  Modifier produit
                </a>
                <a className="nav-link" href="password.html">
                  Mettre un article indisponible
                </a>
              </nav>
            </div>
            <a
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#pagesCollapseError"
              aria-expanded="false"
              aria-controls="pagesCollapseError"
            >
              Gestion des catégories produits
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              className="collapse"
              id="pagesCollapseError"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordionPages"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <a className="nav-link" href="401.html">
                  Ajout nouveau catégorie
                </a>
                <a className="nav-link" href="404.html">
                  Modifier catégorie
                </a>
                <a className="nav-link" href="500.html">
                  List des catégories
                </a>
              </nav>
            </div>
          </nav>
        </div>
        <a className="nav-link" href="charts.html">
          <div className="sb-nav-link-icon">
            <i className="fas fa-chart-area"></i>
          </div>
          Statistique
        </a>
        <a className="nav-link" href="tables.html">
          <div className="sb-nav-link-icon">
            <i className="fas fa-table"></i>
          </div>
          Journal de paye
        </a>
      </div>
    </>
  );
}

export default NavMenu;
