import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { IBand } from "interfaces/Band";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "styles/Home.module.css";
import PageLayout from "components/PageLayout";
import hexToRgba from "hex-to-rgba";
import ReactHlsPlayer from 'react-hls-player';


interface ISingleBandProps {
	band: IBand;
}
interface ISingleBandParams {
	params: IBandId;
}
interface IBandId {
	id: string;
}

const Band: NextPage<ISingleBandProps> = (props: ISingleBandProps) => {
	const { band } = props;

    const playerRef = useRef(null);
    const src = `http://www.livehub.daw:8088/hls/${band.id}.m3u8`

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<PageLayout>
				<div
					className="container p-4"
					style={{
						backgroundImage: band.imgUrl
							? `url("${band.imgUrl}")`
							: "",
                        backgroundSize:"cover",
					}}
				>
					<h2 style={{ color: band.theme.primary }}>{band.name}</h2>
                    <ul className="d-flex justify-content-start p-0">
                    {band.genres.map((genre, i)=><li className="badge text-ligt bg-dark mx-2" key={i}>{genre}</li>)}
                </ul>
					<div className="col-8 p-3 my-3"style={{ 
                        background: band.theme.secondary&&band.theme.opacity?hexToRgba(band.theme.secondary, band.theme.opacity):"transparent", 
                        backdropFilter: band.theme.backdrop?"blur(8px)":"none",
                        border:band.theme.borders?`1px solid ${band.theme.primary}`:"none",
                        borderRadius: band.theme.rounded?'16px':"0",
                    }}>
						<p style={{ color: band.theme.primary }}>
							{band.description}
						</p>
   
                    {
                        band.songUrl?<audio controls><source src={band.songUrl}></source></audio>:""
                    }
                    {
                        band.isLive?<ReactHlsPlayer src={src} playerRef={playerRef}>
                            <source ></source>
                        </ReactHlsPlayer>: ""
                    }
					</div>
				</div>
			</PageLayout>
		</div>
	);
};

export async function getStaticPaths() {
	const res = await fetch(`http://localhost:3001/bands/`);
	const bands: IBand[] = await res.json();
	return {
		paths: bands.map((band) => {
			return { params: { id: band.id } };
		}),
		fallback: false,
	};
}

export async function getStaticProps({ params }: ISingleBandParams) {
	const res = await fetch(`http://localhost:3001/bands/${params.id}`);
	const band: IBand = await res.json();
	return { props: { band } };
}
export default Band;
