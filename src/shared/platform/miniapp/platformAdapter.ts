// platforms/miniapp/platformAdapter.ts
import { scanService } from '../scanService';
import { uploadService } from '../uploadService';
import { cameraService } from '../cameraService';

scanService.register({
  scan: async () => {
    return new Promise((resolve, reject) => {
      wx.scanCode({
        success: (res) => resolve(res.result),
        fail: reject,
      });
    });
  },
});

uploadService.register({
  upload: async (file) => {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: 'https://your.upload.api', // 替换成你自己的接口
        filePath: file.path,
        name: 'file',
        success: (res) => {
          const result = JSON.parse(res.data);
          resolve(result.url); // 假设接口返回了上传后的文件 URL
        },
        fail: reject,
      });
    });
  },
});

cameraService.register({
  takePhoto: async () => {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1,
        sourceType: ['camera'],
        success: (res) => {
          resolve(res.tempFilePaths[0]); // 返回图片路径
        },
        fail: reject,
      });
    });
  },
});
