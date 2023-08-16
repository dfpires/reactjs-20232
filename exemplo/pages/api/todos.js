// getServerSideProps: Executado no servidor Node.js
export async function getServerSideProps() {
  const resposta = await fetch('https://jsonplaceholder.typicode.com/todos')
  const todos = await resposta.json()
  return {
    props: {
      todos,
    },
  }
}