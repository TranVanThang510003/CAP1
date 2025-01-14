import { useEffect, useState } from "react";
import { Modal,Button } from "react-bootstrap";
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { putUpdateUser } from "../services/UserService";
const ModalEditUser=(props)=>{
    const {show, handleClose, dataUserEdit, handleEditUserFromModal}=props;
    const [name,setName]=useState("");
    const [job, setJob]=useState("");
    const handleEditUser=async()=>{
         let res=await putUpdateUser(name, job)
         if(res &&res.updateAt){
          handleEditUserFromModal({first_name:name, id:dataUserEdit.id})  
         handleClose();
         toast.success("TC")
         }
      
    }
    useEffect(()=>{
       if(show){
        setName(dataUserEdit.first_name)
       }
    },[dataUserEdit])
    return(
        <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="body-add-new">
                <div className="mb-3">
                    <lable className="form-lable">Name</lable>
                    <input type="text" class="form-control" value={name} onChange={(event)=>{setName(event.target.value)}} placeholder="Enter your name"/>
                </div>
                <div className="mb-3">
                    <lable className="form-lable">Job</lable>
                    <input type="text" class="form-control" value={job} onChange={(event)=>{setJob(event.target.value)}} placeholder="Enter your job"/>
                </div>
            </div>
       
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}
export default ModalEditUser;