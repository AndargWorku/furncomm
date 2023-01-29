import React,{useState,useEffect} from 'react'
import Helmte from "../components/Helmte/Helmte"
import {Link } from "react-router-dom"
import {motion} from "framer-motion"
import products from "../assets/data/Products"
import {Container,Row,Col} from "reactstrap"
import '../styles/Home.css'
import Clock from "../components/UI/Clock"
import counterImg from "../assets/images/counter-timer-img.png"
import ProductList from "../components/UI/ProductList"
import hero_img from "../assets/images/hero_img.png"
import Services from "../services/Services"
const Home = () => {
    const [trendingProducts,setTrendingProducts]=useState([]);
    const [bestSalesProducts,setBestSalesProducts]=useState([]);
    const [mobileProducts,setMobileProducts]=useState([]);
    const [wirelessProducts,setWirelessProducts]=useState([]);
    const [popularProducts,setPopularProducts]=useState([]);
    const year=new Date().getFullYear();
    useEffect(()=>{
        const filteredTrendingProducts=products.filter(
            (item)=>item.category=="chair"
        );
        const filteredBestSalesProducts=products.filter(
            (item)=>item.category=="sofa"
        );
        const filteredMobileProducts=products.filter(
            (item)=>item.category=="mobile"
        );
        const filteredWirelessProducts=products.filter(
            (item)=>item.category=="wireless"
        );
        const filteredPopularProducts=products.filter(
            (item)=>item.category=="watch"
        );
        setTrendingProducts(filteredTrendingProducts);
        setBestSalesProducts(filteredBestSalesProducts);
        setMobileProducts(filteredMobileProducts);
        setWirelessProducts(filteredWirelessProducts);
        setPopularProducts(filteredPopularProducts);
    },[]);
  return (
    <Helmte title={"Home"}>
        <section className="hero_section">
            <Container>
                <Row>
                    <Col lg='6' md='6'>
                        <div className='hero_content'>
                            <p className='hero_subtitle'>Trading products in {year}</p>
                            <h2>Make your interior more Minimalstic & modern</h2> 
                            <p>make smart your interner passion in attractive deign arctic in reflect in the real world
                            Some people define smart furniture as items that incorporate technology like USB charging ports, touchscreens, speakers and motion-activated features.
                             Others equate smart furniture with intelligent furniture that connects to a network or device. </p>
                             <motion.button whileTap={{scale:1.2}} className='buy_btn'><Link to='/shop'>SHOP NOW</Link></motion.button>         

                        </div>
                    </Col>
                    <Col lg='6' md='6'>
                        <div className='hero_img'>
                             <img src={hero_img} alt=" "/>
                        </div>
                    </Col>
                </Row>
            </Container>

        </section>
        <Services/>
        <section className='trending_products'>
            <Container>
                <Row>
                <Col lg='12' className='text_center '>
                    <h2 className='section_title'>Trending products</h2>
                </Col>
                <ProductList data={trendingProducts}/>
                </Row>
            </Container>

        </section>
      <section className="best_sales">
        <Container>
            <Row>
                <Col lg='12' className='text-center'>
                    <h2 className='section_title'>Best sales</h2>
                </Col>
                <ProductList data={bestSalesProducts}/>
            </Row>
        </Container>
      </section>
      <section className='timer_count'>
        <Container>
            <Row>
                <Col lg='6' md='12' className='count_down-col'>
                    <div className='clock_top-content'>
                        <h4 className='text-white fs-6 mb-2'>Limited offers</h4>
                        <h3 className='text-white fs-5 mb-3'>Quality armchair</h3>
                    </div>
                    <Clock/>
                    <motion.button whileTap={{scale:1.2}}
                     className='buy_btn store_btn'>
                        <Link to='/shop'>Visited store</Link>
                    </motion.button>
                </Col>
                <Col lg='6' md='12' className='text-end  counter_img'>
                    <img src={counterImg} alt=''/>
                </Col>
            </Row>
        </Container>

      </section>
      <section className='new_arrivals'>
        <Container>
            <Row>
            <Col lg='12' className='text-center mb-5'>
                    <h2 className='section_title'>New Arrivals</h2>
                </Col>
                <ProductList data={mobileProducts}/>
                <ProductList data={wirelessProducts}/>
                
            </Row>
        </Container>
      </section>
      <section className='popular_category'>
      <Container>
            <Row>
            <Col lg='12' className='text-center mb-5'>
                    <h2 className='section_title'>popular category</h2>
                </Col>
                <ProductList data={popularProducts}/>
                
                
            </Row>
        </Container>

      </section>
    </Helmte>
  ); 
};

export default Home
