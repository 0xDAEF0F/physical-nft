import { Nonce } from '../constants'

function generateNonce(): Nonce {
  return Math.floor(Math.random() * 10000000)
}

export { generateNonce }
