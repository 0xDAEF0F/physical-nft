import React from 'react'

import { auth } from 'lib/firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const provider = new GoogleAuthProvider()

export default function index() {
  function signIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return <div onClick={signIn}>sign in</div>
}
