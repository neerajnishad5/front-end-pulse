// importing bootstrap from node_modules
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "../Register/Register";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Home.css";

// exporting root layout component
export default function Home() {
  return (
    <div>
      <Container>
        <Row>
          <Col xs={9} className="make-bg ">
            <img
              src="https://scontent.fhyd14-1.fna.fbcdn.net/v/t1.6435-9/52840153_2321355157875138_4261001260104155136_n.png?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=u-fKOKl5LsgAX-8nWUQ&_nc_ht=scontent.fhyd14-1.fna&oh=00_AfAMyUtaiIv8MXW8A9CJ7a-6Rac6zLJ1x_8OWy_-ff6TRg&oe=64492720"
              alt=""
              srcset=""
              className="img-responsive"
              width={"450px"}
            />
          </Col>
          <Col>
            <Register />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

{
  /* <div className="d-flex justify-content-between">
       
      
       <div>
         <Register />
       </div>
     </div> */
}
