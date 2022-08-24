import React, { useState, useEffect } from "react";
import './cart.css';
import { toast } from 'react-toastify';
import alanBtn from '@alan-ai/alan-sdk-web';

function Cart() {

    const [mainCart, setMainCart] = useState([])
    const [cart, setCart] = useState([])
    const [isModel, setIsModel] = useState(false)

    useEffect(() => {
        alanBtn({
            key: 'b69c7c64652bc783d0653d04c6160e5c2e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: (commandData) => {
                if (commandData.command === 'getMenu') {
                    setMainCart(commandData.data)
                } else if (commandData.command === 'showCart') {
                    addCartHandler(commandData.data)
                } else if (commandData.command === "openCart") {
                    setIsModel(commandData.data)
                }

            }
            
        });

    }, [])
    const modelHandler = () => {
        setIsModel(!isModel)
    }


    const addCartHandler = (item) => {
        setCart(prev => {
            return [...prev, item]
        });
        toast.dark("Product added successfully")
    }


    return (
        <div>
            <nav className="navbar container mt-3" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="">
                        <h1 className="title is-size-3 has-text-link is-italic">AI-Shopping</h1>
                    </a>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">

                        <button onClick={modelHandler} className="button is-link">
                            Cart
                            <p id="count_cart">{cart.length}</p>
                        </button>

                    </div>
                </div>
                {isModel && (
                    <div className="modal" id="modalka">
                        <div className="modal-background"></div>
                        <div className="modal-card">
                            <header className="modal-card-head">
                                <p className="modal-card-title">Modal title</p>
                                <button onClick={modelHandler} className="delete" aria-label="close"></button>
                            </header>
                            <section className="modal-card-body">
                                {cart.map(item => (
                                    <div key={item.id} className="media box">
                                        <div className="media-left mx-4">
                                            <figure className="image is-48x48">
                                                <img src={item.image} alt="Placeholder image" />
                                            </figure>
                                        </div>
                                        <div className="media-content">
                                            <div className="columns">
                                                <div className="column is-8">
                                                    <p className="title is-4">{item.title.slice(0, 20)}</p>
                                                    <p className="subtitle is-6">{item.description.slice(0, 30)}</p>
                                                </div>
                                                <div className="column">
                                                    <strong className="title is-size-4">{item.price} $</strong>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </section>
                            <footer className="modal-card-foot">

                                <button onClick={modelHandler} className="button is-link">Close</button>
                            </footer>
                        </div>
                    </div>
                )
                }
            </nav>
            <div className="columns banner">
                <div className="column is-3 hero is-light">
                    <section className="hero mt-3 ml-5">
                        <h3 className="title is-size-4 has-text-centered">Commands Menu</h3>
                        <p> <i class="fa-solid fa-triangle-exclamation is-size-6"></i> You can use one of the following commands after clicking <i class="fa-solid fa-microphone"></i> the button</p>
                        <div className="content">
                            <ol>
                                <li>Show me the products menu</li>
                                <li>Order by ...
                                    <ul>
                                        <li>name</li>
                                        <li>category</li>
                                        <li>price</li>
                                        <li>id</li>
                                    </ul>
                                </li>
                                <li>Show me only . . .  products
                                    <ul>
                                        <li>women</li>
                                        <li>men</li>
                                        <li>electronics</li>

                                    </ul>
                                </li>
                                <li>Add product number . . .
                                    <ul>
                                        <li>1, 2 . . . 19, 20</li>
                                    </ul>
                                </li>
                                <li>Open my cart</li>
                                <li>Close my cart</li>
                            </ol>
                        </div>
                    </section>
                </div>
                <div className="column p-0">
                    {mainCart.length ?
                        <section className="section banner_2">
                            <div className="container">
                                <h1 className="title has-text-centered is-size-2 mb-6">Our Products</h1>
                                <div className="columns is-multiline">
                                    {mainCart.map((cart) => (
                                        <div key={cart.id} className="column is-4">
                                            <div className="box">
                                                <div className="cart">
                                                    <div className="card-image">
                                                        <figure className="image is-4by3">
                                                            <img src={cart.image} alt="Placeholder image" id="image_product" height="400px" />
                                                        </figure>
                                                    </div>
                                                    <div className="card-content">
                                                        <div className="columns">
                                                            <div className="column is-9">
                                                                <h2 className="title is-size-5 has-text-centered">{cart.title.slice(0, 18)}</h2>
                                                            </div>
                                                            <div className="column">
                                                                <p className="subtitle is-size-6 has-text-right">Id:  {cart.id}</p>
                                                            </div>
                                                        </div>
                                                        <div className="columns">
                                                            <div className="column is-8">

                                                                <p className="subtitle is-size-6">{cart.description.slice(0, 30)} . . .</p>

                                                            </div>
                                                            <div className="column">
                                                                <p><strong>{cart.price} $</strong></p>
                                                            </div>
                                                        </div>

                                                        <button onClick={() => addCartHandler(cart)} className="button is-fullwidth is-success">Add Cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>


                        :
                        <div>
                            <div className="welcome">
                                <h1 className="title has-text-centered is-size-1 has-text-white">Welcome to AI-Shopping store!!!</h1>
                                <p className="subtitle is-size-3 has-text-centered has-text-white my-5" >Please select one from the command menu</p>
                            </div>

                        </div>


                    }
                </div>
            </div>

        </div>
    )

}

export default Cart