import React, {useState, useEffect} from 'react'
import './Form.css'
import { Link, useParams } from 'react-router-dom';
import BookServices from '../../Service/BookService';
import logo from '../../Assests/address-book-icon.png' 


const Form = (props) =>{

/*=================================================================================================== */
    let startValue = {
    name: "",
    contact: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    isUpdate: false,
    }
    let initialError = {
    name: '',
    address: '',
    contact: '',
    zip: '',
    }
    const [formValue, setForm] = useState(startValue);
    const [formError, setFormError] = useState(initialError);
    const params = useParams();

const onReset = () => {
    setForm({
        ...startValue, id: formValue.id, isUpdate: formValue.isUpdate 
    });
};

const onNameChange = async (event) => {
    setForm({ ...formValue, [event.target.name]: event.target.value });
    console.log('value for', event.target.name, event.target.value);
}

    useEffect (() => {
        //console.log(params.id)
        if (params.id){
            getPersonId(params.id);
            console.log(params.id);
        }
    },[params.id]); 

const getPersonId = (employeeId) => {
    console.log("Data Found")
    BookServices.getPersonById(employeeId).then((data)=>{
        let obj = data.data.contactData;
        console.log(obj);
        setData(obj);
        });
    };
        
const setData = (obj) => {
    console.log()
             setForm({
               ...formValue,
               ...obj,
               id: obj.id,
               name:obj.name,
               contact: obj.contact,
               address: obj.address,
               city: obj.city,
               state: obj.state,
               zip: obj.zip,
               isUpdate :true,
             });
           };

const save = async (event) => {
    event.preventDefault();
    
    let object = {
        id: formValue.id,
        name: formValue.name,
        contact: formValue.contact,
        address: formValue.address,
        city: formValue.city,
        state: formValue.state,
        zip: formValue.zip
    };
    
    if(formValue.isUpdate) {
        BookServices.updatePerson(params.id,object)
        .then((data) => {
            var value = window.confirm(data);
            if(value === true){
                alert("update successfull!");
                this.props.history.push("");
              }else{
                  window.location.reload();
              }
        });
    } else {
        BookServices.addPerson(object).then((response) => {
            console.log(response);
            alert("Data Added!!")
          })          
    }    
    // window.location.reload(); 
}

const validateData = () => {
    let error = formError;
    if (!formValue.name.match('^[A-Z]{1}[a-zA-Z\\s]{2,}$')) {
        error.name = "Invalid NAME";
    }
    else {
        error.name = "";
    }

    if (!formValue.address.match('^[a-zA-Z0-9-, ]+$')){
        error.address = "Invalid ADDRESS";
    }
    else {
        error.address = "";
    }


    setFormError(error);
}

useEffect(() => {
    validateData();
});
/*=================================================================================================== */

  return (
    <div>       
  <div className="form-content">
      <div className="form-head">
          <span> PERSON ADDRESS FORM </span>          
        <span id='img'>
            <Link to="/home">
            <img width = "30" height = "30" src={logo} alt="logo"/></Link></span>
        </div>    
      <form className="form" action="#" onSubmit={save}>
          <label className="label text" htmlFor="name">Full Name</label>
          <div className="row-content">
              <input className="input" type="text" id="name" name="name" placeholder="Enter Name" 
              onChange={onNameChange} value={formValue.name} required/>
               <div className="error">{formError.name}</div>
          </div>

          <label className="label text" htmlFor="phone">Phone Number</label>
          <div className="row-content">
              <input className="input" type="text" id="contact" name="contact" placeholder="Enter Phone Number" 
              onChange={onNameChange} value={formValue.contact} required/>
              <div className="error">{formError.contact}</div>
          </div>

          <label className="label text" htmlFor="address">Address</label>
          <div className="row-content">
              <textarea className="input" name="address" id="address" rows="4" placeholder="Enter Address" 
              onChange={onNameChange} value={formValue.address} ></textarea>
              <div className="error">{formError.address}</div>
          </div>

          <div className="row">
              <div className="input-content">
                  <label className="label text" htmlFor="city">City</label>
                  <div className="row-content">
                      <select className="input" name="city" id="city" value={formValue.city} onChange={onNameChange} >
                          <option value="">City</option>
                          <option value="Mumbai">Mumbai</option>
                                    <option value="Solapur">Solapur</option>
                                    <option value="Pune">Pune</option>
                                    <option value="Chennai">Chennai</option>
                                    <option value="Kolkata">Kolkata</option>
                                    <option value="Jaipur">Jaipur</option>
                      </select>
                  </div>
              </div>
              <div className="input-content">
                  <label className="label text" htmlFor="state">State</label>
                  <div className="row-content">
                      <select className="input" name="state" id="state" onChange={onNameChange} value={formValue.state}>
                          <option value="">State</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                      </select>
                  </div>
              </div>
              <div className="input-content">
                  <label className="label text" htmlFor="zip">ZipCode</label>
                  <div className="row-content">
                      <input className="input" type="text" id="zip" name="zip" placeholder="Enter Zip Code" 
                      onChange={onNameChange} value={formValue.zip} required/>
                      <div className="error">{formError.zip}</div>
                  </div>
              </div>
          </div>
          <div className="buttonParent">
              <div className="add-reset">
                <button variant="contained" size="large" type="submit" id="addButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                <button variant="contained" size="large" type="reset" id="resetButton" onClick={onReset}>Reset</button>
              </div>
          </div>
      </form>
  </div>
  
    </div>
  )
}

export default Form;