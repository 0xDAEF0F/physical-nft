import Link from 'next/link'

type Props = {
  title: string
  to: string
  xClass?: string
}

export default function DivLink({ title, to, xClass }: Props) {
  return (
    <Link href={to}>
      <a
        className={`cursor-pointer hover:bg-blue-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium ${xClass}`}
      >
        {title}
      </a>
    </Link>
  )
}
