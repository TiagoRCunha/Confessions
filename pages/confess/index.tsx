import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'
import Card from '../../components/Card'
import styles from './styles.module.css'

export default function Confess() {
  const [value, setValue] = useState('');
  const router = useRouter()
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/"

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
    data: string
  ) => {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: data }),
    };

    try {
      const data = await fetch(`${url}api/confess`, requestOptions);

      if (data.status === 201) {
        router.push("/confessions");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(JSON.stringify({ message: data }));
      console.log(error);
    }
  };

  return (
    <Card>
      <h1>Confesse</h1>
      <p className={styles.description}>
        Esta área é direcionada para escrever sua confissão, ela será postada como anônima.</p>
      <form
        method="post"
        onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event, value)}
        className={styles.cardBody}
      >
        <textarea
          className={styles.textArea}
          name="confess-area"
          id="confess"
          maxLength={150}
          value={value}
          onChange={
            (e: ChangeEvent<HTMLTextAreaElement>) => {
              setValue(e.target.value)
            }}
          cols={30}
          rows={10}
        ></textarea>
        <span
          className={styles.link + " col-6 col-s-12"}
        >
          <Link href="/">
            Voltar para o início
          </Link>
        </span>
        <button
          className={styles.button + " col-6 col-s-12"}
          type="submit"
        >
          Confessar
      </button>
      </form>
    </Card>)
}