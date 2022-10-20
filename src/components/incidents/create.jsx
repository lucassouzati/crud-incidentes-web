import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'


export default function Create() {
    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
        postData(event)
      };

    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [criticality, setCriticality] = useState('');
    const [type, setType] = useState('');
    const [status, setSatus] = useState('1');
    const [validationError,setValidationError] = useState({})
    
    const postData = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('title', title)
        formData.append('description', description)
        formData.append('criticality', criticality)
        formData.append('type', type)
        formData.append('status', status)

        await axios.post(`http://localhost/api/incidents`, formData).then(({data})=>{ 
            Swal.fire({
                icon:"success",
                text:"Incidente cadastrado com sucesso!"
              })
              navigate("/")
            }).catch(({response})=>{
              if(response.status===422){
                setValidationError(response.data.errors)
              }else{
                Swal.fire({
                  text:response.data.message,
                  icon:"error"
                })
              }
            })
        }

    return (
        <div className="container">
            <div className="col-12 col-sm-12 col-md-6">
                <div className="form-wrapper">
                    {
                    Object.keys(validationError).length > 0 && (
                        <div className="row">
                            <div className="col-12">
                                <div className="alert alert-danger">
                                <ul className="mb-0">
                                    {
                                    Object.entries(validationError).map(([key, value])=>(
                                        <li key={key}>{value}</li>   
                                    ))
                                    }
                                </ul>
                                </div>
                            </div>
                        </div>
                    )
                    }
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group controlId="validationCustom01">
                                <Form.Label>Título</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    required
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    name="description" 
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Criticidade</Form.Label>
                                <Form.Select 
                                    name="criticality" 
                                    onChange={(e) => setCriticality(e.target.value)}
                                    required
                                >
                                    <option value=""></option>
                                    <option value="Alta">Alta</option>
                                    <option value="Média">Média</option>
                                    <option value="Baixa">Baixa</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Tipo</Form.Label>
                                <Form.Select 
                                    name="type" 
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                    >
                                    <option value=""></option>
                                    <option value="Alarme">Alarme</option>
                                    <option value="Incidente">Incidente</option>
                                    <option value="Outro">Outro</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Ativo</Form.Label>
                                <Form.Select 
                                    name="status" 
                                    onChange={(e) => setSatus(e.target.value)}
                                    defaultValue="1"
                                    required
                                    >
                                    <option value="1">Sim</option>
                                    <option value="0">Não</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Button type="submit" variant="primary">
                                    Submit
                                </Button>
                            </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
            
    )
}