import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";

export default function pokemon({ pokeman }) {
  return (
    <Layout title={pokeman.name}>
      <div className="border-2 w-9/12 mx-auto text-center bg-gray-200 rounded-lg shadow-lg shadow-gray-500/50">
        <h1 className="text-4xl mb-2 my-4 text-center uppercase">
          {pokeman.name}
        </h1>
        <div className="w-96 mx-auto text-center">
          <img
            className="w-60 h-60 ml-20"
            src={pokeman.image}
            alt={pokeman.name}
          />
        </div>
        <p>
          <span className="font-bold mr-2">Weight:</span>
          {pokeman.weight}
        </p>
        <p>
          <span className="font-bold mr-2">Height:</span>
          {pokeman.height}
        </p>
        <h2 className=" font-bold text-2xl mt-6 mb-2">Types</h2>
        {pokeman.types.map((type, index) => (
          <p key={index}>{type.type.name}</p>
        ))}
        <p className="mt-10 mb-10 text-center">
          <Link href="/" legacyBehavior>
            <a className="text-2xl bg-cyan-700 px-5 rounded-md text-white hover:bg-cyan-600 shadow-lg shadow-gray-500/50">
              {" "}
              Home
            </a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeman = await res.json();
    const paddedIndex = ("00" + id).slice(-3);
    const image = ` https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
    pokeman.image = image;
    return {
      props: { pokeman },
    };
  } catch (err) {
    console.error(err);
  }
}
