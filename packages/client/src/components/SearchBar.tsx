import { MdSearch as SearchSvg } from 'react-icons/md'

type Props = {
  placeholder: string
  extraClass: string
}

export default function SearchBar({ placeholder, extraClass }: Props) {
  return (
    <div className={`items-center ${extraClass}`}>
      <div className='flex'>
        <input
          type='text'
          className='px-2 py-2 text-base text-gray-700 transition focus:text-gray-700 focus:bg-white focus:outline-none border rounded-l-lg'
          placeholder={placeholder}
          aria-label='search'
        />
        <button
          className='btn px-4 py-3 bg-blue-600 text-white uppercase shadow-md hover:bg-black hover:shadow-lg focus:outline-none active:shadow-lg transition duration-150 rounded-r-lg'
          type='button'
        >
          <SearchSvg fontSize='large' />
        </button>
      </div>
    </div>
  )
}
