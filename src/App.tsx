import "@/global.css";

import { RouterProvider } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from 'sonner';

import { router } from "./routes";
import { ThemeProvider } from "./components/theme/theme-provider";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="pizashop-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | pizza.shop" />
        <Toaster richColors />
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
