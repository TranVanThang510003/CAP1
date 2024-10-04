import { useState } from "react";
import { Modal,Button } from "react-bootstrap";
import { postCreateUser } from "../services/UserService";
import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const ModalAddNewUser=(props)=>{
    const {show, handleClose, handleUpdateTable}=props;
    const [name,setName]=useState("");
    const [job, setJob]=useState("");
    const handleSaveUser=async()=>{
        let res=await postCreateUser(name,job);
        if(res && res.id){
          //succeed
          handleClose()
          setName("")
          setJob("")
          toast.success("A user is created succeed!")
          handleUpdateTable({first_name: name, id:res.id})
        }else{
          //error
          toast.error("Error...")
        }
    }
    return(
        <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
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
          <Button variant="primary" onClick={handleSaveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}
export default ModalAddNewUser;