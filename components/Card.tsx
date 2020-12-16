import styles from './Card.module.css'

export default function Card({ children }
  : { children: React.ReactNode }) {
  return (
    <div className={styles.card + " col-6"}>
      {children}
    </div>)
}