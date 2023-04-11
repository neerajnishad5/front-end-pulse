// importing bootstrap from node_modules
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

export default function Footer() {

  const navigate = useNavigate();
  return (
    <>
      <div className="border back-footer footer pt-3 mt-4 text-center row">
        <div className="col-sm">
          <h5 className="mb-3">Quick links</h5>
          <ul className="list-unstyled  ">
            <li onClick={() => navigate("/")}>
              <a className="text-reset" href="#">
                Home
              </a>
            </li>
            <li>
              <a
                className="text-reset pointer"
                href="https://www.westagilelabs.com/about/"
                target="_blank"
                rel="noopener noreferrer"
              >
                About
              </a>
            </li>

            <li>
              <a className="text-reset" href="#">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div className="col-sm">
          <h5 className="mb-3">Company</h5>
          <ul className="list-unstyled  ">
            <li>
              <a className="text-reset" href="#">
                Our services
              </a>
            </li>
            <li>
              <a className="text-reset" href="#">
                Clients
              </a>
            </li>
            <li>
              <a
                className="text-reset"
                href="https://www.westagilelabs.com/contact/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div className="col-sm">
          <h5 className="mb-3">Resources</h5>
          <ul className="list-unstyled">
            <li>
              <a
                className="text-reset"
                href="https://www.westagilelabs.com/blog/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blog
              </a>
            </li>
            <li>
              <a className="text-reset" href="#">
                Newsletter
              </a>
            </li>
            <li>
              <a
                className="text-reset"
                href="https://www.westagilelabs.com/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div className="col-sm">
          <h5 className="mb-3">Newsletter</h5>
          <p className="small text-start  ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet         
            ducimus animi harum! eiusmod tempor incididunt.
          </p>
          <form>
            <div className="input-group mb-3">
              <input
                className="form-control"
                type="text"
                placeholder="Email"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <button className="btn btn-primary" type="button">
                <i className="fas fa-paper-plane">Submit</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
