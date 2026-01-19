import { Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import { ThemeProvider } from "./components/theme-provider";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
