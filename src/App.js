import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import style from "./app.module.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
function App() {
  const [link, linkChange] = useState('')
  const [initial_time, initial_timeChange] = useState('')
  const [final_time, final_timeChange] = useState('')
  const URL_BASE = "http://127.0.0.1:5000"
  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState(null);

  useEffect(() => {
    fetch(`${URL_BASE}/downloads`)
      .then(res => res.blob())      
      .then(data => {
        console.log("dataaa", data)
        setFileData(data);
        setFileName(data.headers.get('Content-Disposition').split('filename=')[1]);
      });
  }, []);

  const downloadFile = (e) => {
    e.preventDefault()

    const fields = {link, initial_time, final_time}
    const url = window.URL.createObjectURL(fileData);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    
  }



  return (
    <div className={style.app}>
      <div
        className="col-sm-12 col-md-12 col-lg-12"
        align="center"
        style={{ marginTop: "10rem" }}
      >
        <h4>Baixar, Editar e Converter Vídeos do YouTube</h4>
        <div
          className=""
          align="center"
          style={{ width: "40rem", padding: "10px" }}
        >
          <FloatingLabel
            controlId="floatingInput"
            label="Link do Vídeo"
            className="mb-3"
          >
            <Form.Control
              type="text"
              value={link}
              onChange={(e) => linkChange(e.target.value)}
              className="ml-3"
              placeholder="name@example.com"
            />
          </FloatingLabel>
        </div>
        <div className="mb-3" style={{ width: "20rem" }}>
          <Row className="g-2 ">
            <Col md>
              <FloatingLabel
                controlId="floatingInputGrid"
                label="Tempo Inicial"
              >
                <Form.Control type="time" value={initial_time}
              onChange={(e) => initial_timeChange(e.target.value)} placeholder="Tempo Inicial" />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Tempo Final">
                <Form.Control type="time" value={final_time}
              onChange={(e) => final_timeChange(e.target.value)} placeholder="Tempo Final" />
              </FloatingLabel>
            </Col>
          </Row>
        </div>
        <div>
          <div className="mb-3">
            <span>Formato de saída</span>
          </div>
        <Form>
            {["radio"].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="mp3"
                  type={type}
                  id={`inline-${type}-1`}
                />
                <Form.Check
                  inline
                  label="mp4"
                  name="group1"
                  type={type}
                  id={`inline-${type}-1`}
                />
              </div>
            ))}
          </Form>
        </div>
        {<Button size="xl" onClick={downloadFile} type="submit" variant="outline-info">
          Baixar Agora
        </Button>}
        
      </div>

      <footer className="col-sm-12 col-md-12 col-lg-12"
        align="center" style={{ marginTop: "10rem" }}>
        Alessandra Avelino ❤️
        </footer>
    </div>
    
  );
}

export default App;
