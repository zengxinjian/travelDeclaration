/**
 *
 *  Created by youli on 2017/11/28
 *
 */
import { Modal, Toast } from 'antd-mobile';
import { getVersion } from './apiMap';
import { http } from './request';
import { systemError } from './dialog';
import { isAndroid } from './system.config';
import {
  fileOpener2,
  externalRootDirectory,
  permissions as permissionsFun,
  getVersionNumber,
  upgrade
} from './cordovaTool';

const androidUpdate = ({ version, apkUrl }) => {
  getVersionNumber().then((localVersion) => {
    if (version === localVersion) {
      return;
    }
    Modal.alert(
      '发现新版本，是否更新？',
      '',
      [
        { text: '取消' },
        {
          text: '确定',
          onPress: () => {
            const permissions = permissionsFun();
            const permissionName = permissions.WRITE_EXTERNAL_STORAGE;
            const loadFile = () => {
              const url = encodeURI(apkUrl);
              const targetPath = `${externalRootDirectory()}tuike.apk`;
              const ft = new window.FileTransfer();
              ft.onprogress = (progressEvent) => {
                setTimeout(() => {
                  if (!progressEvent.lengthComputable) {
                    return;
                  }

                  const { loaded, total } = progressEvent;
                  const downloadProgress = parseFloat(((loaded / total) * 100).toFixed(2));

                  // 需要优化
                  Toast.loading(`已经下载${downloadProgress}%`, 100);

                  if (downloadProgress > 99) {
                    Toast.hide();
                  }
                });
              };
              ft.download(
                url,
                targetPath,
                () => {
                  fileOpener2().open(
                    targetPath,
                    'application/vnd.android.package-archive'
                  ).then(
                    () => {
                    },
                    () => {
                    });
                },
                () => {
                  systemError('更新失败，请到网络好的地方下载');
                }
              );
            };

            permissions.hasPermission(permissionName, (status) => {
              if (status.hasPermission) {
                loadFile();
              } else {
                permissions.requestPermission(
                  permissionName,
                  () => {
                    loadFile();
                  },
                  () => {
                    systemError('更新失败');
                  });
              }
            });
          }
        }
      ]);
  });
};

const iosUpdate = ({ version, apkUrl }) => {
  getVersionNumber().then((localVersion) => {
    if (version === localVersion) {
      return;
    }
    upgrade.checkUpgrade(apkUrl);
  });
};

const updateApp = () => {
  http(getVersion).then((data) => {
    const { isUpdate, version, apkUrl } = data;
    /* const isUpdate = 1,
      version = '0.0.1',
      apkUrl = 'http://android.v1.wzycib.com/app/android.apk';*/

    if (!isUpdate) {
      return;
    }

    if (isAndroid) {
      androidUpdate({ isUpdate, version, apkUrl });
    } else {
      iosUpdate({ isUpdate, version, apkUrl });
    }
  });
};

export default {
  updateApp
};

