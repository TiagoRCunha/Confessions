import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { WithRouterProps } from 'next/dist/client/with-router'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import Card from '../../components/Card'
import Confession from '../../components/Confession'
import styles from './styles.module.css'

interface ConfessData {
  _id: string,
  message: string
}

const handleIndex = async (offset = 0) => {
  const url = process.env.API_URL || `http://localhost:3000/`

  try {
    const data = await fetch(
      `${url}api/confess?offset=${offset}`
    );


    if (data.ok && data) {
      return data.json();
    }
  } catch (error) {
    console.log(error);
  }
};

const getStaticProps: GetStaticProps = async (context) => {

  const data = await handleIndex() || { response: [], count: 0 };

  return { props: { data } }
}


type ConfessProps = InferGetStaticPropsType<typeof getStaticProps> & WithRouterProps

function Confess({ data, router }: ConfessProps) {

  const [message, setMessage] = useState(data);

  interface PaginationCallback {
    selected: number
  }

  const pagginationHandler = async (page: PaginationCallback) => {

    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = String(page.selected + 1);

    const newData = await handleIndex(4 * page.selected)
    setMessage(newData)

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
      ) : null}
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

export default withRouter(Confess);