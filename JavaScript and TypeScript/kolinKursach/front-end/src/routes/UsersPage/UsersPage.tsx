import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import './UsersPage.css';

//{"id":3,"full_name":"Test 3 changed","created_at":"2020-02-14T00:06:37.836Z","group_id":1}

interface IResponse {
    id: number,
    full_name: string,
    created_at: string,
    group_id: number
}


function UsersPage() {
    const [res, setRes] = useState(Array<IResponse>());
    const [formName, setFormName] = useState("");
    const [formGroup, setFormGroup] = useState("");
    const [show, setShow] = useState(false);
    useEffect(() => {
        fetch(`/users`)
        .then(res => res.json())
        .then(res => {
            setRes(res);
        })
    });

    const handleNameChange = (event: any) => {
        setFormName(event.target.value);
    }

    const handleGroupChange = (event: any) => {
        setFormGroup(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({"name": formName, "groupId": formGroup})
        })
        .then(response => response.json())
        .then(response => console.log(response));
        handleClose();
        setFormName('');
        setFormGroup('');
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="users-page">
            <Button variant="primary" onClick={handleShow}>
                New user
            </Button>

            <Modal show={show} onHide={handleClose}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" value={formName} onChange={handleNameChange}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formGroup">
                            <Form.Label>Group number</Form.Label>
                            <Form.Control type="number" placeholder="Group" value={formGroup} onChange={handleGroupChange}></Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
            </Modal>
            <Table hover striped>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Created</th>
                        <th>Group</th>
                    </tr>
                </thead>
                <tbody>
                    {res.map(el => 
                        <tr key={el.id}>
                            <td data-title="ID">{el.id}</td>
                            <td data-title="Name">{el.full_name}</td>
                            <td data-title="Created">{el.created_at}</td>
                            <td data-title="Group">{el.group_id}</td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
    );
}



export default UsersPage;
