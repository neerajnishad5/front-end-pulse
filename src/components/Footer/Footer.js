// importing bootstrap from node_modules
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <div className="border back-footer text-white footer pt-3 mt-4 text-center row">
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
            >
              About
            </a>
          </li>
          <li>
            <a className="text-reset" href="#">
              Get started
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
            <a className="text-reset" href="#">
              Contacts
            </a>
          </li>
          <li>
            <a className="text-reset" href="#">
              Press
            </a>
          </li>
        </ul>
      </div>

      <div className="col-sm">
        <h5 className="mb-3">Resources</h5>
        <ul className="list-unstyled  ">
          <li>
            <a className="text-reset" href="#">
              Blog
            </a>
          </li>
          <li>
            <a className="text-reset" href="#">
              Newsletter
            </a>
          </li>
          <li>
            <a className="text-reset" href="#">
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>

      <div className="col-sm">
        <h5 className="mb-3">Newsletter</h5>
        <p className="small text-start  ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet soluta
          commodi dolorem ipsa reprehenderit dicta, et molestiae ducimus animi
          harum! eiusmod tempor incididunt.
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
  );
}
