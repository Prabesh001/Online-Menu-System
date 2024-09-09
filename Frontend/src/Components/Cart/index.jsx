import {React, useState} from 'react'
import "./style.css"
import Table from "../assets/Table.png";
import { Link } from 'react-router-dom';

function index() {
  const [items, setItem] = useState(0);

  return (
    <Link to="/table">
    <div className='cart'>
      <div className='table-relative'>
        <img src={Table} alt="Cart" className='table-img'/>
        <div className="cart-count">{items}</div>
      </div>
    </div>
    </Link>
  )
}

export default index