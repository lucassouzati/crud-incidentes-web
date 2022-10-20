import './App.css'

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

import CreateIncident from './components/incidents/create';
import EditIncident from './components/incidents/edit';
import ListIncident from './components/incidents/list';

  function App() {
    return (
    <Router>
      <Navbar bg="primary">
        <Container>
          <Link to={"/"} className="navbar-brand text-white">
            Cadastro de Incidentes
          </Link>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <Routes>
              <Route path="/incidents/create" element={<CreateIncident />} />
              <Route path="/incidents/edit/:id" element={<EditIncident />} />
              <Route exact path='/' element={<ListIncident />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>);
  }
  
  export default App;
