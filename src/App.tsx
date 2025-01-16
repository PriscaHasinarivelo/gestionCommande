import { BrowserRouter } from "react-router-dom";
import { UserProv } from "./components/Utilisateur/Utilisateur";
import NavigationBar from "./components/NavigationBar";
import Router from "./route/Router";
import NavigationMenu from "./components/NavigationMenu";

function App() {
  return (
    <>
      <UserProv>
        <BrowserRouter>
          <NavigationMenu />
          <Router></Router>
        </BrowserRouter>
      </UserProv>

      <UserProv>
        <NavigationBar></NavigationBar>
      </UserProv>
    </>
  );
}

export default App;
