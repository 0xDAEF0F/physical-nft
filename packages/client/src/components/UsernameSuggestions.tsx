import { useFormikContext } from 'formik'
import { USER_TAKEN } from '../constants'
import { User } from '@/constants/schema'
import { useMemo } from 'react'
import { generateUsernameSuggestions } from '@/lib/firestore-helpers'

type Props = {
  children: string
}

export default function UsernameSuggestions({ children }: Props) {
  const formikCtx = useFormikContext<User>()
  const userNames = useMemo(() => generateUsernameSuggestions(), [])

  const usernameTakenHtml = (
    <div>
      <h1 className='text-red-600'>{USER_TAKEN}</h1>
      <div className='border-4 rounded-lg border-blue-900'>
        {userNames.map((usernameSug, i) => (
          <p className='m-1 mx-3' key={i}>
            {usernameSug}
          </p>
        ))}
      </div>
    </div>
  )

  if (formikCtx.errors.username === USER_TAKEN) {
    return usernameTakenHtml
  } else {
    return <p className='text-red-600'>{children}</p>
  }
}
