import LoginForm from "../components/LoginForm";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import PageLayout from "../components/PageLayout";
const Auth = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
          <LoginForm></LoginForm>
      </PageLayout>
    </div>
  );
};
export default Auth;