

import $ from 'jquery';
import React, { Component } from 'react';
import { Table,Button,Modal,Card,Form,Input,Select,message,Upload, Icon} from 'antd';
// import PanelBox from '../PanelBox';
import './index.less';
import { get,put } from '../../axios/tools';

const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;
const CollectionCreateForm = Form.create()(
  class extends React.Component {
   
        state={
          itemarr:[],
          item:{},
          noticeData:{},
          fileList:[],
          previewVisible: false,
          previewImage: '',
          myState:{}
        }
    
   
   
    componentWillReceiveProps(nextProps){
     console.log(nextProps)
      let arr = []
      let obj = {
        uid: 1,
        name: "",
        status: "",
        url: nextProps.noticeData.podLogo,
      }
      arr.push(obj)

      //  setTimeout(() => {
        this.setState({
          fileList:arr,
          noticeData:nextProps.noticeData,
          item:nextProps.item
        })
        
      // }, 10);
     
      // console.log(nextProps)
      // 每次都会执行
        // console.log(this.props.noticeData)
        
        // console.log(this.state.noticeData)
        // if(this.state.noticeData!=this.props.noticeData){
        //   let arr = []
        //   let obj = {
        //     uid: 1,
        //     name: "",
        //     status: "",
        //     url: this.props.noticeData.podLogo,
        //   }
        //   arr.push(obj)
        //   this.setState({
        //     fileList:arr,
        //     noticeData:this.props.noticeData,
        //     item:this.props.item
        //   })
        // }
        // console.log(this.nextProps)

      
        
        // if(this.state.noticeData!=this.props.noticeData){
       
        // }
       


        
    }

    

    componentDidMount(){
      $.ajax({
        type: "get",
        url: "https://api-dev.idougua.cn/happiness/platform/Item/list?itemStatusFilter=" + "opening",
        async: false,
        success: (res)=> {
         this.setState({
           itemarr:res.data.content
         })
        }
      });
      // 只会执行一次
      // console.log(111)
      // setTimeout(() => {
      //   console.log(this.props.noticeData)
        
      // }, 10);
    
// this.setState({myState: this.props.noticeData}, function(){ console.log(this.state.myState) })
    

    }
    componentWillUpdate(){
      
    
        // console.log("will")
      // console.log("will")
    }

    // shouldComponentUpdate(){
    //   console.log("should")
    // }

    componentDidUpdate(){

     
      // console.log(this.props.noticeData)
      
      // console.log(777777)
    }

  

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          console.log('Received values of form: ', values);
          
        //   $.ajax({
        //     type: "get",
        //     url: baseUrl + url,
        //     async: false,
        //     success: function(data) {
        //        console.log(data);
                
        //     }
           
        // });
  
  
        }
      });
    }
    handleCancel = () => this.setState({ previewVisible: false })
    handleChange = ({ fileList }) => this.setState({ fileList })
  
    handleSelectChange = (value) => {
      console.log(value);
      // this.props.form.setFieldsValue({
      //   note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      // });
    }
    handlePreview = (file) => {
      console.log(file)
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      });
  
    }

   
  

    render() {

      // console.log(this.state.itemarr)

      const list = this.state.itemarr.map((item,i)=>{
        return(
          <Option value={item.id} >{item.name}</Option>
        )
      })
      // console.log(list)

      const formItemLayout = {
        labelCol:{ span: 5 },
         wrapperCol:{span: 12 }
      };
      const { previewVisible, previewImage, fileList,noticeData,item } = this.state;
      // console.log(fileList)
      // fileList.push(1)
      // console.log(fileList)
      const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit}>

           <FormItem {...formItemLayout} label="圈子logo" extra="图片尺寸200*200px,大小<=500kb,格式png、jpg">
       
           {getFieldDecorator('upload', {
              rules: [{ required: true, message: '请上传logo!' }],
            })(
              <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
              {/* <div>
                <img  src="https://happiness-images.oss-cn-shanghai.aliyuncs.com/5b903f85c4af4a68288b8a31774ae640.png" alt=""/>
        </div> */}
            </Upload>
            )}
             <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
              </FormItem>
  
              
              <FormItem {...formItemLayout} label="圈子名称">
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: '标题不能为空!' }],
                  initialValue:noticeData.podName
                })(
                  <Input  />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="绑定手机号">
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: '手机号不能为空!' }],
                  initialValue:noticeData.bindMobile
                })
                
                (
                  <Input  placeholder="多个手机号请用;分开" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="发奖理由">
                {getFieldDecorator('reason', {
                  rules: [{ required: true, message: '发奖理由不能为空!' }],
                  initialValue:noticeData.reason
                })(
                  <TextArea rows={4} />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="选择奖品">
  
    {getFieldDecorator('gender', {
              rules: [{ required: true, message: '请选择奖品' }],
              initialValue:item.name
            })(
              <Select
                placeholder="请选择奖品"
                onChange={this.handleSelectChange}
              >
                {list}
              </Select>
            )}
              
              </FormItem>
  
          <FormItem
            wrapperCol={{ span: 12, offset: 5 }}
          >
            <Button type="primary" htmlType="submit">
              修改
            </Button>
          </FormItem>
        </Form>
      );

    }
  }
);
// =====
// 新建modal
class App extends React.Component {
  
