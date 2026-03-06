import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import styles from "./cryptoDonate.module.css"

const TRC20_ADDRESS = "TD4Sbymvsst6NVz1H1931phwjhRbWYhVX3"
const ERC20_ADDRESS = "0x26423ad32779088283b128e9b469c80946ef345b"

export function CryptoDonatePage() {
  const [network, setNetwork] = useState<"TRC20 (TRON)" | "ERC20">("TRC20 (TRON)")
  const [copied, setCopied] = useState(false)

  const address = network === "TRC20 (TRON)" ? TRC20_ADDRESS : ERC20_ADDRESS

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className={styles.page}>
      <h1>Поддержать проект криптовалютой</h1>

      <p className={styles.description}>
        Вы можете поддержать развитие Russian Fantasy HUB с помощью USDT
      </p>

      <div className={styles.networkSwitch}>
        <button
          className={network === "TRC20 (TRON)" ? styles.active : ""}
          onClick={() => setNetwork("TRC20 (TRON)")}
        >
          USDT TRC20
        </button>

        <button
          className={network === "ERC20" ? styles.active : ""}
          onClick={() => setNetwork("ERC20")}
        >
          USDT ERC20
        </button>
      </div>

      <div className={styles.qrBlock}>
        <div className={styles.networkLabel}>
          Сеть: <strong>{network}</strong>
        </div>

        <div className={styles.qr}>
          <QRCodeSVG value={address} size={200} />
        </div>
      </div>

      <div className={styles.addressBox}>
        <code>{address}</code>

        <button onClick={copyAddress}>
          {copied ? "Скопировано ✓" : "Скопировать"}
        </button>
      </div>

      <p className={styles.warning}>
        Отправляйте USDT через выбранную сеть.
      </p>
    </div>
  )
}