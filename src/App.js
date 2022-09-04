import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './pages/Navbar';
import HomePage from './pages/Home';

import ViewStudent from './pages/students/ViewStudent';
import AddStudent from './pages/students/AddStudent';
import EditStudent from './pages/students/EditStudent';
import ViewTeacher from './pages/teachers/ViewTeacher';
import AddTeacher from './pages/teachers/AddTeacher';
import EditTeacher from './pages/teachers/EditTeacher';
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  return (
    <div className="App">
      <Router>

        <Navbar />

        <Switch>
          <Route path="/Home" component={HomePage} />

          <Route path="/Teachers" component={ViewTeacher} />
          <Route path="/add-teacher" component={AddTeacher} />
          <Route path="/edit-Teacher/:id" component={EditTeacher} />
          <Route path="/students" component={ViewStudent} />
          <Route path="/add-student" component={AddStudent} />
          <Route path="/edit-student/:id" component={EditStudent} />

        </Switch>
      </Router>

    </div>
  );
}

export default App;