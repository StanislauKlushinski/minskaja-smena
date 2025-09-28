import styles from './modalButtons.module.css';
import React from "react";

interface modalProps {
    children: React.ReactNode
}

export default function ModalButtons({
                                         children
                                   }: modalProps) {
    return (
        <div className={styles.modalButtons}>
            {children}
        </div>
    )
}
