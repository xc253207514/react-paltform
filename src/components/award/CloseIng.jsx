
import React, { Component } from 'react';
import { Table,Button,Modal,Card,Form,Input,Select,message} from 'antd';
import './index.less';
import { get,put } from '../../axios/tools';




const confirm = Modal.confirm;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          // noticeData:{},
             data:[],
             loading: true,
             visible: false
            };
      }
      getCloe = ()=>{
      let url = "notice/list?closed="+true
      get(url).then((res)=>{
        this.setState({
            data:res.data.content,
            loading:false
         })
      })
    }



      componentDidMount(){
        this.getCloe()
      }

     

      timeFormat = (timestamp) => {
      var time = new Date(timestamp);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      var date = time.getDate();
      return year + '/' + month + '/' + date;
      }

      handleopen = (e,record)=>{
        let that = this
        confirm({
            title: '确认恢复?',
            okText: '确认',
           cancelText: '取消',
            onOk() {
              setTimeout(()=>{
                let url = "notice/status/" + record + "?" + "closed=" + false
                put(url,"已恢复").then((res)=>{
                if(res.errCode==0){
                  that.getCloe()
                }
                })
              },10) 
            },
          });
      }
  

    render() {
       
        const columns = [
            {
              title: '图片',
              dataIndex: 'podLogo',
              width:"10%",
              fixed: 'left',
              render:(record)=>{
                  return(
                      <div>
                          <img  className="img" src={record} alt=""/>
                      </div>
                  )
              }
            }, 
            {
              title: '圈子信息',
              dataIndex: 'podName',
              width:"10%",
            },
            {
              title: '奖品信息',
              dataIndex: 'item.name',
              width:"10%",
            },
            {
              title: '发奖理由',
              dataIndex: 'reason',
              width:"20%",
            },
            {
              title: '总数',
              dataIndex: 'item.totalStock',
              width:"10%",
            },
            {
              title: '已发',
              dataIndex: 'item.stock',
              width:"10%",
            },
            {
              title: '创建时间',
              dataIndex: 'createdDate',
              width:"10%",
              render:(record)=>{
                  return(
                      <div>
                          {this.timeFormat(record)}
                      </div>
                  )
              }
            },
            {
              title: '操作',
            //   fixed: 'right',
              dataIndex: 'id',
              width:"20%",
              render:(record)=>{
                // console.log(record)
                  return(
                      <div>
                        
                         <Button onClick={(e) => this.handleopen(e,record)} type="primary">恢复</Button>
                      </div>
                  )
              }
            },
          ];




        return (
            // scroll={{ x: '180%' }}
            <Card className="planbox" title="已关闭" >
            <Table  rowKey="id"   scroll={{ x: '150%' }}   loading={this.state.loading} dataSource={this.state.data} columns={columns} />
            </Card>
         
        );
    }
}


export default Home;