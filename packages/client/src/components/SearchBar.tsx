import { MdSearch as SearchSvg } from 'react-icons/md'

type Props = {
  placeholder: string
  extraClass: string
}

export default function SearchBar({ placeholder, extraClass }: Props) {
  return (
    <div className={`flex items-center ${extraClass}`}>
      <input
        type='text'
        className='form-control px-2 py-2 text-base text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition focus:text-gray-700 focus:bg-white focus:outline-none rounded-lg'
        placeholder={placeholder}
        aria-label='search'
      />
      <button
        className='btn px-4 py-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-black hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-600 active:shadow-lg transition duration-150 items-center rounded-lg'
        type='button'
      >
        <SearchSvg fontSize='large' />
      </button>
    </div>
  )
}
