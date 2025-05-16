type PlatformImpl<T> = T | null;

export function createPlatformService<T extends object>(name: string) {
  let impl: PlatformImpl<T> = null;

  return {
    register: (implementation: T) => {
      impl = implementation;
    },
    getImpl: (): T => {
      if (!impl) throw new Error(`[${name}] not registered for current platform`);
      return impl;
    },
  };
}
