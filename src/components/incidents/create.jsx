import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


export default function Create() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [criticality, setCriticality] = useState('');
    const [type, setType] = useState('');
    const [status, setSatus] = useState('');
    const postData = () => {
        console.log(title)
        console.log(description)
        console.log(criticality)
        console.log(type)
        console.log(status)
        axios.post(`http://localhost/api/incidents`, {
            title,
            description,
            criticality,
            type,
            status
        })
}
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Título</Form.Label>
                <Form.Control type="text" name="title" onChange={(e) => setTitle(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Descrição</Form.Label>
                <Form.Control as="textarea" name="description" onChange={(e) => setDescription(e.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Criticidade</Form.Label>
                <Form.Select name="criticality" onChange={(e) => setCriticality(e.target.value)}>
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Baixa">Baixa</option>
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Tipo</Form.Label>
                <Form.Select name="type" onChange={(e) => setType(e.target.value)}>
                    <option value="Alarme">Alarme</option>
                    <option value="Incidente">Incidente</option>
                    <option value="Outro">Outro</option>
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Ativo</Form.Label>
                <Form.Select name="status" onChange={(e) => setSatus(e.target.value)}>
                    <option value="1">Sim</option>
                    <option value="0">Não</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mt-3">
                <Button variant="primary" onClick={postData}>
                    Submit
                </Button>
            </Form.Group>

        </Form>
            
    )
}