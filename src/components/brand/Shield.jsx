/**
 * 
 */
import React, { Component } from 'react';
import { Table,Button,Modal,Card,Form,Input,Select,message} from 'antd';
import Common from './common.jsx';

class Shield extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonShow:false,
            };
      }
      
    render() {
     
        return (
        <Common buttonShow={this.state.buttonShow}  />
            
         
        );
    }
}


export default Shield;

