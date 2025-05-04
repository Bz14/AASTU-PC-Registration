import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SidebarProvider } from "./Components/contexts/SidebarContext";
import { LoginProvider } from "./Components/contexts/LoginContext"; // Add LoginProvider here
import { MobileMenuProvider } from "./Components/contexts/MobileMenuContext"; // Import MobileMenuProvider
import MainLayout from "./Components/Layout/MainLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Dashboard from "./Pages/Dashboard";
import Settings from "./Pages/Settings";
import Students from "./Pages/Students";
import Admins from "./pages/Admins";
import Login from "./Pages/Login";
import PrivateRoute from "./Components/PrivateRoute";
import NotFound from "./pages/NotFound";
import Qrcomponents from "./pages/Qrcomponents";
import Qrpage from "./pages/QrPage";
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LoginProvider>
        <SidebarProvider>
          <MobileMenuProvider>
            {" "}
            {/* Wrap in MobileMenuProvider */}
            <Router>
              <Routes>
                {/* Login and Signup routes */}
                <Route path="/login" element={<Login />} />

                {/* All other routes use the MainLayout */}
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
                  {/* <Route path="Qrcomponents" element={<Qrcomponents />} /> */}
                  {/* <Route path="/qrcode/:studentId" element={<Qrcomponents />} /> */}
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
