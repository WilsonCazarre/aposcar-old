import React from "react";
import { Route, Switch } from "react-router-dom";

import { useCategories } from "../hooks/api";
const CategoryDetailPage = React.lazy(
  () => import("../pages/CategoryDetailPage")
);

const CategoriesRoutes: React.FC = () => {
  const { data } = useCategories();

  return (
    <Switch>
      {data?.map((category, idx, arr) => {
        const next = arr[idx + 1];
        const previous = arr[idx - 1];

        return (
          <Route
            path={`/app/categories/${category.urlField}/`}
            key={category.id}
          >
            <CategoryDetailPage
              name={category.urlField}
              nextUrl={next && next.urlField}
              previousUrl={previous && previous.urlField}
            />
          </Route>
        );
      })}
    </Switch>
  );
};

export default CategoriesRoutes;
