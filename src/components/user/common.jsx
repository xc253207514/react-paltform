import $ from 'jquery';
import React, { Component } from 'react';
import { Table,Button,Modal,Card,Form,Input,Select,message} from 'antd';
import { timeFormat } from '../../utils/index';
import './index.less';
import { get,put } from '../../axios/tools';

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

    //   getCloe = ()=>{
    //   let url = "notice/list?closed="+true
    //   get(url).then((res)=>{
    //     this.setState({
    //         data:res.data.content,
    //         loading:false
    //      })
    //   })
    // }


    // 列表
    userList = (url) =>{
        get(url).then((res)=>{
            console.log(res)
            for(let i=0;i<res.data.content.length;i++){
                if(res.data.content[i].address==null){
                   res.data.content[i].address = "未填写"
                }
            }
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
            let url = "user/list?forbidden="+false
            this.userList(url)
          }
          if(this.state.buttonShow==false){
            let closeurl = "user/list?forbidden="+true
            this.userList(closeurl)
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
        let url = "user/list?="+false
        + "&page="+ page  + "&size=" + pagination.pageSize
        this.userList(url)
        }
        if(this.state.buttonShow==false){
        let page = pagination.current-1
        let closeurl = "user/list?forbidden="+true
        + "&page="+ page  + "&size=" + pagination.pageSize
        this.userList(closeurl)
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
            let puturl = "user/"+ text + "?" + "forbidden=" + true
            put(puturl,"已屏蔽").then((res)=>{
            let url = "user/list?forbidden="+false
            that.userList(url)
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
            let puturl = "user/"+ text + "?" + "forbidden=" + false
            put(puturl,"已恢复").then((res)=>{
            let url = "user/list?forbidden="+true
            that.userList(url)
            })
            },10)
            },
            
          });
      }

  

    render() {
       
        const columns = [
            {
              title: '头像',
              dataIndex: 'headImg',
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
              title: '用户',
              dataIndex: 'nickname',
              width:100,
            },
            {
              title: '手机号',
              dataIndex: 'address.mobile',
              width:100,
             render:(text,record)=>{
                  if(text==undefined){
                    text = "未填写"
                  }
                return(
                    <div>
                        {text}
                    </div>
                )
            }
            },
            {
              title: '收件人',
              dataIndex: 'address.name',
              width:100,
              render:(text,record)=>{
                if(text==undefined){
                  text = "未填写"
                }
              return(
                  <div>
                      {text}
                  </div>
              )
               }
            },
            {
              title: '收货地址',
              dataIndex: 'address',
              width:100,
              render:(text,record)=>{
                return(
                    <div>
                        {text=="未填写"?"未填写":text.prov +  text.city + text.region + text.street}
                    </div>
                )
            }
            },
          
            {
              title: '注册时间',
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
            //   fixed: 'right',
              dataIndex: 'id',
              width:100,
              render:(text,record)=>{
                console.log(text)
                const closeButton = (
                    // (e) => this.handleclose(e,text)
                    
                    <Button onClick={(e) => this.handleclose(e,text)} type="primary">屏蔽</Button>
                )
                const openButtons = (
                    <Button onClick={(e) => this.handleopen(e,text)} type="primary">恢复</Button>
                )
                // console.log(text)
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
            <Card className="planbox" title={this.state.buttonShow==true?"普通用户":"屏蔽中"} >
            <Table onChange={this.handleTableChange} pagination={this.state.pagination}  rowKey="id"    loading={this.state.loading} dataSource={this.state.data} columns={columns} />
            </Card>
         
        );
    }
}

export default Common;