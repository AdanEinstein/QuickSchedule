import React, { useCallback } from 'react'
import { Button, Container, FormLabel } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { IResultStatus } from '../../backend'
import { IStyle, useTheme } from '../../contexts/ThemeContext'
import './FormTheme.css'

const FormTheme: React.FC = () => {
  const { font, setFont, theme, setTheme } = useTheme()

  const handleTheme = useCallback(
    (style: IStyle) => {
      window.Main.sendMessage('style', {style, newStyle: true})
      window.Main.on('style', (_: any, resp: IResultStatus<IStyle>) => {
        setTheme(resp.data!.theme);
        setFont(resp.data!.font);
      })
    },
    [theme, font]
  )

  return (
    <>
      <Container className="fs-5">
        <Row className="mb-3 text-light">
          <h3>Escolha a cor de tema:</h3>
        </Row>
        <Row className="mb-2 text-light">
          <FormLabel className="col-3">Violet</FormLabel>
          <button
            className="col-9 Botao"
            style={{ background: `var(--bg-color-pink` }}
            onClick={() => handleTheme({theme: 'pink', font})}
          ></button>
        </Row>
        <Row className="mb-2 text-light">
          <FormLabel className="col-3">Red</FormLabel>
          <button
            className="col-9 Botao"
            style={{ background: `var(--bg-color-red` }}
            onClick={() => handleTheme({theme: 'red', font})}
          ></button>
        </Row>
        <Row className="mb-2 text-light">
          <FormLabel className="col-3">Blue</FormLabel>
          <button
            className="col-9 Botao"
            style={{ background: `var(--bg-color-blue` }}
            onClick={() => handleTheme({theme: 'blue', font})}
          ></button>
        </Row>
        <Row className="mb-2 text-light">
          <FormLabel className="col-3">Green</FormLabel>
          <button
            className="col-9 Botao"
            style={{ background: `var(--bg-color-green` }}
            onClick={() => handleTheme({theme: 'green', font})}
          ></button>
        </Row>
      </Container>
      <Container>
        <Row className="mb-3 text-light">
          <h3>Escolha a cor de fonte:</h3>
        </Row>
        <Row className="d-flex justify-content-around">
          <Button
            className="col-4"
            variant="light"
            onClick={() => handleTheme({theme, font: 'light'})}
          >
            Light
          </Button>
          <Button
            className="col-4"
            variant="dark"
            onClick={() => handleTheme({theme, font: 'dark'})}
          >
            Dark
          </Button>
        </Row>
      </Container>
    </>
  )
}

export default FormTheme
