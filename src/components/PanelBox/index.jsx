import React from 'react'
import { Card,Button } from 'antd';

import './index.less'

export default class PanelBox extends React.Component {
  constructor () {
    super()
  }

  render () {



    return (
      <Card className={"panel-box " + this.props.className} title={this.props.title} bordered={true} bodyStyle={this.props.bodyStyle} >
        {this.props.children}  extra={
                    <div>
                        <Button type='primary' >新增商品</Button>
                    </div>
                }
      </Card>
    )
  }
}
