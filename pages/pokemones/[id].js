import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Pokemon = ({ data }) => {
    const router = useRouter()
    console.log(router)

    // cuando fallback: true
    // if (router.isFallback) {
    //     return <p>Cargando...</p>
    // }

    return (
        <div>
            <h1>{ data.name } número #{ data.id }</h1>
            <Image src={data.sprites.front_default} width={400} height={400} />
            <Link href="/">Volver a inicio</Link>
        </div>
    )
}

export default Pokemon

export const getStaticProps = async ({ params }) => {
    const response = await fetch( `https://pokeapi.co/api/v2/pokemon/${params.id}` )
    const data = await response.json()

    return{ props: { data } }
}

// para generar contenido estático dinámico
export const getStaticPaths = async () => {
    const paths = [
        { params: { id: '1' } },
    ]
    return {
        // paths: paths,
        paths,
        fallback: 'blocking',

        // cuando queremos mostrar un mensaje cargando para las paginas no definidas en paths
        // fallback: true,

        // cuando tengamos definidas todas las rutas en el array paths
        // fallback: false,

        // para esperar a que se genere el contenido html antes de mostrarlo
        // de páginas que no se encuentren definidas en el array paths
        // fallback: 'blocking',

    }
}

// export const getServerSideProps = async ({ params }) => {
//     const response = await fetch( `https://pokeapi.co/api/v2/pokemon/${params.id}` )
//     const data = await response.json()

//     return{ props: { data } }
// }