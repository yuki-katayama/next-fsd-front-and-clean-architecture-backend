"use server"

import fs from 'node:fs'

import { Adapter, Low, Memory } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { IDatabase, createDefaultData } from './schema';

const BASE_PATH = "./db";
const FILE_NAME = "db.json";
const webPath = BASE_PATH + "/production/" + FILE_NAME;
const testPath = BASE_PATH + "/test/" + FILE_NAME;
const isTest = process.env.NODE_ENV === 'test';

const dbFilePath = isTest ? testPath : webPath;
const adapter: Adapter<IDatabase> = isTest ? new Memory<IDatabase>() : new JSONFile<IDatabase>(dbFilePath);

// データベースのコネクションを初期化して返す関数
export const getDbClient = async (): Promise<Low<IDatabase>> => {
    const db = new Low<IDatabase>(adapter, createDefaultData());
    await db.read();
    db.data ||= createDefaultData();  // データが存在しない場合は初期データをセット
    await db.write();
    console.log('Database initialized and ready.');
    return db;
}
export const ensureDirExists = async (path: string) => {
  try {
    await fs.promises.mkdir(path, { recursive: true });
  } catch (error: any) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

export const resetDb = async () => {
  const newDb = new Low<IDatabase>(adapter, createDefaultData());
  await newDb.write();
}

export const initializeDb = async (db: Low<IDatabase>) => {
  await ensureDirExists(dbFilePath.replace(FILE_NAME, ''));
  await db.read();
  db.data ||= createDefaultData();
  await db.write();
  console.log('Database is ready.');
}

export const dbFileExists = async () => {
  try {
    await fs.promises.access(dbFilePath);
    return true;
  } catch (error) {
    return false;
  }
}
