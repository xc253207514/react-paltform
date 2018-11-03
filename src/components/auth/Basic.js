/**
 * 
 */
import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import beauty from '@/style/imgs/beauty.jpg';

class Basic extends Component {
    render() {
        return (
            <div>
                <BreadcrumbCustom first="权限管理" second="基础演示" />
                
            </div>

        )
    }
}

export default Basic;