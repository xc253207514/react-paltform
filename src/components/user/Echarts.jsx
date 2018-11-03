
import $ from 'jquery';
import React, { Component } from 'react';
import { Table,Button,Modal,Card,Form,Input,Select,message} from 'antd';
import Common from './common.jsx';


const confirm = Modal.confirm;
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonShow:true,

            };
      }


    render() {

        return (
        <Common buttonShow={this.state.buttonShow}  />
           
         
        );
    }
}


export default User;