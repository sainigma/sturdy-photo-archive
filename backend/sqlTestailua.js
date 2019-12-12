
const { Client } = require('pg')

const client = new Client({
  user: 'sturdy-photo-archive',
  host: '192.168.0.104',
  database: 'sturdy-photo-archive',
  password: 'salasana',
  port: 5432
})



const app = async() => {
  await client.connect()
  const res = await client.query('SELECT NOW()')
  console.log(res)
  await client.end()
}
app()