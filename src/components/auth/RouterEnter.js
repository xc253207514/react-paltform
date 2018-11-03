/**
 * 
 */
/**
 *
 */
import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';

class RouterEnter extends Component {
    componentDidMount() {
        console.log('RouterEnter');
    }
    render() {
        return (
            <div>
                <BreadcrumbCustom first="权限管理" second="路由拦截" />
            </div>
        )
    }
}

export default RouterEnter;