import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import {AddForm} from "../components/AddForm";
import {UserTasksList} from "../components/UsersTasks";
import {CurrentTable} from "../components/Table";
import {Header} from "../components/Header"
import {EditForm} from '../components/EditForm';
import './App.css';

function App() {
    return (
        <div className={'App'}>
            <Router>
                <Header/>
                <Switch>
                    <Route exact path='/' component={CurrentTable}/>
                    <Route exact path='/create' component={AddForm}/>
                    <Route exact path='/edit/:id' component={EditForm}/>
                    <Route exact path='/user/:id' component={UserTasksList}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;