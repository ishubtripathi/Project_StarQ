import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Chat from "./pages/Chat";
import Collections from "./pages/Collections";
import Settings from "./pages/Settings";

import { DocumentProvider } from "./context/DocumentContext";

function App() {
  return (
    <BrowserRouter>
      <DocumentProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </DocumentProvider>
    </BrowserRouter>
  );
}

export default App;