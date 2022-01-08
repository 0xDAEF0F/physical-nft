import { useAppSelector } from '../app/hooks'
import { selectTheme } from 'src/features/theme/themeSlice'
import { ReactChild } from 'react'

type Props = {
  link?: string
  children?: ReactChild
}

export default function Button({ link, children }: Props) {
  const theme = useAppSelector(selectTheme)

  const colorScheme = {
    font: theme === 'light' ? '' : '',
    background: theme === 'light' ? '' : '',
    outline: theme === 'light' ? '' : '',
  }

  return <button className='rounded-full'>{children}</button>
}
