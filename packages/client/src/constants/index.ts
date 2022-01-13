export type PublicAddress = string
export type Nonce = number
export type SignedMessage = string
export type MessageForUserToSign = string

export type User = {
  publicAddress: PublicAddress
  nonce?: Nonce
  username?: string
  email?: string
}

const customMessages = {
  signNonceMessage:
    'Please sign the following nonce to verify ownership of address.\nnonce: ',
  metamaskNotInstalled: 'Please install Metamask extension.',
  signedMessageFailed: 'Was not able to sign message.',
  publicKeyRetrievalFailed:
    'Was not able to retrieve public address. Please try again.',
}

export { customMessages }
