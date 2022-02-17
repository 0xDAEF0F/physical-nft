import { ButtonHTMLAttributes, ReactChild } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactChild
}

export default function Button({ children, ...props }: Props) {
  return (
    <button type='button' {...props}>
      {children}
    </button>
  )
}
