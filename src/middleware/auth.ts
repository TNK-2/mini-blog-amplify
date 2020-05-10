import { Middleware } from '@nuxt/types'
import { Auth } from 'aws-amplify'

const auth: Middleware = async (context) => {
  console.log('Middleware!!')
  const userInfo = await Auth.currentUserInfo()
  if (!userInfo) {
    return context.redirect('/signin')
  }
}

export default auth;