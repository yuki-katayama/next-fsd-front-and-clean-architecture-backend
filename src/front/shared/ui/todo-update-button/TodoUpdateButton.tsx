import React, { ButtonHTMLAttributes } from 'react'
import { styles } from './TodoUpdateButton.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	value: string
	action: () => any,
	customClass: string
}

export const TodoUpdateButton: React.FC<Props> = ({value, action, customClass, ...props}) => {
  return (
    <button onClick={() => action()} className={`${styles.button} ${customClass}`} {...props}>{value}</button>
  )
}