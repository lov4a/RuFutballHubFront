import styles from './error-notification.module.css'

type Props = {
  message: string
}

export function ErrorNotification({ message }: Props) {
  return (
    <div className={styles.wrapper}>
      {message}
    </div>
  )
}
