import { createCheckoutSession } from "#app/.server/stripe.server.js";
import { useState } from "react";
import { Form, redirect } from "react-router";
import type { Route } from "./+types/shop";

export async function loader() {
    const products: {
        id: string;
        title: string;
        description: string;
        price: number;
        image: string;
        category: string;
    }[] = [
            {
                id: "1",
                title: "Phone 1",
                description: "Nothing phone 1",
                price: 100,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf1JbnVgfVlU3_IwKP50zVyk8a_i2tIk9kXw&s",
                category: "tech",
            },
            {
                id: "2",
                title: "Macbook Pro",
                description: "Apple Macbook Pro",
                price: 200,
                image: "https://cdn.thewirecutter.com/wp-content/media/2023/06/bestlaptops-2048px-9765.jpg?auto=webp&quality=75&width=1024",
                category: "tech",
            },
            {
                id: "3",
                title: "Phone 2",
                description: "Nothing phone 2",
                price: 300,
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf1JbnVgfVlU3_IwKP50zVyk8a_i2tIk9kXw&s",
                category: "tech",
            },
        ];

    return products;
}


export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const cartItems = formData.get("cartItems");

    const cartItemsArray = JSON.parse(cartItems as string);

    const checkoutSession = await createCheckoutSession(cartItemsArray);
    return redirect(checkoutSession.url || "/");
}

export default function Shop({ loaderData }: Route.ComponentProps) {

    const [cartItems, setCartItems] = useState<{
        id: string;
        title: string;
        price: number;
        quantity: number;
    }[]>([]);

    return <div className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Broisnees Shop</h1>

        <div className="flex flex-wrap gap-4 w-full">
            {
                loaderData.map((product) => (
                    <div key={product.id} className="flex flex-col gap-1 p-2 rounded-md">
                        <h2 className="text-lg font-semibold text-cyan-400">{product.title}</h2>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <img className="w-[200px] bg-gray-950/10 h-[120px] aspect-auto rounded-md border border-gray-300" src={product.image} alt={product.title} />
                        <button className="bg-green-500 text-white w-fit py-2 px-5 rounded-md" onClick={() => setCartItems([...cartItems, { ...product, quantity: 1 }])}>
                            Add to cart
                        </button>

                    </div>
                ))
            }
        </div>


        <Form method="post" id="cart-form">



            <div className="flex flex-col gap-2 p-2 rounded-md">

                {cartItems.length > 0 && (
                    <>
                        <hr className="w-full border-gray-300" />

                        <h2 className="text-lg font-semibold text-red-400">Cart Items</h2>
                        {
                            Object.values(cartItems.reduce((acc, item) => {
                                if (!acc[item.id]) {
                                    acc[item.id] = { ...item };
                                } else {
                                    acc[item.id]!.quantity += item.quantity;
                                }
                                return acc;
                            }, {} as Record<string, typeof cartItems[0]>)).map((item) => (
                                <div key={item.id}>
                                    <p>{item.title} x {item.quantity}</p>
                                </div>
                            ))
                        }
                        <h1>Total: {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h1>
                        <input type="hidden" name="cartItems" value={JSON.stringify(cartItems)} />
                        <button
                            className="bg-yellow-600 text-white p-1 w-min rounded-md"
                            form="cart-form"
                            type="submit"
                        >
                            Checkout
                        </button>

                    </>
                )}
            </div>
        </Form>
    </div>;
}
