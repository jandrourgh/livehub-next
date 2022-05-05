import { BandItemProps } from "../interfaces/BandItemProps"
import Image from 'next/image'
import Link from 'next/link'
const BandItem = ({band}: BandItemProps) => {
    return <Link href={`/bands/${band.id}`}>
    <article>
        <h3>{band.name}</h3>
        <ul>{band.genres.map((genre, i)=><li key={i}>{genre}</li>)}</ul>
        <Image alt={band.name} width={300} height={300} src="http://placekitten.com/300/300"></Image>
    </article>
    </Link> 
}
export default BandItem