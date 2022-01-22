export type PublicAddress = string
export type Nonce = number
export type SignedMessage = string
export type MessageForUserToSign = string
export type Username = string

const customMessages = {
  CREATE_USER_SUCCESS: 'Congratulations! User has been created.',
  SIGN_NONCE_MESSAGE:
    'Please sign the following nonce to verify ownership of address.\nnonce: ',
  CACC_TO_LOGIN: 'Please create an account to login.',
  USER_TAKEN: 'Username is already taken.',
  SIGNED_NONCE_INVALID: 'Signed message does not correspond to public address.',
  REQUEST_METHOD_ERR: 'Requested endpoint does not support said method.',
  SIGNED_MESSAGE_FAIL: 'Was not able to sign message.',
  DUPLICATE_USER:
    'Was not able to create account because user is already registered.',
  METAMASK_NOT_INSTALLED: 'Please install Metamask extension.',
  PK_RETRIEVAL_FAILURE:
    'Was not able to retrieve public address. Please try again.',
  CREDENTIALS_MISSING: 'Provided credentials are incomplete please try again.',
  INVALID_PK: 'Provided address is invalid, please try again.',
  USER_DOES_NOT_EXIST: 'Provided address does not exist within our users.',
  CREATE_USER_ERROR: 'Sorry, user creation failure. Try again.',
  FETCH_USER_DB_ERROR: 'User could not be retrieved from database.',
  USER_UPDATE_ERROR: 'User could not be updated, plase try again.',
  AUTH_ERROR: 'Authentication failed, please try again.',
} as const

export const {
  DUPLICATE_USER,
  REQUEST_METHOD_ERR,
  METAMASK_NOT_INSTALLED,
  PK_RETRIEVAL_FAILURE,
  CREDENTIALS_MISSING,
  SIGNED_MESSAGE_FAIL,
  SIGN_NONCE_MESSAGE,
  CREATE_USER_SUCCESS,
  FETCH_USER_DB_ERROR,
  CREATE_USER_ERROR,
  USER_TAKEN,
  INVALID_PK,
  CACC_TO_LOGIN,
  USER_DOES_NOT_EXIST,
  USER_UPDATE_ERROR,
  SIGNED_NONCE_INVALID,
  AUTH_ERROR,
} = customMessages
