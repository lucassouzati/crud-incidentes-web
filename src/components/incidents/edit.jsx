import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams  } from 'react-router-dom'
import setupApiClient from "../../services/api";


export default function Create() {
    const navigate = useNavigate();
    const apiClient = setupApiClient();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
        updateData(event)
      };

    const [validated, setValidated] = useState(false);

    const { id } = useParams()

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [criticality, setCriticality] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [validationError,setValidationError] = useState({})

    useEffect(()=>{
        fetchIncident()
      },[])


    const fetchIncident = async () => {
        await apiClient.get(`/incidents/${id}`).then(({data})=>{
          const { title, description, criticality, type, status } = data.data
          setTitle(title)
          setDescription(description)
          setCriticality(criticality)
          setType(type)
          setStatus(status)
        }).catch(({response:{data}})=>{
          Swal.fire({
            text:data.message,
            icon:"error"
          })
        })
      }
    
    const updateData = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('_method', 'put')
        formData.append('title', title)
        formData.append('description', description)
        formData.append('criticality', criticality)
        formData.append('type', type)
        formData.append('status', status)

        await apiClient.post(`/incidents/${id}`, formData).then(({data})=>{ 
            Swal.fire({
                icon:"success",
                text:"Incidente atualizado com sucesso!"
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
                    <Form.Group className="mb-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="title" 
                            value={title} onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            name="description" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col md={12} lg={4}>
                                <Form.Label>Criticidade</Form.Label>
                                <Form.Select 
                                    name="criticality" 
                                    value={criticality} 
                                    onChange={(e) => setCriticality(e.target.value)}
                                    required
                                >
                                    <option value=""></option>
                                    <option value="Alta">Alta</option>
                                    <option value="Média">Média</option>
                                    <option value="Baixa">Baixa</option>
                                </Form.Select>
                            </Col>
                            <Col md={12} lg={4}>
                                <Form.Label>Tipo</Form.Label>
                                <Form.Select 
                                    name="type" 
                                    value={type} 
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                >
                                    <option value="Alarme">Alarme</option>
                                    <option value="Incidente">Incidente</option>
                                    <option value="Outro">Outro</option>
                                </Form.Select>
                            </Col>
                            <Col md={12} lg={4}>
                                <Form.Label>Ativo</Form.Label>
                                <Form.Select 
                                    name="status" 
                                    value={status} 
                                    onChange={(e) => setStatus(e.target.value)}
                                    defaultValue="1"
                                    required
                                >
                                    <option value="1">Sim</option>
                                    <option value="0">Não</option>
                                </Form.Select>
                            </Col>
                            </Row>
                        </Form.Group>
                    <Form.Group className="mt-3">
                        <Button type="submit" variant="primary">
                            Atualizar
                        </Button>
                    </Form.Group>

                </Form>
            </div>
    )
}