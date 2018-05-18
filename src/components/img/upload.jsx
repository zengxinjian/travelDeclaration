/*
/!**
 *
 *  Created by youli on 2017/12/20
 *
 *!/

import React, { PropTypes } from 'react';
import { UploadField } from '@navjobs/upload';
import { Flex, ImagePicker, List } from 'antd-mobile';
import { Image } from './img';
import { formDataHttp } from '../../utils/request';
import { uploadPaymentEvidence } from '../../utils/apiMap';
import { CustomIcon } from '../../components/icon/customIcon';
import lrz from 'lrz';

import * as styles from './upload.less';

class FileUpload extends React.Component {
  constructor(p) {
    super(p);
    const { uploadDescribe, imageDefaultSrc } = this.props;
    this.state = {
      imgSrc: imageDefaultSrc,
      text: uploadDescribe,
      isDefault: true,
      isUploading: false,
      isSetUploading: false,
      uploadText: '',
      files: []
    };
  }


  upload = (file) => {
    const oMyForm = new FormData();
    oMyForm.append('file', file);
    // 上传图片
    formDataHttp(uploadPaymentEvidence, oMyForm).then((res) => {
      this.uploadSuccess(res.Data);
    });
  }

  uploadSuccess = (response) => {
    const { ImgUrl } = response;
    const { success } = this.props;
    this.setState({
      files: [{ url: ImgUrl, id: 1, file: ImgUrl }],
      isDefault: false,
      isUploading: false,
      uploadText: ''
    });
    success(response);
  }


  onChange = (files, type, index) => {
    if (type === 'remove') {
      this.setState({
        files: [],
        isDefault: true
      });
      return;
    }

    if (type === 'add') {
      const file = files[files.length - 1].file;

      lrz(file, { quality: 0.1 })
                .then((rst) => {
                    // 处理成功会执行
                    // alert('压缩成功',rst.base64.split(',')[1]);
                  this.upload(rst.base64);
                });
    }
    // 上传
  };


  render() {
    const { text, imgSrc, isDefault, files } = this.state;
    return (
      <div>
        <List renderHeader={() => '上传付款凭证'} className="my-list" />
        <ImagePicker
          files={files}
          onChange={this.onChange}
          selectable={files.length < 2}

        />
      </div>
    );
  }
}

FileUpload.defaultProps = {
  uploadDescribe: '请选择要上传的文件',
  imageDefaultSrc: 'http://cibyungou-test.oss-cn-shenzhen.aliyuncs.com/a5b9f55a-6d9f-4946-9365-5e273f7b7ec0.jpg',
  imageSrc: '',
  uploadAPI: '/api/Order/UploadPaymentEvidence',
  param: {},
  success: () => {
  },
  fail: () => {
  }
};

// 定义类型
FileUpload.propTypes = {
  uploadDescribe: PropTypes.string,
  imageDefaultSrc: PropTypes.string,
  success: PropTypes.func,
  fail: PropTypes.func
};


export default {
  FileUpload
};
*/
