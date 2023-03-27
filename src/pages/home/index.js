import React, {Component} from 'react';
import HomeScreen from '../../../components/HomeScreen';
import LoginScreen from '../../../components/LoginScreen';


class index extends Component {
    render() {
        return (
            <div>
                <HomeScreen/>
            </div>
        );
    }
}
export function getServerSideProps(){
    return {props: {}}
}
export default index;