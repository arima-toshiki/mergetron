import {ipcRenderer} from 'electron';

import ICore, {CheckPathResult} from './ICore';

const openFileDialog = async (): Promise<string> => {
  return await ipcRenderer.invoke('openFileDialog');
};

const openDirDialog = async (): Promise<string> => {
  return await ipcRenderer.invoke('openDirDialog');
};

const loadFile = async (path: string): Promise<string> => {
  return await ipcRenderer.invoke('loadFile', path);
};

const checkPaths = async (pathA: string, pathB: string): Promise<CheckPathResult> => {
  console.log(`pathA = '${pathA}'; pathB = '${pathB}'`);
  return await ipcRenderer.invoke('checkPaths', pathA, pathB);
};

const core: ICore = {
  openFileDialog,
  openDirDialog,
  loadFile,
  checkPaths,
};

export default core;
