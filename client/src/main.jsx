import ReactDOM from "react-dom/client";
import App from "./App";

// import { ThemeProvider } from './Contexts/ThemeContext';
import "./index.css"; // Include your global styles
import { ThemeProvider } from "../src/Components/contexts/ThemeContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
