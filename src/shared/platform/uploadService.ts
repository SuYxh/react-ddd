export interface UploadService {
  upload(file: File): Promise<string>; // 返回上传后 URL
}

let uploadImpl: UploadService = {
  upload: async () => {
    throw new Error('uploadService not implemented for current platform');
  },
};

export const uploadService = {
  upload: (file: File) => uploadImpl.upload(file),
  register(impl: UploadService) {
    uploadImpl = impl;
  },
};