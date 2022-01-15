import { Username } from '../constants'

export default function UsernameSuggestions({
  suggestions,
}: {
  suggestions: Username[]
}) {
  const suggestionsHtml = (
    <>
      {suggestions.map((usernameSug, i) => (
        <p key={i} className='text-red-500 block'>
          {usernameSug}
        </p>
      ))}
    </>
  )
  return (
    <div className='border-green-700'>
      <p>Suggestions for you</p>
      {suggestionsHtml}
    </div>
  )
}
