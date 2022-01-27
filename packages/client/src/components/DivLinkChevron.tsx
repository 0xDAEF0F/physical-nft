import Link from 'next/link'
import { IoChevronForward } from 'react-icons/io5'

type Props = {
  title: string
  to: string
  xClass?: string
}

export default function DivLinkChevron({ title, to, xClass }: Props) {
  return (
    <Link href={to}>
      <a
        className={`cursor-pointer hover:text-black text-gray-500 py-2 rounded-md text-base font-medium flex justify-between ${xClass}`}
      >
        {title}
        <IoChevronForward size={20} />
      </a>
    </Link>
  )
}
