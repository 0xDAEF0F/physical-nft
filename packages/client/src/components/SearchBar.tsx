import { MdSearch as SearchSvg } from 'react-icons/md'

type Props = {
  placeholder: string
  extraClass: string
}

export default function SearchBar({ placeholder, extraClass }: Props) {
  return (
    <div className={`flex w-full items-center  ${extraClass}`}>
      <div className='flex w-full justify-center items-center border rounded-lg'>
        <SearchSvg
          fontSize='25'
          className='justify-center fill-gray-500 ml-2'
        />
        <input
          type='text'
          className='w-full px-2 py-2 text-base text-gray-700 transition focus:text-gray-700 focus:bg-white focus:outline-none rounded-lg'
          placeholder={placeholder}
          aria-label='search'
        />
      </div>
    </div>
  )
}
