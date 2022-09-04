import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function ViewTeacher() {

    const [loading, setLoading] = useState(true);
    const [teacher, setTeachers] = useState([]);

    useEffect(() => {

        axios.get('/api/Teachers').then(res => {
            if (res.data.status === 50) {
                setTeachers(res.data.teacher)
                setLoading(false);
            }
        });
    }, []);

    const deleteTeacher = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-Teacher/${id}`).then(res => {
            if (res.data.status === 200) {
                swal("Deleted!", res.data.message, "success");
                thisClicked.closest("tr").remove();
            }
        });
    }

    if (loading) {
        return <h5> Loading Teacher data... </h5>
    } else {
        var teacher_HTMLTABLE = "";

        teacher_HTMLTABLE = teacher.map((item, index) => {
            return (
                <tr key={index}>
                    <td> {item.id} </td>
                    <td> {item.name} </td>
                    <td> {item.course} </td>
                    <td> {item.phone} </td>
                    <td> {item.email} </td>
                    <td> {item.DOB} </td>
                    <td>
                        <Link to={`edit-Teacher/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteTeacher(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card" >
                            <div className="card-header" >
                                <h4> Teachers Data
                                    <Link to={'add-teacher'} className="btn btn-primary btn-sm float-end"> Add Teacher</Link>
                                </h4>
                            </div >
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead >
                                        <tr >
                                            <th> ID </th>
                                            <th> Name </th>
                                            <th> Course </th>
                                            <th> Phone </th>
                                            <th> Email </th>
                                            <th> DOB </th>
                                        </tr >
                                    </thead>
                                    <tbody >
                                        {teacher_HTMLTABLE}
                                    </tbody>
                                </table>
                            </div>
                        </div >
                    </div>
                </div>
            </div >
        </div>
    );
}

export default ViewTeacher;