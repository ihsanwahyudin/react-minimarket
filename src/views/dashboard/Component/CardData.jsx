import { Fragment, useState, useEffect } from "react"
import axios from 'axios'

export default function CardData() {
  const [data, setData] = useState();
  useEffect(() => {
    if(typeof data === 'undefined') {
      const token = localStorage.getItem('jwt');
      axios({
        method: 'GET',
        baseURL: 'http://127.0.0.1:8000/api/report/inoutcome',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        if(typeof data === 'undefined') {
          setData(res.data)
        }
      })
    }
  })

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <Fragment>
      <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white shadow rounded-md p-5 grid grid-cols-6 gap-2">
        <div className="col-span-2 flex justify-center items-center">
          <span className="p-1 bg-green-500 rounded-md shadow shadow-blue-400 flex justify-center items-center">
            <i className='bx bx-log-in-circle text-white text-6xl'></i>
          </span>
        </div>
        <div className="col-span-4">
          <h2 className="text-2xl text-gray-700">Uang Masuk</h2>
          <div className="text-xl text-gray-500">Rp. { typeof data !== 'undefined'  ? formatNumber(data.inCome) : 0}</div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white shadow rounded-md p-5 grid grid-cols-6 gap-2">
        <div className="col-span-2 flex justify-center items-center">
          <span className="p-1 bg-red-500 rounded-md shadow shadow-blue-400 flex justify-center items-center">
            <i className='bx bx-log-out-circle text-white text-6xl'></i>
          </span>
        </div>
        <div className="col-span-4">
          <h2 className="text-2xl text-gray-700">Uang Keluar</h2>
          <div className="text-xl text-gray-500">Rp. { typeof data !== 'undefined' ? formatNumber(data.outCome) : 0}</div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white shadow rounded-md p-5 grid grid-cols-6 gap-2">
        <div className="col-span-2 flex justify-center items-center">
          <span className="p-1 bg-indigo-500 rounded-md shadow shadow-blue-400 flex justify-center items-center">
            <i className='bx bx-trending-up text-white text-6xl'></i>
          </span>
        </div>
        <div className="col-span-4">
          <h2 className="text-2xl text-gray-700">Profit</h2>
          <div className="text-xl text-gray-500">Rp. { typeof data !== 'undefined' ? data.outCome - data.inCome >= 0 ? formatNumber(data.outCome - data.outCome) : 0 : 0}</div>
        </div>
      </div>
    </Fragment>
  )
}