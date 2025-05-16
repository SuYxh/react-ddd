// platforms/mobile/platformAdapter.ts
import { scanService } from '../scanService';
import { uploadService } from '../uploadService';
import { cameraService } from '../cameraService';

// ✅ 使用原生模块进行适配（你需要自行替换为实际原生模块）
import { NativeScanner, NativeUploader, NativeCamera } from 'your-native-modules';

scanService.register({
  scan: async () => {
    return await NativeScanner.scan(); // 返回二维码内容
  },
});

uploadService.register({
  upload: async (file) => {
    return await NativeUploader.upload(file); // 返回文件 URL
  },
});

cameraService.register({
  takePhoto: async () => {
    return await NativeCamera.takePhoto(); // 返回 base64 或 URL
  },
});
