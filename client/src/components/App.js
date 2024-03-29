import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header'
import Landing from './Landing';
const DashBoard = () => <h2>DashBoard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>


class App extends Component{
   componentDidMount() {
    this.props.fetchUser();
   }

    render (){ 
       return(
        <div className = "container">
            <BrowserRouter> {/*Browser forvent maks et barn*/}
                <div>
                    <Header/>
                    <Route exact path = "/" component = {Landing} /> {/*exact så ikke "/" blir med på alle sider */}
                    <Route exact path = "/surveys" component = {DashBoard} />
                    <Route path = "/surveys/new" component = {SurveyNew} />
                </div>
            </BrowserRouter>
        </div>
        );
    }
}

export default connect(null, actions) (App);