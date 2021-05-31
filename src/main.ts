import {app, BrowserWindow, ipcMain, dialog} from 'electron';
import path from 'path';
import fs from 'fs';

import {CheckPathResult} from './core/ICore';

// セキュアな Electron の構成
// 参考: https://qiita.com/pochman/items/64b34e9827866664d436

const createWindow = (): void => {
  // レンダープロセスとなる、ウィンドウオブジェクトを作成する。
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      preload: path.join(__dirname, './core/preLoad.js'),
    },
  });

  // 読み込む index.html。
  // tsc でコンパイルするので、出力先の dist の相対パスで指定する。
  win.loadFile('./index.html');

  // 開発者ツールを起動する
  win.webContents.openDevTools();
};

// Electronの起動準備が終わったら、ウィンドウを作成する。
app.whenReady().then(createWindow);

// すべての ウィンドウ が閉じたときの処理
app.on('window-all-closed', () => {
  // macOS 以外では、メインプロセスを停止する
  // macOS では、ウインドウが閉じてもメインプロセスは停止せず
  // ドックから再度ウインドウが表示されるようにする。
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // macOS では、ウインドウが閉じてもメインプロセスは停止せず
  // ドックから再度ウインドウが表示されるようにする。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// ----------
// IPC通信
// ----------
ipcMain.handle('openFileDialog', async (event, data) => {
  const {canceled, filePaths} = await dialog.showOpenDialog({
    properties: ['openFile'],
    title: 'ファイルを開く',
  });
  if (canceled) {
    return '';
  }
  return filePaths[0];
});

ipcMain.handle('openDirDialog', async (event, data) => {
  const {canceled, filePaths} = await dialog.showOpenDialog({
    properties: ['openDirectory'],
    title: 'フォルダを開く',
  });
  if (canceled) {
    return '';
  }
  return filePaths[0];
});

ipcMain.handle('loadFile', async (event, data) => {
  return await fs.promises.readFile(data, {encoding: 'utf-8'});
});

ipcMain.handle(
    'checkPaths',
    // eslint-disable-next-line complexity
    async (event, pathA: string, pathB: string): Promise<CheckPathResult> => {
      console.log('start checkPaths()');
      try {
        if (!pathA || !pathB) {
          return {canProceed: false, description: ''};
        }

        if (pathA == pathB) {
          return {canProceed: false, description: '同じファイル又はディレクトリを比較しても意味がありません。'};
        }

        let description = '';
        let isDirA = null;
        let isFileA = null;
        try {
          const pathAStat = await fs.promises.stat(pathA);
          isDirA = pathAStat.isDirectory();
          isFileA = pathAStat.isFile();
        } catch (e) {
          if (e.code === 'ENOENT') {
            description += '第１のパスは存在しません。';
          } else {
            throw e;
          }
        }

        let isDirB = null;
        let isFileB = null;
        try {
          const pathBStat = await fs.promises.stat(pathB);
          isDirB = pathBStat.isDirectory();
          isFileB = pathBStat.isFile();
        } catch (e) {
          if (e.code === 'ENOENT') {
            description += '第２のパスは存在しません。';
          } else {
            throw e;
          }
        }

        if (description !== '') {
          return {canProceed: false, description};
        }

        if ((isDirA && isDirB) || (isFileA && isFileB)) {
          return {canProceed: true, description: ''};
        } else {
          return {canProceed: false, description: 'ファイルとディレクトリを比較することはできません。'};
        }
      } catch (e) {
        return {canProceed: false, description: e.message};
      } finally {
        console.log('end checkPaths()');
      }
    },
);
