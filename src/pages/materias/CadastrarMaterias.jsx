import axios from "axios";
import { useEffect, useState } from "react";
import Styles from "../../components/Styles";
import { API_Materias } from "../../constants";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useParams } from "react-router";


const CadastrarMaterias = () => {
    const { id } = useParams();
    const MySwal = withReactContent(Swal);

    const valorInicial = id ? "" : null;
    const [titulo, setTitulo] = useState(valorInicial);
    const [professor_nome, setProfessor_Nome] = useState(valorInicial);

    useEffect(() => {
        getMaterias()
    }, []);

    const getMaterias = () => {
        axios.get(API_Materias).then((response) => {
            response.data.forEach(materia => {
                if (materia.id == id) {
                    setTitulo(materia.titulo);
                    setProfessor_Nome(materia.professor_nome);
                }
            })
        });
    };

    const cadastrarMaterias = () => {
        if (id) {
            axios.put(API_Materias, {
                id,
                titulo,
                professor_nome
            }).then((response) => {
                console.log(response);
                if (response.status === 200) {
                    MySwal.fire(<p>{response?.data?.message}</p>);
                    limparCampos();
                }
            }).catch(error => {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
            });
        } else {
            axios
                .post(API_Materias, {
                    titulo,
                    professor_nome,

                })
                .then((response) => {
                    if (response.status === 201) {
                        MySwal.fire(<p>{response?.data?.message}</p>);
                        limparCampos();
                    }
                }).catch(error => {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error,
                    })
                });
        }
    };

    const limparCampos = () => {
      setTitulo("");
      setProfessor_Nome("");
      
    };

    return ( 
        <Styles.Form>
        <Styles.InputCadastro
          label="Título"
          variant="outlined"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <Styles.InputCadastro
          label="Professor"
          variant="outlined"
          value={professor_nome}
          onChange={(e) => setProfessor_Nome(e.target.value)}
        />
        
        <Styles.ButtonCadastro onClick={cadastrarMaterias}>
          {id ? 'Editar' : 'Cadastrar'}
        </Styles.ButtonCadastro>
      </Styles.Form>    
    )
}

export default CadastrarMaterias;
