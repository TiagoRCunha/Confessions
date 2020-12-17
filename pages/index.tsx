import { GetStaticProps } from 'next'
import Link from 'next/link'
import Box from '../components/Box'
import Layout from '../components/layout'
import { getSortedPostsData } from '../lib/posts'

export default function Home({
  allPostsData
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  return (
    <Layout>
      <Box>
        <Link href="/confess">
          <h1 style={{ fontSize: "6vw" }}>Confessar</h1>
        </Link>
      </Box>
      <Box>
        <Link href="/confessions">
          <h1 style={{ fontSize: "6vw" }}>Confissões</h1>
        </Link>
      </Box>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}