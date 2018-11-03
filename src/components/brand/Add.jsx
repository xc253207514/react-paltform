// 新建modal
import $ from "jquery";
import React, { Component } from 'react';
import { Table,Button,Modal,Card,Form,Input,Select,Upload, Icon} from 'antd';
import './index.less';
import { get,put,post } from '../../axios/tools';
import Editor from 'wangeditor';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


        
        const { TextArea } = Input;
        const FormItem = Form.Item;
        class App extends React.Component {
            constructor(props) {
            super(props);
            this.state={
            fileList: [],
            previewVisible: false,
            previewImage: '',
            editorHtml: '',
            editorText: '',
            id:"",//品牌id
            data:{}
            }
            }


        static contextTypes = {
        router: PropTypes.object.isRequired
        };

        componentWillReceiveProps(nextProps){
        //     console.log(nextProps)
        //     let self = this;
        //     setTimeout(function(){  
        //       self.setState({
        //           id: self.state.id==""?nextProps.id:self.state.id,
        //       })
        // console.log(self.state.id)
        // let url = "customer/" + self.state.id
        // get(url).then((res)=>{
        //       console.log(res.data)
        //       console.log(res.data.description)
        //       self.setState({
        //           data:res.data,
        //           editorHtml:res.data.description
        //       })
    
          
                 
        //     })

        //     },10)
        
        }

//         const {fileData}=this.state;
// const formData=new formData();
 
// fileData.forEach((file)=>{
//     formData.append('files',file);
// })

      

        componentWillMount(){
        console.log(3333)
        }

        componentDidMount(){
            
      


        var editor = new Editor(ReactDOM.findDOMNode(this._div));
        editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'image',
        'undo',

        ]
        editor.customConfig.uploadImgServer = "https://api-dev.idougua.cn/happiness/image"
        editor.customConfig.uploadFileName = 'media'
        // editor.customConfig.customUploadImg = function (files, insert) {
        //     console.log(files[0])
        //     // files[0].name
        //     console.log(document.getElementById("form"))
        //     var formData = new FormData(document.getElementById("form"));
        //     formData.append('media', files[0].name);
        //     $.ajax({
        //         url: "https://api-dev.idougua.cn/happiness/image",
        //         type: 'POST',
        //         data: formData,
        //         cache: false,
        //         processData: false,
        //         contentType: false,
        //         success:function(data){
        //             console.log(data)
        //         }
        //     })

        //     // files 是 input 中选中的文件列表
        //     // insert 是获取图片 url 后，插入到编辑器的方法

        //     // 上传代码返回结果之后，将图片插入到编辑器中
        //     // insert(url)
        // }
        editor.customConfig.uploadImgHooks = {
        customInsert: function(insertImg, result, editor) {
        var url = "https://happiness-images.oss-cn-shanghai.aliyuncs.com/" + result.data
        insertImg(url)
        }
        }
        editor.customConfig.onchange = (html) => {
        this.setState({
        editorHtml: html,
        editorText: editor.txt.text()
        })
        
        //将html值设为form表单的desc属性值
        this.props.form.setFieldsValue({
          'desc': html
        });
        }

        editor.create();
        }
         //自定义表单验证规则
        // validateEditorFrom = (rule, value, callback) => {
        // //此处根据富文本框的text值进行验证，但注意富文本框中输入空格，使用‘&nbsp‘表示，此方法不能处理只输入空格的验证。
        // if (this.state.editorHtml.trim() === '') {
        // callback('不能为空');
        // }
        // // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
        // callback();
        // }


        // 点击完成新建
        handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        console.log(values)
        // console.log(values.upload.file.thumbUrl)
        if (!err) {
        console.log('Received values of form: ', values);

        // let url = "customer"
        // let data={
        // "description":values.desc,
        // "logo":"",
        // "name": values.title,
        // "itemNum":values.num
        // }
        // post(url,"提交成功",data).then((res)=>{
        // if(res.errCode==0){
        // this.context.router.history.push("/app/brand/online");
        // }
        // })


        }
        });
        }

        handleCancel = () => this.setState({ previewVisible: false })
        // 图片上传change变化
        // handleChange = ({fileList}) => {
        //     // console.log(file)
        //     // var formData = new FormData();
        //     //     formData.append('media', file.name);
        //     //     $.ajax({
        //     //         url: "https://api-dev.idougua.cn/happiness/image",
        //     //         type: 'POST',
        //     //         data: formData,
        //     //         cache: false,
        //     //         processData: false,
        //     //         contentType: false,
        //     //         success:function(data){
        //     //             console.log(data)
        //     //         }
        //     //     })
        //     // console.log(fileList)
        //     this.setState({ fileList })
        // }

        // change变化
        // handleSelectChange = (value) => {
        // console.log(value);
        // // this.props.form.setFieldsValue({
        // //   note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        // // });
        // }

        handlePreview = (file) => {
        console.log(file)
        this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
        });

        }
       
        getPdfURL = () =>{
            const _this = this;
            const props = {
                name: 'media',
                action: "https://api-dev.idougua.cn/happiness/image",
                listType:"picture-card",              
                onChange(info) {
                    console.log(info)
                    let fileList = info.fileList;

                    fileList = fileList.map((file) => {
                        console.log(file)
                        if (file.response) {
                            console.log(file.response.data)
                          file.url = "https://happiness-images.oss-cn-shanghai.aliyuncs.com/" + file.response.data;
                        }
                        return file;
                      });

                      _this.setState({ fileList });

                      console.log(_this.state.fileList)

                      


                    // if (info.file.status !== 'uploading') {
                    //     // console.log(info.file, info.fileList);
                    // }
                    // if (info.file.status === 'done') {
                    //     console.log(info.file)
                    //     // message.success(`${info.file.name} 上传成功！`);
                    //     // _this.setState({
                    //     //     pdfUrl:AjaxUrl + info.file.response.url,
                    //     //     wordName:info.file.response.wordName
                    //     // })
     
                    // } else if (info.file.status === 'error') {
                    //     // message.error(`${info.file.name} 上传失败！`);
                    // }
                },
                defaultFileList:[..._this.state.fileList],
                
              
            };
           
            return props;
        }
 




        render() {
            
            
        const formItemLayout = {
        labelCol:{ span: 5 },
        wrapperCol:{span: 18 }
        };
        const { previewVisible, previewImage, fileList,data } = this.state;
        
        const uploadButton = (
        <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
        </div>
        );
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} id="form" >
            <FormItem {...formItemLayout} label="标题">
            {getFieldDecorator('title', {
            rules: [{ required: true, message: '标题不能为空!' }],
            })(
            <Input  />
            )}
            </FormItem>

            <FormItem {...formItemLayout} label="品牌logo" extra="图片尺寸200*200px,大小<=500kb,格式png、jpg">

            {getFieldDecorator('upload', {
            rules: [{ required: true, message: '请上传logo!' }],
            })(
            <Upload
            {...this.getPdfURL()}
            // fileList={fileList}
            onPreview={this.handlePreview}
            // onChange={this.handleChange}
            >
            {/* {fileList.length >= 1 ? null : uploadButton} */}
            {uploadButton}
            </Upload>
            )}
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
            </FormItem>
            <FormItem {...formItemLayout} label="品牌简介">
            {getFieldDecorator('desc', {
            rules: [{ required: true, message: '描述不能为空!' }],
            
            })(
                <div ref={(ref) => this._div = ref}></div>
            )}
            </FormItem>


            <FormItem {...formItemLayout} label="累计赞助">
            {getFieldDecorator('num', {
            rules: [{ required: true, message: '数量不能为空!' }],
            })

            (
            <Input />
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
    
        class Add extends Component {
            constructor(props) {
                super(props);
                this.state={
                    id:""
                  }
                }
                componentDidMount(){
                    console.log(this.props.location.query)
                    if(this.props.location.query){
                    this.setState({
                        id:this.props.location.query.foo
                    })
                    }
               
                }

        render() {
        return (
        <Card className="planbox" title="新建品牌">
        <WrappedApp
         id={this.state.id}
        />
        </Card>
        )
        }
        }

        export default Add;
