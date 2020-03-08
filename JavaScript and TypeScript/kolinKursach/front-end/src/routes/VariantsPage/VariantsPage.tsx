import React, { useEffect, useState, useLayoutEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import './VariantsPage.css';

//{"id":3,"full_name":"Test 3 changed","created_at":"2020-02-14T00:06:37.836Z","group_id":1}

interface IResponse {
    ex_id: number,
    var_id: number,
    id: number,
    title: String,
    text: String,
    type: String,
    cost: number,
    variants: Array<String>,
    total_cost: number
}

interface IVar {
    id: number,
    total_cost: number,
    exercise: Array<{
        title: String,
        text: String,
        type: String,
        variants: Array<String>,
        cost: number
    }>
}


function VariantsPage() {
    const [formName, setFormName] = useState("");
    const [formGroup, setFormGroup] = useState("");
    const [show, setShow] = useState(false);
    const [vars, setVars] = useState(new Map<Number, IVar>());
    const [varsArray, setVarsArray] = useState(Array<IVar>());
    const [upToDate, setUpToDate] = useState(false);
    useLayoutEffect(() => {
        if (upToDate) return;
        fetch(`/variants`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            res = res.sort((a: IResponse, b: IResponse) => a.id - b.id);
            res.map((elem: IResponse) => {
                if (!vars.has(elem.id)) {
                    vars.set(elem.id, {
                        id: elem.id,
                        total_cost: elem.total_cost,
                        exercise: [{
                            title: elem.title,
                            text: elem.text,
                            type: elem.type,
                            variants: elem.variants,
                            cost: elem.cost
                        }]
                    })
                } else {
                    let ph = vars.get(elem.id);
                    ph?.exercise.push({
                        title: elem.title,
                        text: elem.text,
                        type: elem.type,
                        variants: elem.variants,
                        cost: elem.cost
                    })
                }
                
            })
            setVarsArray([...vars.values()]);
            setUpToDate(true);
        })
    }, [upToDate]);

    const handleGroupChange = (event: any) => {
        setFormGroup(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch('/variants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({"exercises": formGroup})
        })
        .then(response => response.json())
        .then(response => console.log(response));
        handleClose();
        setFormName('');
        setFormGroup('');
        setUpToDate(false);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="users-page">
            <Button variant="primary" onClick={handleShow}>
                New variant
            </Button>

            <Modal show={show} onHide={handleClose}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formGroup">
                            <Form.Label>Exercise numbers</Form.Label>
                            <Form.Control type="text" placeholder="1,2,5,6" value={formGroup} onChange={handleGroupChange}></Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
            </Modal>
            <Accordion defaultActiveKey="0">
                {varsArray.map(elem => <Card key={elem.id}>
                    <Accordion.Toggle as={Card.Header} eventKey={'' + elem.id} id={elem.id}>
                        Variant {elem.id}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={'' + elem.id}>
                        <Card.Body>
                            {elem.exercise.map(elem => <Card>
                                <h3>{elem.title}</h3>
                                <p>{elem.text}</p>
                                <p>Type: {elem.type}</p>
                                <p>Variants: {elem.variants}</p>
                                <p>Cost: {elem.cost}</p>
                            </Card>)}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>)}
            </Accordion>
        </div>
    );
}



export default VariantsPage;
