import { Route, Routes } from "react-router-dom";
import ProductTable from "./components/ProductTable";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProductTable />} />
      </Route>
    </Routes>
  );
}

export default App;
