import React from 'react'

function EditProfile() {
  return (
    <section className='py-20 h-screen'>
      <div className='mx-auto container max-w-3xl md:w-3/4 px-5'>
        <p className='text-4xl font-bold mb-10 ml-5'>Edit your profile</p>
        <div className='bg-white text-gray-600 space-y-6 rounded-xl shadow-md'>
          <div className='md:inline-flex  space-y-4 md:space-y-0  w-full p-4 items-center'>
            <h2 className='md:w-1/3 max-w-sm mx-auto text-2xl font-medium'>
              Enter your information
            </h2>
            <div className='md:w-2/3 mx-auto max-w-sm space-y-5'>
              <div>
                <label className='text-sm text-gray-500'>Username</label>
                <div className='w-full inline-flex border rounded-md'>
                  <div className='w-1/12 pt-2 bg-gray-100'>
                    <svg
                      fill='none'
                      className='w-6 text-gray-400 mx-auto'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
                  </div>
                  <input
                    type='text'
                    className='w-11/12 focus:outline-none focus:text-gray-600 p-2'
                    placeholder='example'
                  />
                </div>
              </div>
              <div>
                <label className='text-sm text-gray-500'>Bio</label>
                <textarea
                  typeof='text'
                  placeholder='Text your story!'
                  className='w-full focus:outline-none p-2 inline-flex border rounded-md'
                ></textarea>
              </div>
            </div>
          </div>

          <div className='md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-00 items-center'>
            <h2 className='md:w-1/3 max-w-sm mx-auto text-2xl font-medium'>
              Receive email notifications
            </h2>
            <div className='md:w-2/3 max-w-sm mx-auto'>
              <label className='text-sm text-gray-500'>Email</label>
              <div className='w-full inline-flex border rounded-md'>
                <div className='pt-2 w-1/12 bg-gray-100 bg-opacity-50'>
                  <svg
                    fill='none'
                    className='w-6 text-gray-400 mx-auto'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                <input
                  type='email'
                  className='w-11/12 focus:outline-none focus:text-gray-600 p-2'
                  placeholder='email@example.com'
                />
              </div>
            </div>
          </div>

          <div className='md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-00 items-center'>
            <h2 className='md:w-1/3 max-w-sm mx-auto text-2xl font-medium'>
              Change your profile picture
            </h2>
            <div className='md:w-2/3 max-w-sm mx-auto'>
              <div>
                <label className='block text-sm text-gray-500'>
                  Profile picture
                </label>
                <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                  <div className='space-y-1 text-center'>
                    <svg
                      className='mx-auto h-12 w-12 text-gray-400'
                      stroke='currentColor'
                      fill='none'
                      viewBox='0 0 48 48'
                      aria-hidden='true'
                    >
                      <path
                        d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    <div className='flex text-sm text-gray-500'>
                      <label
                        htmlFor='file-upload'
                        className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
                      >
                        <span>Upload a file</span>
                        <input
                          id='file-upload'
                          name='file-upload'
                          type='file'
                          className='sr-only'
                        />
                      </label>
                      <p className='pl-1'>or drag and drop</p>
                    </div>
                    <p className='text-xs text-gray-500'>
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-00 items-center'>
            <h2 className='md:w-1/3 max-w-sm mx-auto text-2xl font-medium'>
              Add your social media links
            </h2>
            <div className='md:w-2/3 max-w-sm mx-auto'>
              <label className='text-sm text-gray-500'>Email</label>
              <div className='w-full inline-flex border rounded-md'>
                <div className='pt-2 w-1/12 bg-gray-100 bg-opacity-50'>
                  <svg
                    fill='none'
                    className='w-6 text-gray-400 mx-auto'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                <input
                  className='w-11/12 focus:outline-none focus:text-gray-600 p-2'
                  placeholder='Facebook'
                />
              </div>
              <div className='w-full inline-flex border rounded-md'>
                <div className='pt-2 w-1/12 bg-gray-100 bg-opacity-50'>
                  <svg
                    fill='none'
                    className='w-6 text-gray-400 mx-auto'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                <input
                  className='w-11/12 focus:outline-none focus:text-gray-600 p-2'
                  placeholder='Instagram'
                />
              </div>
              <div className='w-full inline-flex border rounded-md'>
                <div className='pt-2 w-1/12 bg-gray-100 bg-opacity-50'>
                  <svg
                    fill='none'
                    className='w-6 text-gray-400 mx-auto'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    />
                  </svg>
                </div>
                <input
                  type='email'
                  className='w-11/12 focus:outline-none focus:text-gray-600 p-2'
                  placeholder='Site'
                />
              </div>
            </div>
          </div>
          <div className='md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 justify-end'>
            <div className='md:w-2/12 md:pl-6'>
              <button className='text-white bg-blue-500 w-full mx-auto max-w-sm rounded-md text-center bg-blue-00 py-2 px-4 inline-flex items-center focus:outline-none md:float-right justify-center'>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EditProfile
