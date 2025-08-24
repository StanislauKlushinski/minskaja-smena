import styles from './modalTitle.module.css';

interface modalProps {
    title: string
}

export default function ModalTitle({
                                       title
                                   }: modalProps) {
    return (
        <h2 className={styles.modalTitle} dangerouslySetInnerHTML={{
            __html: title
        }}>
        </h2>
    )
}
