import Link from 'next/link'

type Props = {
  title: string
  to: string
  xClass?: string
}

export default function DivLink({ title, to, xClass }: Props) {
  return (
    <Link href={to}>
      <a className={`cursor-pointer block text-base ${xClass}`}>{title}</a>
    </Link>
  )
}
