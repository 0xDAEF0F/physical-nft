import { useState } from 'react'
import { Tab } from '@headlessui/react'
import NftGroup from './NftGroup'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function Owned() {
  return (
    <div>
      <NftGroup />
    </div>
  )
}

function Favorited() {
  return (
    <div>
      <NftGroup />
    </div>
  )
}

function Activity() {
  return <div>3</div>
}

export default function Tabs() {
  let [categories] = useState({
    Owned: Owned(),
    Favorited: Favorited(),
    Activity: Activity(),
  })

  return (
    <div>
      <Tab.Group>
        <div className='flex justify-center px-5 pb-3'>
          <Tab.List className='w-full sm:w-7/12 flex p-1 space-x-1 bg-gray-200 rounded-xl'>
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    'w-full py-2.5 text-sm leading-5 font-medium rounded-lg',
                    'focus:outline-none ',
                    selected
                      ? 'text-black bg-white shadow'
                      : 'text-gray-500 hover:bg-white/[0.12] hover:text-black'
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
        </div>
        <Tab.Panels>
          {Object.values(categories).map((category, idx) => (
            <Tab.Panel className='focus:outline-none' key={idx}>
              {category}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
