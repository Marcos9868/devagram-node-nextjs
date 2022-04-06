import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import mongoose from 'mongoose'
import responseMessage from '../@types/responseMessage'

const connectMongoDB = (handler: NextApiHandler) => 
  async (req: NextApiRequest, res: NextApiResponse<responseMessage>) => {
    // Verifica se o banco está conectado
    if(mongoose.connections[0].readyState) {
      return handler(req, res)
    }
    // Não estando conectado
    // Obter a variável de ambiente
    const { DB_CONNECTION_STRING } = process.env

    // Env vazio, avisa o programador
    if(!DB_CONNECTION_STRING) {
      return res.status(500).json({ error: 'Env de configuração do db não informado' })
    }

    mongoose.connection.on('Connected', () => {
      console.log('Banco de Dados Conectado')
    })

    mongoose.connection.on('Error', error  => {
      console.log(`Ocorreu erro ao conectar no banco de dados: ${error}`)
    })

    await mongoose.connect(DB_CONNECTION_STRING)
    
    // Conectado, retorna aos endpoints da aplicação
    return handler(req, res)
  }

export default connectMongoDB