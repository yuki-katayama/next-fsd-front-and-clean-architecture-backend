import React, { ButtonHTMLAttributes } from 'react'
import { styles } from './CRUDButton.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	value: string
	action: () => any,
	customClass: string
}

const CRUDButton: React.FC<Props> = ({value, action, customClass, ...props}) => {
  return (
    <button onClick={() => action()} className={`${styles.button} ${customClass}`} {...props}>{value}</button>
  )
}

export default CRUDButton;