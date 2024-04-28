import "./App.css";
import Calculator from "./components/Calculator";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  return (
    <div>
      <ThemeProvider>
        <Calculator />
      </ThemeProvider>
    </div>
  );
}

export default App;
