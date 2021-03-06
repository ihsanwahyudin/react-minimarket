import React, { useState } from "react"

// Component
import Table from "../../component/table/table"
// import Modal from "../../component/modal/modal"
import ModalLarge from "../../component/modal/modalLarge"
import { useSelector } from "react-redux"


const ProductList = () => {
  const title = [
    'No', 'Nama Produk', 'Harga', 'Kategori', 'satuan', 'stok'
  ]
  const title2 = title.slice(1, 6);
  title2.push('Jumlah Tambahan');
  const [openModalLarge, setOpenModalLarge] = useState(false)
  const [selectedProduct] = useState([]);

  const product = useSelector(state => state.product.data);

  function findProductById(id) {
    const dataProduct = selectedProduct.find(x => x.id === id);
    if (typeof dataProduct === 'undefined') {
      selectedProduct.push(product.find(x => x.id === id))
      setOpenModalLarge(false);
    } else {
      alert('barang sudah ada');
    }
  }
  
  const storeData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    for(let value of formData) {
      console.info(value);
    }
  }

  return (
    <main className="main-content main-bg">
      <form action="" onSubmit={() => storeData}>
        <div className="p-5 md:p-10 w-full grid grid-cols-12 gap-5">
          <div className="col-span-12 bg-white shadow rounded-md p-5">
            <div className="w-full grid grid-cols-12 gap-5">
              <div className="col-span-4">
                <label className="block text-gray-600 mb-1">Nama Pemasok</label>
                <input type="text" name="nama_pemasok" className="border border-blue-400 w-full p-2 rounded-md focus:outline-none focus:ring" autoFocus />
              </div>
              <div className="col-span-4">
                <label className="block text-gray-600 mb-1">Nomor Telepon</label>
                <input type="text" name="no_telp" className="border border-blue-400 w-full p-2 rounded-md focus:outline-none focus:ring" autoFocus />
              </div>
              <div className="col-span-4">
                <label className="block text-gray-600 mb-1">Tanggal Masuk</label>
                <input type="date" name="tanggal_masuk" className="border border-blue-400 w-full p-2 rounded-md focus:outline-none focus:ring" autoFocus />
              </div>
              <div className="col-span-4">
                <label className="block text-gray-600 mb-1">Kota</label>
                <input type="text" name="kota" className="border border-blue-400 w-full p-2 rounded-md focus:outline-none focus:ring" autoFocus />
              </div>
              <div className="col-span-4">
                <label className="block text-gray-600 mb-1">Total</label>
                <input type="text" name="total" className="border border-blue-400 w-full p-2 rounded-md focus:outline-none focus:ring" autoFocus />
              </div>
              <div className="col-span-8">
                <label className="block text-gray-600 mb-1">Alamat</label>
                <textarea name="alamat" className="border border-blue-400 w-full p-2 rounded-md focus:outline-none focus:ring" autoFocus></textarea>
              </div>
            </div>
          </div>
          <div className="col-span-12 bg-white shadow rounded-md p-5">
            <div className="mb-5">
              <button className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring hover:bg-blue-600" onClick={() => setOpenModalLarge(true)}>Barang Lama</button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring hover:bg-blue-600">Barang Baru</button>
            </div>
            <Table title={title2} srOnly={false}>
              {
                selectedProduct.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.nama_barang}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rp. {item.harga_jual}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.produk.nama_produk}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.satuan}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.stok}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                        <input type="hidden" name={`produk[${index}][nama_barang]`} defaultValue={item.nama_barang} />
                        <input type="hidden" name={`produk[${index}][harga_jual]`} defaultValue={item.harga_jual}/>
                        <input type="hidden" name={`produk[${index}][nama_produk]`} defaultValue={item.nama_produk}/>
                        <input type="hidden" name={`produk[${index}][satuan]`} defaultValue={item.satuan} />
                        <input type="hidden" name={`produk[${index}][stok]`} defaultValue={item.stok}/>
                        <input type="number" className="px-2 py-1 text-black border border-blue-500 rounded-md w-16 text-center focus:outline-none focus:ring" name={`produk[${index}][jumlah]`} id="" defaultValue={0} />
                      </td>
                    </tr>
                  )
                })
              }
            </Table>
            <div className="mt-5">
              <button className="float-right px-4 py-2 mr-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring hover:bg-green-600">Simpan</button>
            </div>
          </div>
        </div>
      </form>

      <ModalLarge isOpen={openModalLarge} onCloseModal={() => setOpenModalLarge(false)}>
        <Table title={title} srOnly={true}> 
          {
            product.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.nama_barang}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rp. {item.harga_jual}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.produk.nama_produk}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.satuan}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.stok}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                    <button className="float-right px-4 py-2 mr-2 bg-indigo-500 text-white rounded-md focus:outline-none focus:ring hover:bg-indigo-600" onClick={() => findProductById(item.id)}>Pilih</button>
                  </td>
                </tr>
              )
            })
          }
        </Table>
      </ModalLarge>
    </main>
  )
}

export default ProductList;