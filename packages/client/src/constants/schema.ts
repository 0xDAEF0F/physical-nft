import { object, string, InferType } from 'yup'
import { utils } from 'ethers'
import { isUsernameAvailable } from '@/lib/firestore-helpers'
import { PublicAddress, Username, USER_TAKEN } from '.'
import { debounce } from 'lodash'

export type User = InferType<typeof userSchema>

async function isUserFreeWithCb(value: Username, cb: (cb: boolean) => void) {
  const res = await isUsernameAvailable(value)
  cb(res)
}

const debouncedIsUserAvailable = debounce(isUserFreeWithCb, 1000)

async function yupTestUserValidation(usr: Username): Promise<boolean> {
  if (!usr || usr.length < 6 || usr.length > 16) return false
  return new Promise((resolve) => debouncedIsUserAvailable(usr, resolve))
}

export const userSchema = object({
  publicAddress: string()
    .required('Required')
    .test('is valid address', 'invalid address', (d) =>
      utils.isAddress(d as PublicAddress)
    ),
  username: string()
    .required('Required')
    .default('')
    .min(6, 'Must be 6 characters or more')
    .max(16, 'Must be 16 characters or less')
    .test('is username available', USER_TAKEN, yupTestUserValidation),
  email: string().email('Invalid email address').optional().default(''),
})
