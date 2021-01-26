import React, {Component} from 'react';
import { Provider } from 'react-redux';
import {connect } from 'react-redux';
import { Link } from 'react-router-dom'; //for å dynamisk endre innhold, istendenfor ny html side

class Header extends Component{
    renderContent(){
        switch(this.props.auth){
            case null:  //ikke avklart om bruker logget inn eller ikke
                return null;
            case false: //ikke logget inn
                return (
                    <li><a class="waves-effect waves-light btn" href="/auth/google">Login with Google</a></li>
                );
            default:  //logget inn
                return <li><a class="waves-effect waves-light btn" href="/api/logout">Logout</a></li>;
        }
    }
    render(){
        return(
                <nav>
                    <div className="nav-wrapper">
                        <Link to =  {this.props.auth ? '/surveys' :'/'} //forenklet if, om bruker er logget inn eller ikke
                        
                        className = "center brand-logo">
                            MovieSelector
                        </Link>
                        <ul className ="right">
                            {this.renderContent()}
                        </ul>
                    </div>
                </nav>
        );
    }
}
function mapStateToProps({auth}){
    return {auth};
}

export default connect(mapStateToProps) (Header);