import React from 'react'
import { ButtonHTMLAttributes } from 'react'
import { styles } from './SubmitButton.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: string
	pending?: boolean
}

export const SubmitButton: React.FC<Props> = ({label, pending, type = 'button', ...props}) => {
  return (
    <button
      className={styles.button}
      aria-disabled={pending ?? false}
      disabled={pending ?? false}
      type={type}
      {...props}
    >
      {label}
    </button>
  )
}
