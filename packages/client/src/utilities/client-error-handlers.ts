import toast from 'react-hot-toast'

export function logClientErr(err: Error, message: string) {
  console.error(err)
  toast.error(message)
}