  state={
    fileList:[],
    previewVisible: false,
    previewImage: '',
  }

  componentWillMount(){
    console.log(3333)
  }

  componentDidMount(){
  //   let url = "notice/" + 10
  //   get(url).then((res)=>{
  //   console.log(res)

  //   let arr = []
  //   let obj = {
  //     uid: 1,
  //     name: "",
  //     status: "",
  //     url: res.data.podLogo,
  //   }
  //   arr.push(obj)
  //   this.setState({
  //     fileList:arr
  //   })

  // })

  }

  // 点击完成新建通知
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (!err) {
        console.log('Received values of form: ', values);
        
      //   $.ajax({
      //     type: "get",
      //     url: baseUrl + url,
      //     async: false,
      //     success: function(data) {
      //        console.log(data);
              
      //     }
         
      // });


      }
    });
  }
  handleCancel = () => this.setState({ previewVisible: false })
  handleChange = ({ fileList }) => this.setState({ fileList })

  handleSelectChange = (value) => {
    console.log(value);
    // this.props.form.setFieldsValue({
    //   note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    // });
  }
  handlePreview = (file) => {
    console.log(file)
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });

  }

  // normFile = (e) => {
  //   console.log('Upload event:', e);
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e && e.fileList;
  // }

  render() {
    const formItemLayout = {
      labelCol:{ span: 5 },
       wrapperCol:{span: 12 }
    };
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
    

         <FormItem {...formItemLayout} label="圈子logo" extra="图片尺寸200*200px,大小<=500kb,格式png、jpg">
     
         {getFieldDecorator('upload', {
            rules: [{ required: true, message: '请上传logo!' }],
          })(
            <Upload
            action="//jsonplaceholder.typicode.com/posts/"
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          )}
           <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
            </FormItem>

            
            <FormItem {...formItemLayout} label="圈子名称">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '标题不能为空!' }],
                
              })(
                <Input  />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="绑定手机号">
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '手机号不能为空!' }],
                
              })
              
              (
                <Input  placeholder="多个手机号请用;分开" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="发奖理由">
              {getFieldDecorator('reason', {
                rules: [{ required: true, message: '发奖理由不能为空!' }],
                
              })(
                <TextArea rows={4} />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="选择奖品">

  {getFieldDecorator('gender', {
            rules: [{ required: true, message: '请选择奖品' }],
            
          })(
            <Select
              placeholder="请选择奖品"
              onChange={this.handleSelectChange}
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>
          )}

            
            
            </FormItem>



     
        <FormItem
          wrapperCol={{ span: 12, offset: 5 }}
        >
          <Button type="primary" htmlType="submit">
            完成
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedApp = Form.create()(App);



const confirm = Modal.confirm;

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
          item:{},
          noticeData:{},
             data:[],
             loading: true,
             visible: false,
             addshow:false,
             ewmImage:"",
             ewmVisible:false
            };
      }
      componentDidMount(){
       this.getCloe()
      }
      getCloe = ()=>{
        let url = "notice/list?closed="+false
        get(url).then((res)=>{
            console.log(res)
            this.setState({
              data:res.data.content,
              loading:false
           })
        })
      }

      timeFormat = (timestamp) => {
      var time = new Date(timestamp);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      var date = time.getDate();
      return year + '/' + month + '/' + date;
      }

      showModal = (e,record) => {
          this.setState({
          visible: true,
          });
       

      // 编辑
          let url = "notice/" + record
          get(url).then((res)=>{
          console.log(res)
          this.setState({
            noticeData:res.data,
            item:res.data.item
          })
          })
      }

      handleCancel = (e) => {
      this.setState({
      visible: false,
      ewmVisible:false
      });

        
      }
      // handleCreate = () => {
      // const form = this.formRef.props.form;
      // form.validateFields((err, values) => {
      // if (err) {
      // return;
      // }

      // console.log('Received values of form: ', values);
      // form.resetFields();
      // this.setState({ visible: false });
      // });
      // }

      // saveFormRef = (formRef) => {
      // this.formRef = formRef;
      // }
    // 关闭

      handleClose = (e,record)=>{
        let that = this 
        confirm({
          title: '确认关闭?',
          okText: '确认',
          cancelText: '取消',
          onOk() {
          setTimeout(()=>{
          let url = "notice/status/" + record + "?" + "closed=" + true
          put(url,"已关闭").then((res)=>{
          if(res.errCode==0){
          let url = "notice/list?closed="+false
          get(url).then((res)=>{
            that.setState({
              data:res.data.content,
              loading:false
            })
          })
          }

          })

          },10)
          }
          
        });

        
      }
      // 生成二维码
      handleGenerate = (record,e)=>{
         console.log(record)
         this.setState({
          ewmVisible:true
         })
        var that = this
        var url = "https://api-dev.idougua.cn/happiness/mini/code?scene=" + record + "&page=" + "pages/forward/forward"
            var xhr = new XMLHttpRequest();  
            xhr.open('GET', url, true);                                                                        
            xhr.responseType = "blob";  
           
            xhr.onload = function () {  
                    var blob = this.response;  
                    var img = document.createElement("img");  
                    img.onload = function (e) {  
                        window.URL.revokeObjectURL(img.src);  
                    };  
                    img.src = window.URL.createObjectURL(blob);
        that.setState({
        ewmImage:window.URL.createObjectURL(blob)
        })  
            }  
            xhr.send();
      }

      // 新建
      add = ()=>{
    
        this.setState({  addshow: true });
      }
      // 关闭
      addclose = ()=>{
        this.setState({  addshow: false });
      }

   
    render() {
const {ewmImage,ewmVisible} = this.state
          
          const columns = [
          //   {
          //   title: 'ID',
          //   dataIndex: 'id',
          //   fixed: 'left',
          //   width:"10%"
          // }, 
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
            // fixed: 'right',
            dataIndex: 'id',
            width:"20%",
            render:(record)=>{
                return(
                    <div>
                      
                       
           
                       <Button onClick={(e) => this.showModal(e,record)} type="primary">编辑</Button>
                       <Button onClick={this.handleGenerate.bind(this,record)} type="primary">生成</Button>
                       <Button onClick={(e) => this.handleClose(e,record)} type="primary">关闭</Button>
                    </div>
                )
            }
          },
        ];


        return (
            <Card className="planbox" title="领取中" extra={
                <div>
                

                  <Modal
                  width={800}
                  title="发奖信息"
                  onCancel={this.addclose}
                  visible={this.state.addshow}
                  footer={null}
                  >
            <WrappedApp/>
                  </Modal>
                    <Button type='primary' onClick={this.add}>新建发奖</Button>
                </div>
            }>
                <Modal
                width={800}
                title="发奖信息"
                footer={null}
                onCancel={this.handleCancel}
              visible={this.state.visible}
              >
              <CollectionCreateForm
  item={this.state.item}
noticeData={this.state.noticeData}
                />
                </Modal>
                <Modal visible={ewmVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={ewmImage} />
                </Modal>
            <Table  rowKey="id"  scroll={{ x: '180%' }}  loading={this.state.loading} dataSource={this.state.data} columns={columns} />
            </Card>
        );
    }
}


export default Home;