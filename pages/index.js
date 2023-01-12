import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Layout from "../components/Layout";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Home({ pokemon }) {
  return (
    <Layout title="NextJS Pokedex">
      <h1 className="text-4xl mb-8 text-center">NextJS Pokedex</h1>
      <ul className="flex justify-between flex-row flex-wrap w-full">
        {pokemon.map((pokeman, index) => (
          <li key={index} className="w-96">
            <Link href={`/pokemon?id=${index + 1}`} legacyBehavior>
              <a className="border p-4 border-gray my-5 uppercase flex items-center text-lg bg-gray-200 hover:bg-gray-100 rounded-md  shadow-lg shadow-gray-500/50">
                <img
                  className="w-40 h-40 mr-3"
                  src={pokeman.image}
                  alt={pokeman.name}
                />
                <span className="mr-2 font-bold">{index + 1}.</span>
                {pokeman.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
    const { results } = await res.json();
    const pokemon = results.map((result, index) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const image = ` https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;

      return {
        ...result,
        image,
      };
    });
    return {
      props: { pokemon },
    };
  } catch (err) {
    console.error(err);
    return {};
  }
}
