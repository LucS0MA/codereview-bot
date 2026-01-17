import { Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
