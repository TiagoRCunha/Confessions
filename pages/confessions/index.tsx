import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import userSWR from 'swr'
import Card from '../../components/Card'
import Confession from '../../components/Confession'
import styles from './styles.module.css'

interface ConfessData {
  _id: string,
  message: string
}

const handleIndex = async (offset = 0) => {
  const url = process.env.NEXT_PUBLIC_API_URL || `http://localhost:3000/`

  try {
    const res = await fetch(
      `${url}api/confess?offset=${offset}`
    );

    const data = await res.json()
    return data;

  } catch (error) {
    console.log(error)
    return { data: { response: [], count: 0 } }
  }
};

const getStaticProps: GetStaticProps = async (context) => {

  const data = await handleIndex();

  return { props: { staticData: data } }

}

type ConfessProps = InferGetStaticPropsType<typeof getStaticProps>

function Confess({ staticData }: ConfessProps) {

  const url = process.env.NEXT_PUBLIC_API_URL || `http://localhost:3000/`
  const router = useRouter();
  const fetcher = (...args: RequestInfo[]) => fetch(args[0]).then(res => res.json())
  const { data, error } = userSWR(`${url}api/confess?offset=0`, fetcher)

  const [message, setMessage] = useState(staticData || data);

  interface PaginationCallback {
    selected: number
  }

  const pagginationHandler = async (page: PaginationCallback) => {

    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = String(page.selected + 1);

    const newData = await handleIndex(4 * page.selected);
    setMessage(staticData || newData)

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });

  };

  return (
    <Card>
      <h1 style={{ display: 'inline-block' }}>Confesse</h1>
      <strong className={styles.numbers}>número de confissões: {data ? data.count : 0}</strong>
      {message ? message.response.map((confession: ConfessData) =>
        <Confession key={confession._id} message={confession.message} />
      ) : error}
      <ReactPaginate
        pageCount={data ? Math.round(data.count / 4) : 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        nextLabel="próximo"
        previousLabel="anterior"
        breakLabel="..."
        containerClassName={styles.pagination + " col-12"}
        onPageChange={pagginationHandler}
      />
      <span
        className={styles.link + " col-6 col-s-12"}
      >
        <Link href="/">
          Voltar para o início
          </Link>
      </span>
      <span
        className={styles.link + " col-6 col-s-12"}
      >
        <Link href="/confess">
          Confessar novamente
        </Link>
      </span>
    </Card>)
}

export default Confess;