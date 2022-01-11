export type PublicAddress = string
export type Nonce = number

export type User = {
  publicAddress: PublicAddress
  nonce?: Nonce
  username?: string
  email?: string
}
