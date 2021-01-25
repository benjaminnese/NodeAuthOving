import React, {Component} from 'react';
import { Provider } from 'react-redux';

class Header extends Component{
    render(){
        return(
                <nav>
                    <div className="nav-wrapper">
                        <a className = "center brand-logo">
                            MovieSelector
                        </a>
                        <ul className ="right">
                            <li><a class="waves-effect waves-light btn">Login in with Google</a></li>
                        </ul>
                    </div>
                </nav>
        );
    }
}


export default Header;