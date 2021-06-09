import React, { Suspense } from "react";
import Footer from "./components/Footer";
import { Route, Switch } from "react-router-dom";

import CategoryListPage from "./pages/CategoryListPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import CategoriesRoutes from "./components/CategoriesRoutes";
import LoadingOverlay from "./components/LoadingOverlay";
import HomePage from "./pages/HomePage";

const LoginPage = React.lazy(() => import("./pages/LoginPage"));

function App() {
  return (
    <div className="bg-gray-900 text-white h-screen static overflow-auto flex flex-col">
      <Route path="/app" component={Navbar} />
      <div className="flex-grow">
        <Suspense fallback={<LoadingOverlay />}>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/app" component={HomePage} />
            <Route path="/app/profile" component={ProfilePage} />
            <Route exact path="/app/categories" component={CategoryListPage} />
            <Route path="/app/categories/:name">
              <CategoriesRoutes />
            </Route>

            {/* This route should always be the last */}
            <Route exact path="*" component={NotFoundPage} />
          </Switch>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default App;
