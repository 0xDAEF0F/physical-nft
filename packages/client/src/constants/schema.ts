import { object, string, InferType } from 'yup'
import { utils } from 'ethers'
import { isUsernameAvailable } from '@/lib/firestore-helpers'
import { PublicAddress, USER_TAKEN } from '.'

export type User = InferType<typeof userSchema>

export const userSchema = object({
  publicAddress: string()
    .required('Required')
    .test('is valid address', 'invalid address', (d) =>
      utils.isAddress(d as PublicAddress)
    ),
  username: string()
    .min(5, 'Must be 5 characters or more')
    .max(16, 'Must be 16 characters or less')
    .default('')
    .required('Required')
    .strict(true)
    .test(
      'is username available',
      USER_TAKEN,
      async (usr) => await isUsernameAvailable(usr)
    ),
  email: string().optional().default('').email('Invalid email address'),
})
