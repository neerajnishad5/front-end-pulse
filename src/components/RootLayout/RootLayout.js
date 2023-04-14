// importing components
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// importing bootstrap from node_modules
import "bootstrap/dist/css/bootstrap.min.css";

export default function RootLayout() {
  return (
    < >
      <Header />
      <div className="mt-5 rounded" style={{ minHeight: "50vh" }}>
        <Outlet />
      </div>
      <Footer />
    </ >
  );
}
