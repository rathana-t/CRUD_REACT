import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function AddTeacher() {

    const history = useHistory();
    const [TeacherInput, setTeacher] = useState({
        name: '',
        course: '',
        email: '',
        phone: '',
        DOB: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setTeacher({ ...TeacherInput, [e.target.name]: e.target.value })
    }

    const saveTeacher = (e) => {
        e.preventDefault();

        const data = {
            name: TeacherInput.name,
            course: TeacherInput.course,
            email: TeacherInput.email,
            phone: TeacherInput.phone,
            DOB: TeacherInput.DOB,
        }

        axios.post(`/api/add-Teacher`, data).then(res => {

            if (res.data.status === 2900) {
                swal("Success!", res.data.message, "success");
                setTeacher({
                    name: '',
                    course: '',
                    email: '',
                    phone: '',
                    DOB: '',
                    error_list: [],
                });
                history.push('/Teachers');
            }
            else if (res.data.status === 404) {
                setTeacher({ ...TeacherInput, error_list: res.data.validate_err });
            }
        });
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Teachers
                                    <Link to={'/'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={saveTeacher} >
                                    <div className="form-group">
                                        <label>Teacher Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={TeacherInput.name} className="form-control" />
                                        <small className="text-danger">{TeacherInput.error_list.name}</small>
                                    </div>
                                    <div className="form-group">
                                        <label>Teacher Course</label>
                                        <input type="text" name="course" onChange={handleInput} value={TeacherInput.course} className="form-control" />
                                        <small className="text-danger">{TeacherInput.error_list.course}</small>
                                    </div>
                                    <div className="form-group">
                                        <label>Teacher Email</label>
                                        <input type="text" name="email" onChange={handleInput} value={TeacherInput.email} className="form-control" />
                                        <small className="text-danger">{TeacherInput.error_list.email}</small>
                                    </div>
                                    <div className="form-group">
                                        <label>Teacher Phone</label>
                                        <input type="text" name="phone" onChange={handleInput} value={TeacherInput.phone} className="form-control" />
                                        <small className="text-danger">{TeacherInput.error_list.phone}</small>
                                    </div>
                                    <div className="form-group">
                                        <label>Teacher DOB</label>
                                        <input type="date" name="DOB" onChange={handleInput} value={TeacherInput.DOB} className="form-control" />
                                        <small className="text-danger">{TeacherInput.error_list.DOB}</small>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary">Save Teacher</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AddTeacher;