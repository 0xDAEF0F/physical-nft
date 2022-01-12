import { MdSearch as SearchSvg } from 'react-icons/md'

type Props = {
  placeholder: string
  extraClass: string
}

export default function SearchBar({ placeholder, extraClass }: Props) {
  return (
    <div className={`flex w-full items-center  ${extraClass}`}>
      <div className='flex w-full justify-center'>
        <input
          type='text'
          className='w-full px-2 py-2 text-base text-gray-700 transition focus:text-gray-700 focus:bg-white focus:outline-none border rounded-l-lg max-w-3xl'
          placeholder={placeholder}
          aria-label='search'
        />
        <button
          className='px-4 py-3 bg-blue-600 text-white uppercase shadow-md hover:bg-black hover:shadow-lg focus:outline-none active:shadow-lg transition duration-150 rounded-r-lg'
          type='button'
        >
          <SearchSvg fontSize='large' />
        </button>
      </div>
    </div>
  )
}
