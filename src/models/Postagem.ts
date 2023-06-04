import Tema from './Tema'

interface Postagem{
    id: number; 
    titulo: string; /*só vai aceitar titulo com mais de 5 letras*/
    texto: string; /*só vai aceitar texto com mais de 10 letras*/
    tema?: Tema| null
    
}

export default Postagem;

