import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination, Button, Modal, Form, Row, Col } from 'react-bootstrap';

function UserList() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(4);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        login: '',
        html_url: '',
    });
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.github.com/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    console.log(users);
    //Just to check the data
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({
            login: '',
            html_url: '',
        });
        setSelectedUserId(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddUser = () => {
        const lastUserId = users.length > 0 ? users[users.length - 1].id : 0;
        const newUser = { ...formData, id: lastUserId + 1 }; 
        setUsers([...users, newUser]);
        handleCloseModal();
    };

    const handleDeleteUser = (id) => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
    };

    const handleUpdateUser = (id) => {
        const updatedUsers = users.map(user => {
            if (user.id === id) {
                return {
                    ...user,
                    login: formData.login,
                    html_url: formData.html_url
                };
            }
            return user;
        });
        setUsers(updatedUsers);
        handleCloseModal();
    };

    const handleEditUser = (id) => {
        const selectedUser = users.find(user => user.id === id);
        setFormData({
            login: selectedUser.login,
            html_url: selectedUser.html_url
        });
        setSelectedUserId(id);
        handleShowModal();
    };

    return (
        <div>
            <h4>Github Users 🧑🏻‍💻</h4>
           

            <Table striped bordered hover variant="dark" className='fixed-size-table'>
                <thead>
                    <tr>
                        <th className='thStyle'>Username</th>
                        <th>Profile URL</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.login}</td>
                            <td>{user.html_url}</td>
                            <td>
                                <Button variant="success" onClick={() => handleEditUser(user.id)}>Edit</Button><span>     </span>
                                <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Row className="mb-3">
                <Col>
                    <Button variant="primary" onClick={handleShowModal}>Add User</Button>
                </Col>
            </Row>

            <Pagination>
                {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
                    <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedUserId ? 'Edit User' : 'Add User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <Form>

                        <Form.Group controlId="formLogin">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter username" 
                            name="login" 
                            value={formData.login} 
                            onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formProfileURL">
                            <Form.Label>Profile URL</Form.Label>
                            <Form.Control 
                            type="text" placeholder="Enter profile URL" 
                            name="html_url" 
                            value={formData.html_url} 
                            onChange={handleChange} />
                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={selectedUserId ? () => handleUpdateUser(selectedUserId) : handleAddUser}>
                        {selectedUserId ? 'Update User' : 'Add User'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UserList;
