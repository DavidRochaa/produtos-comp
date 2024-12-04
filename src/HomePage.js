// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const HomePage = () => {
//   const [produtos, setProdutos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Função para listar os produtos
//   const fetchProdutos = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       console.log("Token recuperado: ", token);  // Verifique o token
  
//       if (!token) {
//         console.error('Token não encontrado!');
//         setLoading(false);
//         navigate('/login');
//         return;
//       }
  
//       // Requisição para o backend
//       const response = await axios.get('http://localhost:5000/api/produtos', {
//         headers: {
//           Authorization: `Bearer ${token}`,  // Envia o token no cabeçalho
//         },
//       });
  
//       setProdutos(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Erro ao carregar produtos:', error);  // Log completo do erro
  
//       if (error.response) {
//         // Se a resposta de erro contiver dados
//         console.error('Erro de resposta:', error.response.data);
//         console.error('Status de resposta:', error.response.status);
//         if (error.response.status === 401) {
//           console.log('Token inválido ou não fornecido. Redirecionando para login...');
//         }
//       } else {
//         // Se o erro for de rede ou outro erro não relacionado à resposta
//         console.error('Erro sem resposta do servidor:', error.message);
//       }
//       setLoading(false);
//     }
//   };

//   // Função para adicionar produto ao carrinho
//   const addToCart = (produto) => {
//     // Recupera o carrinho do localStorage
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];

//     // Verifica se o produto já está no carrinho
//     const existingProduct = cart.find((item) => item.id === produto.id);

//     if (existingProduct) {
//       // Se o produto já existe, incrementa a quantidade
//       existingProduct.quantidade += 1;
//     } else {
//       // Se não existe, adiciona o produto com quantidade 1
//       cart.push({ ...produto, quantidade: 1 });
//     }

//     // Atualiza o carrinho no localStorage
//     localStorage.setItem('cart', JSON.stringify(cart));
//     console.log(`${produto.nome} foi adicionado ao carrinho!`);
//   };

//   useEffect(() => {
//     fetchProdutos(); // Carrega os produtos
//   }, []); // A dependência vazia garante que isso será executado apenas uma vez, ao carregar o componente

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4">Bem-vindo à Página Inicial</h1>

//       {/* Botões de navegação */}
//       <button className="btn btn-primary" onClick={() => navigate('/cadastrar')}>
//         Criar Produto
//       </button>
//       <button className="btn btn-info ms-3" onClick={() => navigate('/cart')}>
//         Ir para o Carrinho
//       </button>

//       <h2 className="mt-5">Produtos Disponíveis</h2>
//       <ul className="list-group">
//         {produtos.length > 0 ? (
//           produtos.map((produto) => (
//             <li key={produto.id} className="list-group-item d-flex justify-content-between align-items-center">
//               {produto.nome}
//               <button className="btn btn-success" onClick={() => addToCart(produto)}>
//                 Adicionar ao Carrinho
//               </button>
//             </li>
//           ))
//         ) : (
//           <li className="list-group-item">Nenhum produto disponível</li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default HomePage;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Função para listar os produtos
  const fetchProdutos = async () => {
    try {
      const token = localStorage.getItem('token');  // Verifica se o token existe
      console.log("Token recuperado: ", token);  // Verifique o token

      if (!token) {
        console.error('Token não encontrado!');
        setLoading(false);
        navigate('/login');  // Redireciona para o login se o token não for encontrado
        return;
      }

      // Requisição para o backend
      const response = await axios.get('http://localhost:5000/api/produtos', {
        headers: {
          Authorization: `Bearer ${token}`,  // Envia o token no cabeçalho
        },
      });

      setProdutos(response.data);  // Armazena os produtos no estado
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);  // Log completo do erro

      if (error.response) {
        // Se a resposta de erro contiver dados
        console.error('Erro de resposta:', error.response.data);
        console.error('Status de resposta:', error.response.status);
        if (error.response.status === 401) {
          console.log('Token inválido ou não fornecido. Redirecionando para login...');
          navigate('/login');  // Redireciona para login em caso de erro 401
        }
      } else {
        // Se o erro for de rede ou outro erro não relacionado à resposta
        console.error('Erro sem resposta do servidor:', error.message);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos(); // Carrega os produtos
  }, []);  // Dependência vazia garante que isso será executado apenas uma vez, ao carregar o componente

  // Função para adicionar produto ao carrinho
  const addToCart = (produto) => {
    console.log(`${produto.nome} foi adicionado ao carrinho!`);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Bem-vindo à Página Inicial</h1>

      {/* Botões de navegação */}
      <button className="btn btn-primary" onClick={() => navigate('/cadastrar')}>
        Criar Produto
      </button>
      <button className="btn btn-info ms-3" onClick={() => navigate('/cart')}>
        Ir para o Carrinho
      </button>

      <h2 className="mt-5">Produtos Disponíveis</h2>
      <ul className="list-group">
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <li key={produto.id} className="list-group-item d-flex justify-content-between align-items-center">
              {produto.nome}
              <button className="btn btn-success" onClick={() => addToCart(produto)}>
                Adicionar ao Carrinho
              </button>
            </li>
          ))
        ) : (
          <li className="list-group-item">Nenhum produto disponível</li>
        )}
      </ul>
    </div>
  );
};

export default HomePage;
