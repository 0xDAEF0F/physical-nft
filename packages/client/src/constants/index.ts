export type PublicAddress = string
export type Nonce = number

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
}

export { customMessages }
