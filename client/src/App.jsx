import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SidebarProvider } from "./Components/contexts/SidebarContext";
import { LoginProvider } from "./Components/contexts/LoginContext"; // Add LoginProvider here
import { MobileMenuProvider } from "./Components/contexts/MobileMenuContext"; // Import MobileMenuProvider
import MainLayout from "./Components/Layout/MainLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Students from "./pages/Students";
import Admins from "./pages/Admins";
import Login from "./pages/login";
import PrivateRoute from "./Components/privateRoute";
import NotFound from "./pages/NotFound";
import Qrpage from "./pages/QrPage";
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LoginProvider>
        <SidebarProvider>
          <MobileMenuProvider>
            {" "}
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <MainLayout />
                    </PrivateRoute>
                  }
                >
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="students" element={<Students />} />
                  <Route path="/qrpage/:serial_number" element={<Qrpage />} />

                  <Route path="admins" element={<Admins />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Router>
          </MobileMenuProvider>
        </SidebarProvider>
      </LoginProvider>
    </QueryClientProvider>
  );
}

export default App;
