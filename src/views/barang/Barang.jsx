import React from "react"
import Swal from "sweetalert2"
import { connect } from "react-redux"
import { addProduct, addCategory } from "../../store/features/product/productSlice"

// Component
import TableComp from "../../component/table/table"
import ModalCreate from "./Component/ModalCreate"
import ModalUpdate from "./Component/ModalUpdate"
import Pagination from "./Component/Pagination"
import ModalDelete from "./Component/ModalDelete"
import client from "../../api/client"
import AdminLayout from "../../layouts/Admin"
import ModalBarangKadaluarsa from "./Component/ModalBarangKadaluarsa"

class Barang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: [
        'No', 'Nama Barang', 'Kategori', 'Harga Jual', 'Satuan', 'Stok'
      ],
      titleExpiredTable: [
        'No', 'Nama Barang', 'Tanggal Kadaluarsa', 'Harga', 'Satuan', 'Jumlah'
      ]
    }
    this.modalCreateRef = React.createRef();
    this.modalUpdateRef = React.createRef();
    this.modalDeleteRef = React.createRef();
    this.modalBarangKadaluarsaRef = React.createRef();
  }

  componentDidMount() {
    let product = this.props.product.data;
    let category = this.props.product.dataCategory;
    let barangKadaluarsa = this.props.product.dataBarangKadaluarsa;
    if(product.length === 0) {
      client.getProduct();
    }
    if(category.length === 0) {
      client.getCategory();
    }
    if(barangKadaluarsa.length === 0) {
      client.getBarangKadaluarsa();
    }
  }

  handleSuccess(value) {
    client.getProduct();
    client.getCategory();
    const [message, icon] = value
    this.showToast(message, icon)
  }

  handleError(value) {
    const [message, icon] = value
    this.showToast(message, icon)
  }

  showToast = (message, icon) => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })
  }

  render() {
    return (
      <AdminLayout>
        <main className="main-content main-bg">
          <div className="p-5 md:p-10 w-full grid grid-cols-12 gap-5">
            <div className="col-span-12 bg-white shadow rounded-md p-5">
              <h1 className="text-2xl text-indigo-500 font-bold">Daftar Barang</h1>
            </div>
            <div className="col-span-12 bg-white shadow rounded-md p-5">
              <div className="mb-5">
                <button 
                  className="px-4 py-2 mr-2 bg-indigo-500 text-white rounded-md focus:outline-none focus:ring hover:bg-indigo-600" 
                  onClick={() => this.modalCreateRef.current.setOpenModal(true)} 
                  >
                    Tambah Barang
                  </button>
                <input type="search" className="float-right px-3 py-2 rounded-md border border-indigo-500 focus:outline-none focus:ring" placeholder="Search" />
              </div>
              <TableComp title={this.state.title} srOnly={true}> 
                {
                  this.props.product.data.map((item, index) => {
                    return (
                      <tr key={item.id} className="hover:bg-gray-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.nama_barang}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.produk.nama_produk}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.harga_jual}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.satuan}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.stok}</td>
                        <td className="px-6 py-4 flex gap-1">
                          <button onClick={() => this.modalUpdateRef.current.setOpenModal(true, item.id)}>
                            <i className='bx bxs-edit text-green-400 text-lg' ></i>
                          </button>
                          <button onClick={() => this.modalDeleteRef.current.setOpenModal(true, item.id)}>
                            <i className='bx bx-trash text-red-500 text-lg' ></i>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
              </TableComp>
              <Pagination/>
            </div>
            <div className="col-span-12 bg-white shadow rounded-md p-5">
              <h1 className="text-2xl text-indigo-500 font-bold">Barang Kadaluarsa</h1>
            </div>
            <div className="col-span-12 bg-white shadow rounded-md p-5">
              <div className="mb-5">
                <button 
                  className="px-4 py-2 mr-2 bg-indigo-500 text-white rounded-md focus:outline-none focus:ring hover:bg-indigo-600" 
                  onClick={() => this.modalBarangKadaluarsaRef.current.setOpenModal(true)} 
                  >
                    Masukan Barang
                  </button>
                <input type="search" className="float-right px-3 py-2 rounded-md border border-indigo-500 focus:outline-none focus:ring" placeholder="Search" />
              </div>
              <TableComp title={this.state.titleExpiredTable} srOnly={false}> 
                {
                  this.props.product.dataBarangKadaluarsa.map((item, index) => {
                    return (
                      <tr key={item.id} className="hover:bg-gray-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.nama_barang}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.tgl_kadaluarsa}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.harga}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.satuan}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.jumlah}</td>
                      </tr>
                    )
                  })
                }
              </TableComp>
              <Pagination/>
            </div>
          </div>
    
          <ModalCreate 
            ref={this.modalCreateRef} 
            onSuccess={(...value) => this.handleSuccess(value)} 
            onError={(...value) => this.handleError(value)} 
          />
          <ModalUpdate
            ref={this.modalUpdateRef} 
            onSuccess={(...value) => this.handleSuccess(value)} 
            onError={(...value) => this.handleError(value)} 
          />
          <ModalDelete
            ref={this.modalDeleteRef} 
            onSuccess={(...value) => this.handleSuccess(value)} 
            onError={(...value) => this.handleError(value)} 
          />
          <ModalBarangKadaluarsa
            ref={this.modalBarangKadaluarsaRef} 
            onSuccess={(...value) => this.handleSuccess(value)} 
            onError={(...value) => this.handleError(value)} 
          />
        </main>
      </AdminLayout>
    )
  }
}

const mapStateToProps = (state) => {
  const { product } = state
  return {
    product: product
  }
}

const mapDispactToProps = (dispatch) => {
  return {
    addProduct: (value) => dispatch(addProduct(value)),
    addCategory: (value) => dispatch(addCategory(value)),
  }
}

export default connect(mapStateToProps, mapDispactToProps)(Barang);