//sjekk om bruker er eller ikke er logget inn
import {FETCH_USER} from '../actions/types';
export default function(state = null, action){ //state er default =undefined
    switch(action.type){
        case FETCH_USER:
            return action.payload || false;  //retuner enten bruker, så header endrer seg eller false som da viser google login
        default:
            return state;
    }
}