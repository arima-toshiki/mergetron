export type CheckPathResult = {
  canProceed: boolean;
  description: string;
};

export default interface ICore {
  openFileDialog: () => Promise<string | null>;
  openDirDialog: () => Promise<string | null>;
  loadFile: (path: string) => Promise<string>;
  checkPaths: (pathA: string, pathB: string) => Promise<CheckPathResult>;
  // eslint-disable-next-line semi
}

declare global {
  interface Window {
    core: ICore;
  }
}
