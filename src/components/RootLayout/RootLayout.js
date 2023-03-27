// importing components
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// importing bootstrap from node_modules
import "bootstrap/dist/css/bootstrap.min.css";

export default function RootLayout() {
  return (
    <div>
      <Header />
      <div
        className="container outlet mt-5  rounded"
        style={{ minHeight: "60vh" }}
      >
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
