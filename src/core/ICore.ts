export type CheckPathResult = {
  canProceed: boolean;
  description: string;
};

export type LoadFileResult = {
  encode: Encoding.Encoding;
  content: string;
};

export default interface ICore {
  openFileDialog: () => Promise<string>;
  openDirDialog: () => Promise<string>;
  loadFile: (path: string) => Promise<LoadFileResult>;
  checkPaths: (pathA: string, pathB: string) => Promise<CheckPathResult>;
  // eslint-disable-next-line semi
}

declare global {
  interface Window {
    core: ICore;
  }
}
