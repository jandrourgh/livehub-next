import {useRouter} from 'next/router'

const Band = ({}) => {
    const router=useRouter()
    const {id} = router.query

    return(
        <>
            <h2>Pagina de la banda: {id}</h2>
        </>
    )

}
export default Band