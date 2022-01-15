export type PublicAddress = string
export type Nonce = number
export type SignedMessage = string
export type MessageForUserToSign = string
export type Username = string

export type User = {
  publicAddress: PublicAddress
  username: Username
  email?: string
}

const customMessages = {
  SIGN_NONCE_MESSAGE:
    'Please sign the following nonce to verify ownership of address.\nnonce: ',
  METAMASK_NOT_INSTALLED: 'Please install Metamask extension.',
  SIGNED_MESSAGE_FAIL: 'Was not able to sign message.',
  PK_RETRIEVAL_FAILURE:
    'Was not able to retrieve public address. Please try again.',
  DUPLICATE_USER:
    'Was not able to create account because user is already registered.',
  CREATE_USER_SUCCESS: 'Congratulations! User has been created.',
  CREATE_USER_ERROR: 'Sorry, user creation failure. Try again.',
  FETCH_USER_DB_ERROR: 'User could not be retrieved from database.',
}

export const {
  DUPLICATE_USER,
  METAMASK_NOT_INSTALLED,
  PK_RETRIEVAL_FAILURE,
  SIGNED_MESSAGE_FAIL,
  SIGN_NONCE_MESSAGE,
  CREATE_USER_SUCCESS,
  FETCH_USER_DB_ERROR,
  CREATE_USER_ERROR,
} = customMessages
