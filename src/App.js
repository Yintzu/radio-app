import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import RadioProvider from "./contexts/RadioContext";
import UsersProvider from "./contexts/UsersContext";
import ChannelDesc from "./pages/ChannelDesc";
import Channels from "./pages/Channels";
import EditAccount from "./pages/EditAccount";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import ProgramDesc from "./pages/ProgramDesc";
import Programs from "./pages/Programs";
import Register from "./pages/Register";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UsersProvider>
          <RadioProvider>
            <Navbar />
            <div className="body">
              <div className="container">
                <Route exact path="/" component={Home} />
                <Route exact path="/channels" component={Channels} />
                <Route exact path="/channels/:channelId" component={ChannelDesc} />
                <Route exact path="/programs/:programId" component={ProgramDesc} />
                <Route exact path="/programs" component={Programs} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/edit" component={EditAccount} />
                <Route exact path="/favorites" component={Favorites} />
              </div>
            </div>
          </RadioProvider>
        </UsersProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
