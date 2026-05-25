import { MongoClient, type Db } from 'mongodb'

const uri = process.env.MONGO_URI || 'mongodb://lestiam:36173253@uromongo:27017/mydatabase?authSource=admin'

let client: MongoClient
let defaultDb: Db
let maoDb: Db

export async function getDb(): Promise<Db> {
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
    defaultDb = client.db()
    maoDb = client.db('mao_db')
  }
  return defaultDb
}

export async function getMaoDb(): Promise<Db> {
  await getDb()
  return maoDb
}

export async function disconnect(): Promise<void> {
  if (client) {
    await client.close()
  }
}
