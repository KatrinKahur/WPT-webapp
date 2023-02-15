import './App.css';
import Dashboard from "./views/dashboard";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/firebase";

function App() {
    initializeApp(firebaseConfig);
  return (
    <Dashboard />
  );
}
export default App;
