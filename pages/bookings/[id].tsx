import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "styles/Home.module.css";
import PageLayout from "components/PageLayout";
import { IBooking } from "interfaces/Booking";
import { decode } from "jsonwebtoken";
import { IToken } from "interfaces/Token";
import { IUserAuthResponse } from "interfaces/User";
import React from "react"
import { sendEtagResponse } from "next/dist/server/send-payload";
import UserBookingLayout from "components/bookings/UserBookingLayout";
import AdminBookingLayout from "components/bookings/AdminBookingLayout";

interface ISingleBookingProps {
    booking: IBooking;
    type: "admin" | "user"
}
interface ISingleBookingParams {
    params: IBookingId;
}
interface IBookingId {
    id: string;
}

const BookingPage: NextPage<ISingleBookingProps> = (props: ISingleBookingProps) => {
    const { booking } = props;
    const [isLoading, setLoading] = useState(false);
    const [token, setToken] = useState<null | string>(null);
    const [auth, setAuth] = useState(false);
    const [type, setType] = useState<string>("")

    const router = useRouter();
    useEffect(() => {
        const fetchData = async (token: string) => {
            const tokenPayload = decode(token) as IToken;
            //console.log(tokenPayload)
            const apiData = await fetch(`/api/bookings/${router.query.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            //console.log(apiData)
            return apiData;
        };
        if (localStorage.user) {
            //console.log("hay cosas");
            const localStorageData: IUserAuthResponse = JSON.parse(
                localStorage.user
            );
            fetchData(localStorageData.token)
                .then((data) => {
                    data.json()
                        .then((bookingResponse) => {
                            setType(bookingResponse.type)
                            setAuth(true);
                            setToken(localStorageData.token);
                        })
                        .catch(() => {
                            router.push("/login");
                        });
                })
                .catch(() => {
                    router.push("/login");
                });
        } else {
            router.push("/login");
        }
    }, [router]);

    // useEffect(() => {
    // }, []);
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
                {type=="admin"? <AdminBookingLayout booking={booking} token={token}/>:""}
                {type=="user"?<UserBookingLayout booking={booking} token={token}/>:""}
            </PageLayout>
        </div>
    );
};

export async function getStaticPaths() {
    const res = await fetch(`http://localhost:3001/bookings/`);
    const bookings: IBooking[] = await res.json();
    return {
        paths: bookings.map((booking) => {
            return { params: { id: booking.id.toString() } };
        }),
        fallback: false,
    };
}

export async function getStaticProps({ params }: ISingleBookingParams) {
    const res = await fetch(`http://localhost:3001/bookings/${params.id}`);
    const booking: ISingleBookingProps = await res.json();
    return { props: { booking } };
}
export default BookingPage;
