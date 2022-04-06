import type{ NextApiRequest, NextApiResponse } from 'next'
import connectMongoDB from '../../middlewares/dbConnection'
import responseMessage from '../../@types/responseMessage'

const loginEndpoint = (
  req: NextApiRequest,
  res: NextApiResponse<responseMessage>
) => {
  if (req.method === 'POST') {
    const { login, senha } = req.body

    if(login === 'marcos@admin.com' && senha === 'marcos123') {
      return res.status(200).json({ message: 'Usuário autenticado com sucesso' })
    }
    
    return res.status(400).json({ error: 'Usuário e senha inválidos' })
  }

  return res.status(405).json({ error: 'Método informado não é válido' })
}

export default connectMongoDB(loginEndpoint)
