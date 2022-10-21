import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'
import setupApiClient from "../../services/api";

export default function List() {

    const [incidents, setIncidents] = useState([])
    const apiClient = setupApiClient();

    useEffect(()=>{
        fetchIncidents() 
    },[])

    const fetchIncidents = async () => {
        await apiClient.get(`/incidents`).then(({data})=>{
            setIncidents(data.data)
        })
    }

    const deletIncident = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Você tem certeza disso?',
            text: "Deseja realmente excluir esse registro?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, tenho certeza'
          }).then((result) => {
            return result.isConfirmed
          });

          if(!isConfirm){
            return;
          }

          await apiClient.delete(`/incidents/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:"Incidente excluído com sucesso!"
            })
            fetchIncidents()
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })
    }

    return (
      <div className="container">
          <div className="row">
            <div className='col-12'>
                <Link className='btn btn-primary mb-2 float-end' to={"/incidents/create"}>
                    Cadastrar
                </Link>
            </div>
            <div className="col-12">
                <div className="card card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Descrição</th>
                                    <th>Criticalidade</th>
                                    <th>Tipo</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    incidents.length > 0 && (
                                        incidents.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.title}</td>
                                                <td>{row.description}</td>
                                                <td>{row.criticality}</td>
                                                <td>{row.type}</td>
                                                <td>{row.status}</td>
                                                <td>
                                                    <Link to={`/incidents/edit/${row.id}`} className='btn btn-success me-2'>
                                                        Editar
                                                    </Link>
                                                    <Button variant="danger" onClick={()=>deletIncident(row.id)}>
                                                        Deletar
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </div>
      </div>
    )
}