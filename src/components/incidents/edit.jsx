import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams  } from 'react-router-dom'


export default function Create() {
    const navigate = useNavigate();

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
        await axios.get(`http://localhost/api/incidents/${id}`).then(({data})=>{
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

        await axios.post(`http://localhost/api/incidents/${id}`, formData).then(({data})=>{ 
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
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Título</Form.Label>
                            <Form.Control type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control as="textarea" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Criticidade</Form.Label>
                            <Form.Select name="criticality" value={criticality} onChange={(e) => setCriticality(e.target.value)}>
                                <option value="Alta">Alta</option>
                                <option value="Média">Média</option>
                                <option value="Baixa">Baixa</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tipo</Form.Label>
                            <Form.Select name="type" value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="Alarme">Alarme</option>
                                <option value="Incidente">Incidente</option>
                                <option value="Outro">Outro</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Ativo</Form.Label>
                            <Form.Select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="1">Sim</option>
                                <option value="0">Não</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Button variant="primary" onClick={updateData}>
                                Atualizar
                            </Button>
                        </Form.Group>

                    </Form>
                </div>
            </div>
        </div>
            
    )
}