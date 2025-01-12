import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); 
  const [counter, setcounter] = useState(0)
  const [showBox, setshowBox] = useState(false)
  const [total, subTotal] = useState(0)

  const fetchData = async () => {
    let response = await fetch(
      "https://6461c1c2491f9402f4aa0565.mockapi.io/products"
    );
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleCart = (productId) => {
    setCart((prevCart) => {
      if (prevCart.includes(productId)) {
        setcounter(counter - 1);
        return prevCart.filter((id) => id !== productId);
      } else {
        setcounter(counter + 1);
        return [...prevCart, productId];
      }
    });
  };

const totlaPrice = () => {
  return products
    .filter((product) => cart.includes(product.id))
    .reduce((total, product) => total + parseInt(product.price), 0);
};
 

  return (
    <>
    <nav className="px-20 grid grid-cols-8 gap-6 static bg-blue-400 drop-shadow-xl">
      <img src="new logo.png"></img>
      <a href="#" className="py-10 px-14 text-2xl">Home</a>
      <a href="#" className="py-10 px-14 text-2xl">About</a>
      <a href="#" className="py-10 px-14 text-2xl">Contact</a>
      <a href="#" className="py-10 px-14 text-2xl">Product</a>
      <a href="#" className="py-10 px-14 text-2xl">Catogery</a>
      <button onClick={()=>setshowBox(true)}>
      <img src="cart icon.png" className="mx-44 my-4 h-20"></img>
      </button>
      <div className="bg-red-500 rounded-full text-center h-8 w-3/12 my-8 mx-20 text-xl">{counter}</div>
      </nav>
    <div className="flex h-screen bg-white">
      <div className="w-full p-6 overflow-y-auto">
        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => {
            const isInCart = cart.includes(product.id);
            return (
              <div key={product.id} className="p-4 bg-white rounded-lg shadow-md">
                <img
                  className="object-cover w-full h-48 rounded-md"
                  src={`https://picsum.photos/seed/${product.avatar}/200/300`}
                  alt={product.name}
                />
                <h3 className="text-black text-lg font-semibold">
                  {product.name}
                </h3>
                <p className="text-gray-600">Rs.{product.price}</p>
                <button
                  onClick={() => toggleCart(product.id)}
                  className={`w-full px-8 py-2 rounded text-white ${
                    isInCart ? "bg-red-500" : "bg-blue-500"
                  }`}
                >
                  {isInCart ? "Remove from Cart" : "Add to Cart"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {showBox &&(
      <div className="py-10 absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
          <div className="box-border h-screen w-5/12 p-4 border-4 bg-white">
          <h2 className="text-2xl font-bold mb-4">Cart Items</h2>

            {cart.length> 0 ?(
              
              products.filter((product)=>(
                cart.includes(product.id)))
              .map((product)=>(
                <div key={product.id} className="p-4 bg-blue-500 shadow-md mb-4">
                <img
                  className="h-32 w-3/12"
                  src={`https://picsum.photos/seed/${product.avatar}/200/300`}
                  alt={product.name}
                />
                <h3 className="px-44 relative bottom-28 text-2xl">
                  {product.name}
                </h3>
                <p className="px-44 relative bottom-16 text-xl">
                  Rs.{product.price}
                </p>
                <hr className="relative top-4 border-gray-700" />
                <hr className="relative bottom-52 border-gray-700" />
              </div>
              ))
            ):(
<p className="text-lg text-gray-600">Your cart is empty.</p>
            )}
            <button onClick={()=>setshowBox(false)} className="px-8 py-2 rounded-md text-lg bg-blue-500 drop-shadow-xl">close</button>
            <h3 className="inline-block relative bottom-8 px-96 text-xl font-bold	">Total:{totlaPrice()}</h3>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default App;
