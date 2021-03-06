import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { SwitchWrapper, MaterialUISwitch } from "./styles";
import { TemaContext, UsuarioContext, AlunoContext } from "../../context";

export default function Navbar(props) {
  const { temaSelecionado, setTemaSelecionado } = useContext(TemaContext);
  const { usuario } = useContext(UsuarioContext);
  const alterarTema = (e) => {
    const novoTema = e.target.checked ? "escuro" : "claro";

    setTemaSelecionado(novoTema);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              Home
            </IconButton>
          </Link>
          <Link to="/cadastrar-alunos">
            <Button color="inherit">Cadastro de Aluno</Button>
          </Link>

          <Link to="/materias">
            <Button color="inherit">Matérias</Button>
          </Link>

          <Link to="/cadastrar-materias">
            <Button color="inherit">Cadastro de Matéria</Button>
          </Link>

          <SwitchWrapper>
            <MaterialUISwitch
              onClick={(e) => {
                alterarTema(e);
              }}
              sx={{ m: 1 }}
            />
            <span style={{ alignSelf: "center" }}>Alterar tema</span>

            <span style={{ alignSelf: "center", marginLeft: "15px" }}>
              {usuario}
            </span>
          </SwitchWrapper>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
