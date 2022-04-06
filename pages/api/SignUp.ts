import type { NextApiHandler, NextApiRequest, NextApiResponse }  from 'next'
import responseMessage from '../../@types/responseMessage'
import signup from '../../@types/signup'

const signupEndpoint = (req: NextApiRequest, res: NextApiResponse<responseMessage>) => {
  if(req.method === 'POST') {
    const user = req.body as signup 

    if(!user.fullname || user.fullname.length < 2) {
      return res.status(400).json({ error: 'Nome inválido' })
    }

    if(!user.email ||
       user.email.length < 6 ||
      !user.email.includes('@') ||
      !user.email.includes('.')) {
      return res.status(400).json({ error: 'Email inválido' })
    }

    if(!user.password || user.password.length < 6) {
      return res.status(400).json({ error: 'Password inválido' })
    }

    return res.status(200).json({ message: 'Dados confirmados. Usuário Cadastrado'})
  }
  return res.status(405).json({ error: 'Método informado não é valido' })

}

export default signupEndpoint