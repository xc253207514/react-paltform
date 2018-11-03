import React, { Component } from 'react';
import { Table,Button,Modal,Card} from 'antd';
import { timeFormat } from '../../utils/index';
import './index.less';
import { get,put } from '../../axios/tools';
import { Link } from 'react-router-dom';

const confirm = Modal.confirm;
class Common extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonShow:this.props.buttonShow,
            address:"",
            closeData:[],
             data:[],
             loading: true,
             visible: false,
             pagination: {},
            };
      }


    // 列表
    customerList = (url) =>{
        get(url).then((res)=>{
            console.log(res)
            const pagination = { ...this.state.pagination };
            pagination.total = res.data.totalElements;
            this.setState({
                data:res.data.content,
                loading:false,
                pagination,
            })
        })
    }



      componentDidMount(){
          if(this.state.buttonShow==true){
            let url = "customer/list?forbidden=" + false
            this.customerList(url)
          }
          if(this.state.buttonShow==false){
            let closeurl = "customer/list?forbidden="+true
            this.customerList(closeurl)
          }
      
      }
        //   分页
        handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
        pagination: pager,
        });
        if(this.state.buttonShow==true){
        let page = pagination.current-1
        let url = "customer/list?forbidden=" + false
        + "&page="+ page  + "&size=" + pagination.pageSize
        this.customerList(url)
        }
        if(this.state.buttonShow==false){
        let page = pagination.current-1
        let closeurl = "customer/list?forbidden="+true
        + "&page="+ page  + "&size=" + pagination.pageSize
        this.customerList(closeurl)
        }
        }

// 关闭
      handleclose = (e,text)=>{
          let that = this 
        confirm({
            title: '确认屏蔽?',
            okText: '确认',
            cancelText: '取消',
            onOk(){
            setTimeout(()=>{
            let puturl = "customer/"+ text + "?" + "forbidden=" + true
            put(puturl,"已屏蔽").then((res)=>{
            let url = "customer/list?forbidden="+false
            that.customerList(url)
            })
            },10)
            },
           
          });
      }

    //   恢复
      handleopen = (e,text)=>{
          let that =this
        confirm({
            title: '确认恢复?',
            okText: '确认',
            cancelText: '取消',
            onOk() {
            setTimeout(()=>{
            let puturl = "customer/"+ text + "?" + "forbidden=" + false
            put(puturl,"已恢复").then((res)=>{
            let url = "customer/list?forbidden="+true
            that.customerList(url)
            })
            },10)
            },
            
          });
      }

    // 编辑品牌
    handleUpdate = (e,text)=>{
       console.log(text)
    }

  

    render() {
       
        const columns = [
                {
                title: 'LOGO',
                dataIndex: 'logo',
                width:100,
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
                title: '品牌信息',
                dataIndex: 'name',
                width:100,
                },
                {
                title: '累计赞助',
                dataIndex: 'itemNum',
                width:100,
                },
                {
                title: '上线时间',
                dataIndex: 'createdDate',
                width:100,
                render:(record)=>{
                return(
                <div>
                {timeFormat(record)}
                </div>
                )
                }
                },
                {
                title: '操作',
                dataIndex: 'id',
                width:100,
                render:(text,record)=>{
                // console.log(text)
                const closeButton = (
                // (e) => this.handleclose(e,text)
                <div>
                <Button onClick={(e) => this.handleUpdate(e,text)} type="primary"><Link to={{pathname:"/app/brand/add", query:{foo: text} }}>编辑</Link></Button>
                <Button onClick={(e) => this.handleclose(e,text)} type="primary">屏蔽</Button>
                </div>          
                )
                const openButtons = (
                <div>
                <Button onClick={(e) => this.handleUpdate(e,text)} type="primary">编辑</Button>
                <Button onClick={(e) => this.handleopen(e,text)} type="primary">恢复</Button>
                </div>
                )
                return(
                <div>
                {this.state.buttonShow==true?closeButton:openButtons}
                </div>
                )
                }
                },
          ];




        return (
            // scroll={{ x: '180%' }}
            <Card className="planbox" title={this.state.buttonShow==true?"上线品牌":"已屏蔽"} >
            <Table onChange={this.handleTableChange} pagination={this.state.pagination}  rowKey="id"    loading={this.state.loading} dataSource={this.state.data} columns={columns} />
            </Card>
         
        );
    }
}

export default Common;