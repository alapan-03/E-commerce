import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function BodySec3(props) {
const [datum, setDatum] = useState(null);

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
  }, []);


  const filteredPrice = datum?.products.filter(
    (dataa)=>  dataa.price >= props.lowPrice && dataa.price <= props.highPrice
  )


  //   datum.products.images && console.log(datum?.products?.images[0]);

  if (!datum) return <h1>No data</h1>



return (
    <>

    <div className="phones">
    <p className="smartphone-txt">Groceries</p>

<Swiper
  navigation={windowWidth<550 ? false : true}
            modules={[Navigation]}
            slidesPerView={windowWidth>1000? 4 : windowWidth>550 ? 2: 1}
  spaceBetween={40}
  className="mySwiper"
  >

{filteredPrice && (
  filteredPrice.map((dataa) => (
dataa.category === "groceries" && 
(
<SwiperSlide key={dataa.id}>
<div className="sw-items sw-items-grocery">
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
))
)
} 
  
</Swiper>


<p className="smartphone-txt">Home Decoration</p>

<Swiper
  navigation={windowWidth<550 ? false : true}
            modules={[Navigation]}
            slidesPerView={windowWidth>1000? 4 : windowWidth>550 ? 2: 1}
  spaceBetween={40}
  className="mySwiper"
  >

{filteredPrice && (
  filteredPrice.map((dataa) => (
dataa.category === "home-decoration" && 
(
<SwiperSlide key={dataa.id}>
<div className="sw-items sw-items-grocery">
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
))
)
} 
  
</Swiper>
</div>
    </>
)
}