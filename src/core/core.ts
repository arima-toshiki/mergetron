import {ipcRenderer} from 'electron';

import ICore from './ICore';

const openFileDialog = async (): Promise<string | null> => {
  return await ipcRenderer.invoke('openFileDialog');
};

const openDirDialog = async (): Promise<string | null> => {
  return await ipcRenderer.invoke('openDirDialog');
};

const loadFile = async (path: string): Promise<string> => {
  return await ipcRenderer.invoke('loadFile', path);
};

const core: ICore = {
  openFileDialog,
  openDirDialog,
  loadFile,
};

export default core;
