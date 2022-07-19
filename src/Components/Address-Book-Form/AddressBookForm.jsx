import React, {useState, useEffect} from 'react'
import './Form.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import BookServices from '../../Service/BookService';
import logo from '../../Assests/address-book-icon.png' ;
import logout from '../../Assests/logout.webp';


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
    let states = [
        {id:"Andhra Pradesh",name:"Andhra Pradesh"},
        {id:"Tamil Nadu",name:"Tamil Nadu"},
        {id:"Kerala",name:"Kerala"},
        {id:"Karnataka",name:"Karnataka"},
        {id:"Maharastra",name:"Maharastra"},
        {id:"West Bengal",name:"West Bengal"},
        {id:"Rajeshthan",name:"Rajeshthan"},
        {id:"Bihar",name:"Bihar"}
    ]
    
    let cities = [
        {id:"1",stateId:"Andhra Pradesh",name:["Amaravathi", "Chittoor"]},
      /*   {id:"2",stateId:"Andhra Pradesh",name:"Chittoor"}, */
        {id:"3",stateId:"Tamil Nadu",name:"Chennai"},
        {id:"4",stateId:"Tamil Nadu",name:"Maduri"},
        {id:"5",stateId:"Kerala",name:"Munnar"},
        {id:"6",stateId:"Kerala",name:"Kochi"},
        {id:"7",stateId:"Karnataka",name:"Banglore"},
        {id:"8",stateId:"Karnataka",name:"Mysore"},
        {id:"9",stateId:"Maharastra",name:"Mumbai"},
        {id:"10",stateId:"Maharastra",name:"Pune"},
        {id:"11",stateId:"West Bengal",name:"Kolkata"},
        {id:"12",stateId:"West Bengal",name:"Dum Dum"},
        {id:"13",stateId:"Rajeshthan",name:"Jaipur"},
        {id:"14",stateId:"Rajeshthan",name:"Kota"},
        {id:"15",stateId:"Bihar",name:"Patna"},
        {id:"16",stateId:"Bihar",name:"Gaya"},
    ]
    
    const [formValue, setForm] = useState(startValue);
    const [formError, setFormError] = useState(initialError);
    const params = useParams();
    const [ state, setState] = useState([]);
    const [ city, setCity] = useState([]);

useEffect(()=>{
    setState(states);
    
    
},[])
    
const handleCity = (event) => {
    const dt = cities.filter(x => x.stateId === event.target.value);
    setCity(dt);
    console.log(dt);
    onNameChange(event);
    
}

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
        console.log(params.id)
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
               contact: obj.mobileNumber,
               address: obj.address,
               city: obj.city,
               state: obj.state,
               zip: obj.pinCode,
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

/* useEffect(() => {
    validateData();
});  */

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

    if (!formValue.contact.match('^[0-9]{10}$')) {
        error.contact = "Invalid PHONE NUMBER"
    }
    else {
        error.contact = "";
    }

    if (!formValue.zip.match('^[0-9]{5}$')) {
        error.zip = "Invalid ZIP CODE";
    }
    else {
        error.zip = "";
    }


    setFormError(error);
    
}
/*=================================================================================================== */

  return (
    <div>       
  <div className="form-content">
      <div className="form-head">
          <span> PERSON ADDRESS FORM......</span>          
        <span id='img'>
            <Link to="/home">
            <img className='image' width = "40" height = "40" src={logo} alt="logo"/></Link>
            <Link to="/login">
                <img width='60' height='60' src={logout} alt='/'/></Link></span>
        </div>    
      <form className="form" action="#" onSubmit={save}>
          <label className="label_text" htmlFor="name">Full Name</label>
          <div className="row-content">
              <input className="input" type="text" id="name" name="name" placeholder="Enter Name" 
              onChange={onNameChange} value={formValue.name} required/>
               <div className="error">{formError.name}</div>
          </div>

          <label className="label_text" htmlFor="phone">Phone Number</label>
          <div className="row-content">
              <input className="input" type="text" id="contact" name="contact" placeholder="Enter Phone Number" 
              onChange={onNameChange} value={formValue.contact} required/>
              <div className="error">{formError.contact}</div>
          </div>

          <label className="label_text" htmlFor="address">Address</label>
          <div className="row-content">
              <textarea className="input" name="address" id="address" rows="4" placeholder="Enter Address" 
              onChange={onNameChange} value={formValue.address} ></textarea>
              <div className="error">{formError.address}</div>
          </div>

          <div className="row">
              <div className="input-content">
                  <label className="label_text" htmlFor="state">State</label>
                  <div className="row-content">
                    <select id="state" className='input' name="state" onChange={(e) => handleCity(e)} value={formValue.state}>
                        <option value="" >Select State</option>
                        {
                            state && 
                            state !== undefined ?
                            state.map((ctr,index) => {
                            return(
                                <option key={index} value={ctr.name}>{ctr.name}</option>
                                
                            )
                        })
                        :"No State"

                    }
                    </select>

                  </div>
              </div>
              <div className="input-content">
                  <label className="label_text" htmlFor="city">City</label>
                  <div className="row-content">
                      <select id="city" className='input' name="city" onChange={onNameChange} value={formValue.city}>
                        <option value="">Select City</option>handleCity();
                        {
                            
                            city && 
                            city !== undefined ?
                            city.map((ctr,index) => {
                                return(
                                    <option key={index} value={ctr.name}>{ctr.name}</option>
                                    
                                )
                            })
                            :"No City"
                        }
                        </select>
                  </div>
              </div>
              <div className="input-content">
                  <label className="label_text" htmlFor="zip">ZipCode</label>
                  <div className="row-content">
                      <input className="input" type="text" id="zip" name="zip" placeholder="Enter Zip Code" 
                      onChange={onNameChange} value={formValue.zip} required/>
                      <div className="error">{formError.zip}</div>
                  </div>
              </div>
          </div>
          <div className="buttonParent">
              <div className="add-reset">
                <button className='button' variant="contained" size="large" type="submit" id="addButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                <button className='button' variant="contained" size="large" type="reset" id="resetButton" onClick={onReset}>Reset</button>
              </div>
          </div>
      </form>
  </div>
  
    </div>
  )
}

export default Form;