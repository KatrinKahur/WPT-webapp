import './App.css';
import Dashboard from "./views/dashboard";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/firebase";
import NavigationBar from "./components/navigationBar";

function App() {
    initializeApp(firebaseConfig);
  return (
      <>
          <NavigationBar />
          <Dashboard />
      </>
  );
}
export default App;
