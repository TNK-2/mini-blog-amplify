import { Auth } from 'aws-amplify'

export default async ({ redirect }) => {
  const userInfo = false; //await Auth.currentUserInfo()
  if (!userInfo) {
    redirect('/signin')
  }
}