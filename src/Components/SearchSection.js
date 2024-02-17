import background from "./../Assets/background1.jpg";
import search from "./../Assets/search.png";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

export default function SearchSection(props) {

  const [rerender, setRerender] = useState();

  function reRender(e){
    setRerender(e)
  }

  // console.log(rerender)
  props.render(rerender);

  return (
    <>
      <section className="sec1-search-cont">
        <Navbar render={reRender}/>
        <section className="sec1-search">
          <div>
            <p>Let us show you the best deals!🤝</p>
            <div className="searchBar">
              <input
                type="text"
                className="search"
                placeholder="Hey, what are you looking for?"
                onChange={(e)=>props.searchQuery(e.target.value)}
              ></input>
              <button>
                <img src={search} />
              </button>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
