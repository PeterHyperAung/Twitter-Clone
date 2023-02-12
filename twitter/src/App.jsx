import { useEffect, useState } from "react";
import MainDrawer from "./components/MainDrawer";
import Header from "./Header";

import { Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Account from "./Pages/Account";
import EditAccount from './Pages/EditAccount'
import { useContext } from "react";
import { AuthContext } from "./Providers/AuthProvider";
import { verify } from "./apiCalls/apiCalls";
import Home from "./Pages/Home";
import AddTweet from "./Pages/AddTweet";

export default function App() {
  const [drawerState, setDrawerState] = useState(false);

  const { setAuth, setAuthUser } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const user = await verify();
      if (user) {
        setAuth(true);
        setAuthUser(user);
      }
    })();
  }, [setAuth, setAuthUser]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState(open);
  };

  return (
    <div>
      <Header toggleDrawer={toggleDrawer} />
      <MainDrawer drawerState={drawerState} toggleDrawer={toggleDrawer} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account">
          <Route index element={<Account />} />
          <Route path="edit" element={<EditAccount />} />
        </Route>
        <Route path="/tweets">
          <Route path="add" element={<AddTweet/>}/>
        </Route>
      </Routes>
    </div >
  );
}
