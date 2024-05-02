import fs from 'node:fs'
import { Adapter, Low, Memory } from 'lowdb'
import { JSONFile } from 'lowdb/node'

import { IDatabase, createDefaultData } from './schema'


export const TEST="test"
// const DIR_NAME = __dirname
const BASE_PATH = "./db"
const FILE_NAME = "db.json"
const webPath = BASE_PATH + "/production/" + FILE_NAME
const testPath = BASE_PATH + "/test/" + FILE_NAME
const isTest = process.env.NODE_ENV === 'test'

// if (webPath_INDEX === -1) {
// 	throw new Error('DB path not found')
// }

// const ROOT_INDEX = webPath_INDEX !== -1 ? webPath_INDEX : testPath_INDEX

// const basePath = DIR_NAME.slice(0, ROOT_INDEX)
const dbFilePath = isTest ? testPath : webPath;
const adapter: Adapter<IDatabase> = isTest ? new Memory<IDatabase>() : new JSONFile<IDatabase>(dbFilePath)
const db = new Low<IDatabase>(adapter, createDefaultData())
const dbFileExists = async () => {
	try {
	  await fs.promises.access(dbFilePath); // ファイルの存在を確認する
	  return true; // ファイルが存在する場合はtrueを返す
	} catch (error) {
	  return false; // エラーが発生した場合はファイルが存在しないとみなす
	}
};

const ensureDirExists = async (path: string) => {
	try {
	  await fs.promises.mkdir(path, { recursive: true }); // ディレクトリが存在しない場合は作成
	} catch (error: any) {
	  if (error.code !== 'EEXIST') {
		throw error; // 'EEXIST'以外のエラーの場合は例外を投げる
	  }
	}
  };


const resetDb = async () => {
  const newDb = new Low<IDatabase>(adapter, createDefaultData())
  await newDb.write()
}

// データベースファイルの存在確認と初期データの設定
const initializeDb = async () => {
	await ensureDirExists(dbFilePath.replace(FILE_NAME, ''));
	await db.read();
	db.data ||= createDefaultData();  // データが存在しない場合は初期データをセット
	await db.write();
}


// アプリケーションの起動時に一度だけデータベースを初期化
initializeDb().then(() => {
	console.log('Database is ready.');
});

export { adapter, db, resetDb, dbFileExists }