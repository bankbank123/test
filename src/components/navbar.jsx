import '../css/Navbar.css'
import Logo from '../assets/logo.png'
import search from '../assets/nav-icon-search.png'
import menu from '../assets/nav-drop-menu.png'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {

  // eslint-disable-next-line no-unused-vars
  const [searchValue, setSearchValue] = useState("")

  const handleMouseClick = () => {
    const tooltip = document.querySelector(".nav-tooltip");
    const tooltipButton = document.getElementById("tooltip-button");
    if (tooltip.style.display === "block") return tooltip.style.display = "none"
    tooltip.style.display = "block";
    document.addEventListener("click", function (e) {
      // Close the tooltip if clicked outside
      if (e.target !== tooltipButton && e.target !== tooltip) {
        tooltip.style.display = "none";
      }
    })
  };

  const handleClickInput = () => {
    const input_box = document.getElementById("nav-search-text")
    setSearchValue(input_box.value)
  }

  const handleClickSearch = () => {
    const input_box = document.querySelector(".nav-search");
    const web_logo = document.querySelector(".nav-logo");

    if (input_box.style.display === "none" || input_box.style.display === "") {
      input_box.style.display = "flex";
      input_box.style.width = "300px"
      input_box.style.margin = "20px"
      web_logo.style.display = "none";
    } else {
      input_box.style.display = "none";
      web_logo.style.display = "";
    }
  };
  console.log(searchValue)
  useEffect(() => {
    const input_box = document.querySelector(".nav-search");

    const handleResize = () => {
      if (window.innerWidth > 426) {
        input_box.style.display = "flex";
      } else {
        input_box.style.display = "none";
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="nav-container">
        <img src={Logo} alt="" className='nav-logo' />
        <div className="nav-search">
          <div className="nav-container-icon" id="button-search" onClick={handleClickInput}>
            <img src={search} alt="" className='nav-icon-search' />
          </div>
          <input type="text" name="" className='nav-input' id="nav-search-text" />
        </div>
        <div className="dropdown-menu">
          <img src={menu} alt="" className='nav-menu-icon'
            onClick={handleMouseClick} id='tooltip-button' />
          <div className="nav-tooltip">
            <ul>
              <li className='hidden-search' id="search-button" onClick={handleClickSearch}><img src={search} alt="" className='nav-icon-search' /><span className="search-text">search</span></li>
              <li><Link to="/login">option1</Link></li>
              <li><a href="#">Option 2</a></li>
              <li><a href="#">Option 3</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
