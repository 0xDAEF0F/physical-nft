import { createUser, fetchUser } from '@/lib/firestore-helpers'
import { useState } from 'react'
import { dummyData } from 'src/mocks'
import { User } from '../constants'

export default function CreateAccount() {
  const [userObj, setUserObj] = useState({})

  async function makeUser() {
    createUser(dummyData[0])
  }

  async function getUser() {
    const queryUser = await fetchUser(
      '0x8aC6Bd37D93f09cA5d1f0fc27ED4c0c72612f86c'
    )
    console.log(queryUser)
    // queryUser && setUserObj()
  }

  return (
    <div>
      <button onClick={makeUser}>Create Account</button>
      <button onClick={getUser}>Get Account</button>
    </div>
  )
}
