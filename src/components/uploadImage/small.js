/**
 * @title: 表单中上传图片的公用组件，只支持上传一张，且是“困”模式的上传
 * @author: 雏田
 * @version: 1.0.0
 * @time: 2018-08-17
 * @param {[string]}      [url]           [上传的api路径]
 * @param {[string]}      [name]          [form表单中的name]
 * @param {[string]}      [imageUrl]      [默认图片,常用于编辑]
 * @param {[function]}    [uploadImage]   [上传成功的回调函数，可不填]
  * 调用方法（含formItem的图片校验方法）：
  * <FormItem {...formItemLayout} label='广告图片' extra='推荐尺寸750*150'>
      {getFieldDecorator('pic', {
        rules: [{
          validator: (rule, value, callback)=>{
            let hasPic = this.state.hasPic;
            if(!hasPic){
              callback('请上传图片');
            }
            callback();
          },                   
        }],
      })(
        <UploadImage
          url='//jsonplaceholder.typicode.com/posts/'
          name='pic'
          imageUrl={defaultValues && defaultValues.pic || ''}
          uploadImage= {(imageUrl)=>{
            this.setState({
              hasPic: imageUrl
            }) 
          }}
        />                
      )}
    </FormItem>
 */
import React, { Fragment } from 'react';
import {
  message,
  Icon,
  Upload,
  Button,
  Modal,
  Alert
} from 'antd';
import {
  string,
  func,
} from 'prop-types';
import { is, fromJS } from 'immutable';



export default class TableDrawer extends React.Component {
  static propTypes = {
    url: string,
    handleUploadImg: func,
    imageUrl: string,
    name: string,
  };
  state = {
    previewVisible: false, // 是否显示大图
    previewImage: '', // 大图的地址
    fileList: [], // 显示的缩略图地址
    loading: false,
    picName: '',
    hasRemoved: false,
  };
  /**
   * [beforeUpload 判断上传图片]
   * @param  {[type]} file [description]
   * @return {[type]}      [description]
   */
  handleBeforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片太大超过2MB啦!');
    }
    return isLt2M && this.checkImageWH(file, 750, 160);
  }

  //checkImageWH  返回一个promise  检测通过返回resolve  失败返回reject阻止图片上传
  checkImageWH(file, width, height, func) {
    const {changeAlertStatus} = this.props;
    return new Promise(function (resolve, reject) {
        let filereader = new FileReader();
        filereader.onload = e => {
            let src = e.target.result;
            const image = new Image();
            if(changeAlertStatus){
              image.onload = function () {
                if (width && this.width != width) {
                  changeAlertStatus(true)
                  reject();
                } else if (height && this.height != height) {
                  changeAlertStatus(true)
                  reject();
                } else {
                  resolve();
                }
              };
            }else{
              resolve();
            }
          image.onerror = reject;
            image.src = src;
        };
        filereader.readAsDataURL(file);
    });
  }
  /**
   * [关闭缩略图]
   * @return {[type]} [description]
   */
  handleCancel = () => {
    console.log('cancel');
    this.setState({previewVisible: false,loading:false})
  }
  /**
   * [查看大图]
   * @param  {[type]} file [description]
   */
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  /**
   * [删除照片]
   */
  handleRemove= () => {
    console.log('aa');
    this.setState({
      fileList: [],
      hasRemoved: true,
      loading:false
    });
    this.props.handleUploadImg();
  }
  /**
   * [getDerivedStateFromProps 父组件传参数进来改变子组件]
   * @param  {[type]} nextProps [description]
   * @param  {[type]} prevState [description]
   * @return {[type]}           [description]
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);
    if(nextProps.imageUrl !== prevState.imageUrl || nextProps.imageUrl && !prevState.imageUrl && !prevState.hasRemoved) {
      let list=[{
        uid: -1,
        name: '',
        status: 'done',
        url: nextProps.imageUrl,
      }];
      // 这一步相当于执行this.setState({fileList: list})
      return {
        fileList: list
      };
    }
    return null;
  }
  /**
   * [shouldComponentUpdate 如果state值没有改变时就算调用了setState方法，页面也不会重新渲染]
   * @param  {[type]} nextProps [description]
   * @param  {[type]} nextState [description]
   * @return {[type]}           [description]
   */
  // shouldComponentUpdate(nextProps, nextState) {
  //   return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  // } 
  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    const {previewVisible, previewImage, fileList} = this.state;
    const {url}=this.props;
    const uploadButton = (
      <Button>
        <Icon type={this.state.loading ? 'loading' : 'upload'} />
        {this.state.loading ? '上传中...' : '上传图片'}
      </Button>
    );
    return (
      <div className="clearfix">
        <Upload
          action={url}
          listType='picture'
          accept='image/png,image/jpg,image/jpeg,image/bmp'
          fileList={fileList}
          withCredentials={true}
          beforeUpload={this.handleBeforeUpload}
          onSuccess={(res)=>{
            if (res.success) {
              let list=[{
                uid: -1,
                name: this.state.picName,
                status: 'done',
                url: res.data,
              }];
              this.setState({
                fileList: list,
              });
              this.props.handleUploadImg(res.data);
            } else {

              message.error(res.message);
            }
            this.setState({
              loading: false,
            });
          }}
          onPreview={this.handlePreview}
          onRemove={this.handleRemove}
          onChange={(info)=>{
            console.log(info);
            if(info.fileList.length>0){
              this.setState({
                loading: true,
                picName: info.file.name,
              });
            }

          }}
        >
         {uploadButton}
        </Upload>
        <Modal visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}>
          <img alt="example" style={{maxWidth: '100%'}} src={previewImage} />
        </Modal>
      </div>
    );
  }
}