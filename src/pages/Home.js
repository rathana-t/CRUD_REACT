import React from "react";
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <div className="container text-center">
                <Link to="/Teachers"><button type="button" className="btn btn-danger btn-sm" >Teacher</button></Link>
                <Link to="/students"><button type="button" className="btn btn-danger btn-sm">Student</button></Link>
            </div>
        </div>
    );
}

export default HomePage;