import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function EditTeacher(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [TeacherInput, setTeacher] = useState([]);
    const [errorInput, setError] = useState([]);

    useEffect(() => {

        const Teacher_id = props.match.params.id;
        axios.get(`/api/edit-Teacher/${Teacher_id}`).then(res => {

            if (res.data.status === 200) {
                setTeacher(res.data.teacher);
                setLoading(false);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                history.push('/Teachers');
            }
        });

    }, [history]);

    const handleInput = (e) => {
        e.persist();
        setTeacher({ ...TeacherInput, [e.target.name]: e.target.value });
    }

    const updateTeacher = (e) => {
        e.preventDefault();

        const Teacher_id = props.match.params.id;
        // const data = TeacherInput;
        const data = {
            name: TeacherInput.name,
            course: TeacherInput.course,
            email: TeacherInput.email,
            phone: TeacherInput.phone,
            DOB: TeacherInput.DOB,
        }

        axios.put(`/api/update-Teacher/${Teacher_id}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                setError([]);
                history.push('/Teachers');
            }
            else if (res.data.status === 404) {
                setError(res.data.validate_err);
            }
        });
    }

    if (loading) {
        return <h4>Loading Edit Teacher Data...</h4>
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Teachers
                                    <Link to={'/Teachers'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">

                                <form onSubmit={updateTeacher} >
                                    <div className="form-group mb-3">
                                        <label>Teacher Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={TeacherInput.name} className="form-control" />
                                        <span className="text-danger">{errorInput.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Teacher Course</label>
                                        <input type="text" name="course" onChange={handleInput} value={TeacherInput.course} className="form-control" />
                                        <span className="text-danger">{errorInput.course}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Teacher Email</label>
                                        <input type="text" name="email" onChange={handleInput} value={TeacherInput.email} className="form-control" />
                                        <span className="text-danger">{errorInput.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Teacher Phone</label>
                                        <input type="text" name="phone" onChange={handleInput} value={TeacherInput.phone} className="form-control" />
                                        <span className="text-danger">{errorInput.phone}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Teacher DOB</label>
                                        <input type="date" name="DOB" onChange={handleInput} value={TeacherInput.DOB} className="form-control" />
                                        <span className="text-danger">{errorInput.DOB}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className="btn btn-primary">Update Teacher</button>
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

export default EditTeacher;