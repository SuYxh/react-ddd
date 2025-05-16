export interface CameraService {
  takePhoto(): Promise<Blob>;
}

let cameraImpl: CameraService = {
  takePhoto: async () => {
    throw new Error('cameraService not implemented for current platform');
  },
};

export const cameraService = {
  takePhoto: () => cameraImpl.takePhoto(),
  register(impl: CameraService) {
    cameraImpl = impl;
  },
};