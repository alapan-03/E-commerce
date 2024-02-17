import { register } from 'swiper/element/bundle';
import { useEffect, useState, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";


// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function BodySec1(props) {
  
  const swiperRef = useRef(null);

  const [datum, setDatum] = useState(null);

  const [lowPrice, setLowPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(100000);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateWindowWidth);

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);

  const filtered = datum?.products.filter((dataa) =>
    dataa.title
      ?.toLowerCase()
      .replace(/\s+/g, "")
      .includes(props.search?.toLowerCase().replace(/\s+/g, ""))
  );

  const filteredPrice = datum?.products.filter(
    (dataa) => dataa.price >= lowPrice && dataa.price <= highPrice
  );



  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let data = await fetch("https://dummyjson.com/products");

        if (data.ok) {
          let res = await data.json();
          setDatum(res);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [datum]);

  function filterPrice() {
    let low = document.getElementsByClassName("low-price")[0].value;
    let high = document.getElementsByClassName("high-price")[0].value;

    if (high === "") high = 10000;
    if (low === "") low = 0;
    // console.log(high);
    // console.log("");

    setLowPrice(low);
    setHighPrice(high);

    props.lowPrice(low);
    props.highPrice(high);
    // setLowPrice(low);
    // setHighPrice(high);
    // console.log(low)
  }

  if (!datum) return <h1>No data</h1>;

  return (
    <>
      <section>
        <div className="filter-cont">
          <p className="filter-p1">Filter</p>
          <p className="filter-p2">By price</p>
          <div className="filter">
            $ <input type="number" className="low-price" />&nbsp; to &nbsp;
            $ <input type="number" className="high-price" />
            <button onClick={filterPrice}>Done</button>
          </div>
        </div>


        <div className="phones searched">
          {/* searched results */}
          <p className="smartphone-txt">{props.search && `Searched results`}</p>

          <Swiper
            navigation={windowWidth<550 ? false : true}
            modules={[Navigation]}
            slidesPerView={windowWidth>1000? 4 : windowWidth>550 ? 2: 1}
            spaceBetween={40}
              className="mySwiper"

          >
            {props.search &&
              filtered.map((dataa) => (
                <SwiperSlide key={dataa.id}>
                  <div className="sw-items">
                    <div className="img-cont">
                      <img
                        className="phoneImg1"
                        src={dataa.thumbnail}
                        alt={dataa.title}
                      />
                    </div>
                    <p className="brand">{dataa.brand}</p>
                    <p className="title">{dataa.title}</p>
                    <p className="price">${dataa.price}</p>
                    <button
                      className="addCart"
                      onClick={(e) => props.cartItem(dataa.id)}
                    >
                      Add to cart
                    </button>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>

          {/* smartphones */}

          <p className="smartphone-txt">Smartphones</p>

          <Swiper
            navigation={windowWidth<550 ? false : true}
            modules={[Navigation]}
            slidesPerView={windowWidth>1000? 4 : windowWidth>550 ? 2: 1}
            spaceBetween={40}
            className="mySwiper"
          >
            {filteredPrice &&
              filteredPrice.map(
                (dataa) =>
                  dataa.category === "smartphones" && (
                    <SwiperSlide key={dataa.id}>
                      <div className="sw-items">
                        <div className="img-cont">
                          <img
                            className="phoneImg1"
                            src={dataa.thumbnail}
                            alt={dataa.title}
                          />
                        </div>
                        <p className="brand">{dataa.brand}</p>
                        <p className="title">{dataa.title}</p>
                        <p className="price">${dataa.price}</p>
                        <button className="addCart">Add to cart</button>
                      </div>
                    </SwiperSlide>
                  )
              )}
          </Swiper>

          {/* laptop */}

          <p className="smartphone-txt">Laptops</p>

          <Swiper
            navigation={windowWidth<550 ? false : true}
            modules={[Navigation]}
            slidesPerView={windowWidth>1000? 4 : windowWidth>550 ? 2: 1}
            spaceBetween={40}
            className="mySwiper"
          >
            {filteredPrice &&
              filteredPrice.map((dataa) => {
                return (
                  dataa.category === "laptops" && (
                    <SwiperSlide key={dataa.id}>
                      <div className="sw-items">
                        <div className="img-cont">
                          <img
                            className="phoneImg1"
                            src={dataa.thumbnail}
                            alt={dataa.title}
                          />
                        </div>

                        <p className="brand">{dataa.brand}</p>
                        <p className="title">{dataa.title}</p>
                        <p className="price">${dataa.price}</p>
                        <button className="addCart">Add to cart</button>
                      </div>
                    </SwiperSlide>
                  )
                );
              })}
          </Swiper>
        </div>
      </section>

      {/* <Script>
        {`
        const swiperEl = document.querySelector("Swiper")

        Object.assign(swiperEl, {
          slidesPerView: 1,
          spaceBetween: 10, 
          pagination: {
            
          },
          breakpoints: {
            800: {
              slidesPerView: 2,
              spaceBetween: 20
            }
          }
        })
        `}
      </Script> */}
    </>
  );
}
