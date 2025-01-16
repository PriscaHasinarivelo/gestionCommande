import { Link } from "react-router-dom";

function NavigationMenu() {
  return (
    <>
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Menu</div>
              <Link to="/accueil" className="nav-link">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Accueil
              </Link>

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
                  <Link to="/nouveau_commande">
                    <a className="nav-link" href="layout-static.html">
                      Nouveau commande
                    </a>
                  </Link>
                  <Link to="/payer_commande">
                    <a className="nav-link" href="layout-sidenav-light.html">
                      Payer commande
                    </a>
                  </Link>
                  <Link to="/modifier_commande">
                    <a className="nav-link" href="layout-sidenav-light.html">
                      Modifier commande
                    </a>
                  </Link>
                  <Link to="/liste_commande">
                    <a className="nav-link" href="layout-sidenav-light.html">
                      Liste des commandes non payé
                    </a>
                  </Link>
                </nav>
              </div>

              <Link to="/gestion_article" className="nav-link">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-chart-area"></i>
                </div>
                Gestion produit
              </Link>

              <Link to="/categorie" className="nav-link">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-chart-area"></i>
                </div>
                Gestion catégorie produit
              </Link>
              <Link to="/gestion_table" className="nav-link">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-chart-area"></i>
                </div>
                Gestion des tables
              </Link>
              <Link to="/journal_paye" className="nav-link">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-table"></i>
                </div>
                Journal de paye
              </Link>
            </div>
          </div>
          <div className="sb-sidenav-footer">
            <div className="small">Chez nous</div>
            Restaurant
          </div>
        </nav>
      </div>
    </>
  );
}

export default NavigationMenu;
