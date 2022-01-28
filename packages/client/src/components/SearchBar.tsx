import { MdSearch as SearchSvg } from 'react-icons/md'

type Props = {
  placeholder: string
  extraClass: string
}

export default function SearchBar({ placeholder, extraClass }: Props) {
  return (
    <div
      className={`flex w-full items-center border rounded-full ${extraClass}`}
    >
      <SearchSvg fontSize='25' className='fill-gray-500 ml-2' />
      <input
        type='text'
        className='w-full px-2 py-2 text-base text-gray-700 transition focus:text-gray-700 focus:bg-white focus:outline-none rounded-full'
        placeholder={placeholder}
        aria-label='search'
      />
    </div>
  )
}
