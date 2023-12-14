import { createBrowserRouter } from "react-router-dom";
import Home from "../ecommerce/home/pages/Home";
import Products from "../ecommerce/products/pages/Products";
import Prices from "../ecommerce/prices/pages/Prices";
import Orders from "../ecommerce/orders/pages/Orders";
import Pays from "../ecommerce/payments/pages/Payments";
import Shippigs from "../ecommerce/shippings/pages/Shippings";
import Error from "../share/errors/pages/Error";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
      children: [
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/prices",
          element: <Prices />,
        },
        {
            path: "/orders",
            element: <Orders />,
        },
        {
            path: "/payments",
            element: <Pays />,
        },
        {
            path: "/shippings",
            element: <Shippigs />,
        },
      ],
    },
  ]);
  export default router;
