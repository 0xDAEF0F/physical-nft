import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import NavBar from '@/components/NavBar'
import TopArtists from '@/components/TopArtists'
import { fetchArtists } from '@/components/TopArtists'

const Home: NextPage = ({
  artists,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NavBar />
      <TopArtists topArtists={artists} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const artists = await fetchArtists()
  return {
    props: {
      artists,
    },
    revalidate: 86400,
  }
}

export default Home
