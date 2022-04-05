import type{ NextApiRequest, NextApiResponse } from 'next'
import { connectMongoDB } from '../../middlewares/dbConnection'

const loginEndpoint = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const { login, senha } = req.body

    if(login === 'admin@admin.com' && senha === 'admin@123') {
      res.status(200).json({ mensagem: 'Usuário autenticado com sucesso' })
    }
    return res.status(400).json({ erro: 'Usuário e senha inválidos' })
  }
  return res.status(405).json({ erro: 'Método informado não é válido' })
}

export default connectMongoDB(loginEndpoint)