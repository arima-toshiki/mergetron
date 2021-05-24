export default interface ICore {
  openFileDialog: () => Promise<string | null>;
  loadFile: (path: string) => Promise<string>;
  // eslint-disable-next-line semi
}

declare global {
  interface Window {
    core: ICore;
  }
}
