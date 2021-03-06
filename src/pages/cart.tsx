import Head from "next/head";
import React from "react";
import Link from "next/link";
import { Product } from "../../types";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../util/format";

export default function Cart() {
  const { cart } = useCart();

  const totalPrice = cart.reduce((sum, currentValue) => {
    return sum + currentValue.price;
  }, 0);

  const filteredCart = cart.reduce((acc, current) => {
    const filter = acc.find((item) => item.id === current.id);
    if (!filter) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  return (
    <>
      <Head>
        <title>Cart | fast.food</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto container px-4 lg:px-40 flex flex-col flex-grow overflow-hidden">
        {cart.length != 0 ? (
          <div className="bg-white flex flex-col h-full items-center p-4 md:px-16">
            <Link href="/menu">
              <a className="ml-auto text-red-500 mb-4">Edit items</a>
            </Link>

            <section className="h-auto w-full flex flex-col overflow-y-auto scrollbar-hide gap-4 border-b-2 border-gray-300 pb-2">
              {filteredCart.map((item: Product) => {
                return (
                  <div
                    key={item.id}
                    className="h-20 w-full bg-gray-100 rounded-md pl-4 py-4 flex flex-row items-center justify-between"
                  >
                    <div className="flex gap-4 items-center h-full">
                      <h1 className="border-r-2 border-gray-300 w-8 h-full flex items-center">
                        {
                          cart.filter((product) => product.id === item.id)
                            .length
                        }
                      </h1>

                      <div>
                        <h1>{item.name}</h1>
                        <h2 className="text-green-400 font-bold ">
                          {formatPrice(item.price)}
                        </h2>
                      </div>
                    </div>

                    <div className="w-20 h-full flex items-center justify-center border-l-2 border-gray-300">
                      <h1 className="text-5xl">{item.icon}</h1>
                    </div>
                  </div>
                );
              })}

              <div className="ml-auto mt-8">
                <span className="text-grey-800 text-xl">Total</span>

                <h1 className="ml-auto text-green-400 font-bold">
                  {formatPrice(totalPrice)}
                </h1>
              </div>
            </section>

            <button
              className="bg-red-500 h-16 w-36 text-white rounded-lg text-lg font-semibold filter hover:brightness-90 transition ml-auto mt-8"
              onClick={() => alert("Thanks for buying!")}
            >
              Finish
            </button>
          </div>
        ) : (
          <div className="bg-white flex flex-col h-full items-center justify-center p-4 md:px-16 gap-8">
            <h1>You need at least 1 product in cart to make your order.</h1>

            <Link href="/menu">
              <a>
                <button className="bg-red-500 h-16 w-36 text-white rounded-lg text-lg font-semibold filter hover:brightness-90 transition">
                  Go to menu
                </button>
              </a>
            </Link>
          </div>
        )}
      </main>
    </>
  );
  return;
}
