import React, { ChangeEvent, MouseEventHandler } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalProps,
  ModalTitle,
} from 'react-bootstrap'
import { useTheme } from '../../contexts/ThemeContext'

interface IModal {
  cor: 'danger' | 'success' | 'warning'
  titulo: string
  labelbutton: string
  onConfirm?: MouseEventHandler<HTMLButtonElement>
}

const ModalCenter: React.FC<IModal & ModalProps> = props => {
  const { theme, font } = useTheme()
  return (
    <Modal {...props} size="lg" centered>
      <ModalHeader
        closeButton
        style={{
          background: `var(--bg-color-${theme}`,
          color: `var(--color-${font})`,
        }}
      >
        <ModalTitle>{props.titulo}</ModalTitle>
      </ModalHeader>
      <ModalBody style={{ background: '#222'}}>
        {props.children}
      </ModalBody>
      <ModalFooter
        style={{
          background: `var(--bg-color-${theme}`,
          color: `var(--color-${font})`,
        }}
      >
        <Button variant="secondary" onClick={props.onHide}>
          Fechar
        </Button>
        <Button variant={props.cor} onClick={props.onConfirm}>
          {props.labelbutton}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ModalCenter
