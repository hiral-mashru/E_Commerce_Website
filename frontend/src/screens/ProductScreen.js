import React, {useEffect, useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { Link } from'react-router-dom';
import { detailsProduct } from '../Actions';

function ProductScreen(props){
    const [qty, setQty] = useState(1)
    const productDetails = useSelector(state=> state.productDetails);
    const {product,loading,error} = productDetails;
    console.log("pd",product)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        }
    }, [])

    const handleAddToCart = () => {
        props.history.push("/cart/"+props.match.params.id + "?qty="+qty)
    }

    // console.log(props.match.params.id)
    // const product = data.products.find(x => x._id === props.match.params.id);
    // console.log(product)
    return (<div>
        <div className="back-to-result">
            <Link to="/">Back to result</Link>
        </div>
        {loading ? <div>Loading...</div> :
        error ? <div>{error}</div> :
        <div className="details">
            <div className="details-image">
                <img src={product.image} alt="product"></img>
            </div>
            <div className="card5">
            <div className="container1">
            <div className="details-info"><br/>
                <ul>
                    <li>
                        <h4>{product.name}</h4>
                    </li>
                    <li>
                        {product.rating} Stars ({product.numReviews} Reviews)
                    </li>
                    <li>
                        <b>Price: </b><b>{product.price}</b>
                    </li>
                    <li>
                        Description:
                        {product.description}
                    </li>
                </ul>
            </div>
            </div></div>
            <div className="details-action"><br/>
                <ul>
                    <li>
                        Price: {product.price}
                    </li>
                    <li>
                        Status: {product.countInStock > 0 ? "In stock" : "Out of stock"}
                    </li>
                    <li>
                        Qty: <select value={qty} onChange={(e)=> {setQty(e.target.value)}}>
                            {[...Array(product.countInStock).keys()].map(x=>
                                <option key={x+1} value={x+1}>{x+1}</option>
                            )}
                        </select>
                    </li>
                    <li>
                        {product.countInStock > 0 && <button onClick={handleAddToCart} className="button primary">Add to Cart</button>
                        }
                    </li>
                </ul>
            </div>
        </div>
        }
    </div>);
} 

export default ProductScreen;