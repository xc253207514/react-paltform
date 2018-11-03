/**
 * 
 * http通用工具函数
 */
import axios from 'axios';
import $ from 'jquery';
import { message } from 'antd';

/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
const baseUrl = "https://api-dev.idougua.cn/happiness/platform/"

export const get = function (url) {
    var promise = new Promise(function (resolve, reject) {
        $.ajax({
            type: "get",
            url: baseUrl + url,
            async: false,
            success: function(data) {
                resolve(data);
                
            }
           
        });

    })
  
    return promise
  }


/**
 * 公用put请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */


     export const put = function (url,msg) {
        var promise = new Promise(function (resolve, reject) {
            $.ajax({
            type: "put",
            url: baseUrl + url,
            async: false,
            success: function(data) {
                if(data.errCode==0){
                    message.success(msg)
                }
                resolve(data);
                
            }

            });
        })

        return promise
        }




/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */

export const post = function (url,msg,data) {
var promise = new Promise(function (resolve, reject) {
        $.ajax({
        type: "post",
        url: baseUrl + url,
        async: false,
        contentType: "application/json",
        data:JSON.stringify(data),
        success: function(data) {
        if(data.errCode==0){
        message.success(msg)
        }else if(data.errCode=="44004"){
            message.error("系统异常")
        }
        resolve(data);

        }

        });
})

return promise
}












  
// axios
/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
// export const get = ({url, msg = '接口异常', headers}) =>
   
//     axios.get(baseUrl + url, headers).then(res => res.data).catch(err => {
//        console.log(err);
//        message.warn(msg);
//     });

// export const post = ({url, data, msg = '接口异常', headers}) =>
//     axios.post(url, data, headers).then(res => res.data).catch(err => {
//         console.log(err);
//         message.warn(msg);
//     });

// export const put = ({url, msg = '接口异常', headers}) =>

// axios.put(baseUrl + url, headers).then(res => res.data).catch(err => {
//    console.log(err);
//    message.warn(msg);
// });
