import styles from './Confession.module.css'

interface ConfessionProps {
  message: string
}

export default function Confession(props: ConfessionProps) {
  return (
    <div className={styles.root + " col-6"}>
      <p className={styles.message}>{props.message}</p>
    </div>)
}