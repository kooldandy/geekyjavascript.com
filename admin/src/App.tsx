import "./App.css";
import { RouterProvider } from "react-router-dom";
import {AppRouter} from "@router/index";

function App() {
  return (
    <>
      <RouterProvider router={AppRouter} />
    </>
  );
}

export default App;
