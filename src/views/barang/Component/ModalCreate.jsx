import axios from "axios";
import { forwardRef ,useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";
// Component
import Modal from "../../../component/modal/modal"

const ModalCreate = forwardRef((props, ref) => {

  const [open, setOpen] = useState(false)
  const [errorForm, setErrorForm] = useState({})
  const category = useSelector(state => state.product.dataCategory)

  const storeData = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const token = localStorage.getItem('jwt');
    axios({
      method: 'POST',
      baseURL: 'https://backend-minimarket.herokuapp.com/api/product',
      data: formData,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      props.onSuccess(res.data.message, 'success');
      setErrorForm({});
      setOpen(false);
    })
    .catch(err => {
      console.info(err.response.data)
      setErrorForm(err.response.data.errors)
      props.onError(err.response.data.message, 'error');
    })
  }

  useImperativeHandle(ref, () => ({
    setOpenModal(boolean) {
      setOpen(boolean)
    }
  }))

  return (
    <Modal isOpen={open} onCloseModal={() => setOpen(false)}>
      <form onSubmit={storeData}>
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="mb-2">
            <h2 className="text-2xl text-indigo-500 font-bold">Barang Baru</h2>
          </div>
          <div className="mb-2">
            <label htmlFor="nama_barang" className="block text-sm text-gray-700">Nama Barang</label>
            <input type="text" name="nama_barang" id="nama_barang" className={`w-full px-3 py-2 border rounded-md focus:outline-none ${errorForm.nama_barang ? 'border-red-500' : 'border-indigo-500'}`} />
            <span className="text-sm text-red-500">{errorForm.nama_barang}</span>
          </div>
          <div className="mb-2">
            <label htmlFor="nama_produk" className="block text-sm text-gray-700">Kategori</label>
            <select name="nama_produk" id="nama_produk" className={`w-full px-3 py-2 border rounded-md focus:outline-none ${errorForm.nama_produk ? 'border-red-500' : 'border-indigo-500'}`}>
              {
                category.map(item => {
                  return (
                    <option key={item.id} value={item.id}>{item.nama_produk}</option>
                    )
                  })
              }
            </select>
            <span className="text-sm text-red-500">{errorForm.nama_produk}</span>
          </div>
          <div className="mb-2">
            <label htmlFor="harga_jual" className="block text-sm text-gray-700">Harga Jual</label>
            <input type="text" name="harga_jual" id="harga_jual" className={`w-full px-3 py-2 border rounded-md focus:outline-none ${errorForm.harga_jual ? 'border-red-500' : 'border-indigo-500'}`} />
            <span className="text-sm text-red-500">{errorForm.harga_jual}</span>
          </div>
          <div className="mb-2">
            <label htmlFor="satuan" className="block text-sm text-gray-700">Satuan</label>
            <input type="text" name="satuan" id="satuan" className={`w-full px-3 py-2 border rounded-md focus:outline-none ${errorForm.satuan ? 'border-red-500' : 'border-indigo-500'}`} />
            <span className="text-sm text-red-500">{errorForm.satuan}</span>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Submit
          </button>
          <button
            type="reset"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
})

export default ModalCreate