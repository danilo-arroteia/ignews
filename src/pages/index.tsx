
import { GetStaticProps } from 'next';
import Head from "next/head";
import Image from "next/image";

import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

// Client-side
// Server-side
// Static Site Generation

// Post do Blog

// Conteúdo (SSG)
// Comentários (Client-side, carregar pelo cliente, não pelo servidor)
interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Ignews</title>
      </Head>
      
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>New about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for just {product.amount} month</span>
          </p>
          <SubscribeButton
            priceId={product.priceId}
          />
        </section>

        <Image src="/images/avatar.svg" height={520} width={334} alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1LIeYDHSIBCic6YlnnEtKiVR')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100)
  }
  
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}

// SOMENTE EM PÁGINAS A CHAMA NEXT