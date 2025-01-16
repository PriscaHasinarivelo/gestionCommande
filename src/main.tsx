import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App.tsx";
import NavigationMenu from "./components/NavigationMenu.tsx";
import NavigationBar, { ComboLogin } from "./components/NavigationBar.tsx";
import { UserProv } from "./components/Utilisateur/Utilisateur.tsx";
// import { NoteProv } from "./example/Blog.tsx";
import NavBar from "./route/NavBar.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

createRoot(document.getElementById("nav_menu")!).render(
  <StrictMode>
    <NavigationMenu />
  </StrictMode>
);

createRoot(document.getElementById("nav_bar")!).render(
  <StrictMode>
    <NavBar />
  </StrictMode>
);

createRoot(document.getElementById("info_login")!).render(
  <StrictMode>
    <UserProv>
      <NavigationBar />
    </UserProv>
  </StrictMode>
);

createRoot(document.getElementById("combo_login")!).render(
  <StrictMode>
    <ComboLogin />
  </StrictMode>
);
