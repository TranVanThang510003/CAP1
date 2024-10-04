
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNewUser from './ModalAddNewUser';
import ModalEditUser from './ModalEditUser';
import _ from "lodash" 
const TableUsers=(props) => {
    
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotelUsers]=useState(0);
    const [totalPages, setTotalPages]=useState(0);
    const [isShowModalAddNew, setIsShowModalAddNew]=useState(false);
    const [isShowModalEdit, setIsShowModalEdit]=useState(false);
    const [dataUserEdit, setDataUserEdit]=useState({})

    
  const handleClose=()=>{
    setIsShowModalAddNew(false)
    setIsShowModalEdit(false)
  }

  const handleUpdateTable=(user)=>{
        setListUsers([user,...listUsers])
  }
  const handleEditUserFromModal=(user)=>{
    let cloneListUsers= _.cloneDeep(listUsers)
    let index=listUsers.findIndex(item=> item.id=== user.id)
    cloneListUsers[index].first_name=user.first_name
    setListUsers(cloneListUsers);

  }

    useEffect(()=>{
       //call api

        getUsers(1);
    },[])

    const getUsers = async(page)=>{
        let res= await fetchAllUser(page);
        if (res && res.data ){
            setTotelUsers(res.total)
            setListUsers(res.data)
            setTotalPages(res.total_pages)
        }
    } 
    const handlePageClick=(event)=>{
     getUsers(+ event.selected + 1)
    }
    const handleEditUser=(user)=>{
      setDataUserEdit(user)
     setIsShowModalEdit(true)
    }
    return(<>
    <div className='my-3 add-new'>
          <span>List Users: </span>
          <button className='btn btn-success'
          onClick={()=>setIsShowModalAddNew(true)}>add new user</button>
        </div>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {listUsers && listUsers.length>0&& listUsers.map((item,index)=>{
            return(
                <tr key={`user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button className='btn btn-warning mx-3' onClick={()=> handleEditUser(item)}>Edit</button>
                    <button className='btn btn-danger'>delete</button>
                  </td>
                </tr>
                

            )
        })}
      </tbody>
    </Table>
    <ReactPaginate
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={8}
      marginPagesDisplayed={8}
      pageCount={totalPages}
      previousLabel="< previous"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      renderOnZeroPageCount={null}
      />
      <ModalAddNewUser
      show={isShowModalAddNew}
      handleClose={handleClose}
      handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
      show={isShowModalEdit}
      dataUserEdit={dataUserEdit}
      handleClose={handleClose}
      handleEditUserFromModal={handleEditUserFromModal}
      />
    </>)
}

export default TableUsers;