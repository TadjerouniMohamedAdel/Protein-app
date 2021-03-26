import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { motion } from 'framer-motion'
const easing=[.6,-.05,.01,0.99]

const fadeInUp = {
  initial:{y:60,opacity:0},
  animate:{y:0,opacity:1,transition:{duration:.6,ease:easing}},
}

const stagger = {
  animate:{transition:{staggerChildren:.05}}
}

const Product = props => (
  <motion.div
    exit={{opacity:0}}
    initial="initial"
    animate="animate"
  >
    <div className='fullscreen'>
      <div className='product'>
        <div className='img'>
          <motion.img
              animate={{x:0,opacity:1}}
              initial={{x:200,opacity:0}}
              key={props.product.image} 
              src={props.product.image} 
          />
        </div>
        <div className='product-details'>
          <div className='inner'>
            <Link href='/'>
              <motion.div variants={fadeInUp}>
                <a className='go-back'>Back to products</a>
              </motion.div>
            </Link>
            <div>
              <span className='category'>Protein</span>
            </div>
            <h1>{props.product.name}</h1>
            <p>{props.product.details}</p>
            <div className='additonals'>
              <span>Soy Free</span>
              <span>Gluten Free</span>
            </div>
            <div className='qty-price'>
              <div className='qty'>
                <div className='minus'>-</div>
                <div className='amount'>1</div>
                <div className='add'>+</div>
              </div>
              <span className='price'>{props.product.price}</span>
            </div>
            <div className='btn-row'>
              <button className='add-to-cart'> Add to cart</button>
              <button className='subscribe'> Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

Product.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(
    `http://my-json-server.typicode.com/wrongakram/demo/products/${id}`
  );
  const product = await res.json();
  return { product };
};

export default Product;
