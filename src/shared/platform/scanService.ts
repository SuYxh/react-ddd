export interface ScanService {
  scan(): Promise<string>;
}

let scanImpl: ScanService = {
  scan: async () => {
    throw new Error('scanService not implemented for current platform');
  },
};

export const scanService = {
  scan: () => scanImpl.scan(),
  register(impl: ScanService) {
    scanImpl = impl;
  },
};
