import {dialog} from 'electron';
import fs from 'fs';

import ICore from './ICore';

const openFileDialog = async (): Promise<string | null> => {
  const {canceled, filePaths} = await dialog.showOpenDialog({
    properties: ['openFile'],
    title: 'ファイルを開く',
  });
  if (canceled) {
    return null;
  }
  return filePaths[0];
};

const loadFile = async (path: string): Promise<string> => {
  return await fs.promises.readFile(path, {encoding: 'utf-8'});
};

const core: ICore = {
  openFileDialog,
  loadFile,
};

export default core;
