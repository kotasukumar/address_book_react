import React, {useState, useEffect,} from 'react'
import './Form.css'
import { Link, useParams } from 'react-router-dom';
import BookServices from '../../Service/BookService';
import logo from '../../Assests/address-book-icon.png' ;


const Form = (props) =>{

    /* Declaring the intial data */
    let startValue = {
    name: "",
    contact: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    isUpdate: false,
    }

    /* Declaring states array */
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
    
    /* Declaring cities array */
    let cities = [
        {name:"Andhra Pradesh",city:["Amaravathi", "Chittoor"]},
        {name:"Tamil Nadu",city:["Chennai", "Maduri"]},
        {name:"Kerala",city:["Munnar", "Kochi"]},
        {name:"Karnataka",city:["Banglore", "Mysore"]},
        {name:"Maharastra",city:["Mumbai", "Pune"]},
        {name:"West Bengal",city:["Kolkata", "Dum Dum"]},
        {name:"Rajeshthan",city:["Jaipur", "Kota"]},
        {name:"Bihar",city:["Panaji"]},
    ]

    const [formValue, setForm] = useState(startValue);
    const params = useParams();
    const [state, setState] = useState([]);
    const [cityName, setCity] = useState([]);

    /* Setting states to the form */
    useEffect(() => {
        setState(states);
        console.log(states);  
    },[]);
    
    /* Finding list of cities using the selected state */
    const handleCity = (event) => {
        const citiesList = cities.find(cityName => cityName.name === event.target.value).city;
        setCity(citiesList);
        console.log(citiesList);
        onNameChange(event);
    }

    /* If we click on reset, it should clear all the data in form */
    const onReset = () => {
        setForm({
            ...startValue, id: formValue.id, isUpdate: formValue.isUpdate 
        });
    };

    /* Ability to handle change in values */
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

    /* 
    Ability to get contact using id for updating data
    */
    const getPersonId = (employeeId) => {
        console.log("Data Found")
        BookServices.getPersonById(employeeId).then((data)=>{
        let obj = data.data.contactData;
        console.log(obj);
        setData(obj);
        });
    };
        
    /* 
    Setting the form by getting contact for updating data*/
    const setData = (object) => {
        const citiesList = cities.find(cityName => cityName.name === object.state).city;
        setCity(citiesList);
        console.log(object.city);
             setForm({
               ...formValue,
               ...object,
               id: object.id,
               name:object.name,
               contact: object.mobileNumber,
               address: object.address,
               city: object.city,
               state: object.state,
               zip: object.pinCode,
               isUpdate :true,  //setting isUpdate to true to perform upadate
               
             });
    };


    /* 
    Abilty to save the details entered in the form */
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
            console.log("is update" + data);
            alert("update successfull!");
              
        });
    } else {
        BookServices.addPerson(object).then((response) => {
            console.log(response);
            alert("Data Added!!")
          })          
        }    
    }

/*===================================================================================================
                                HTML for address form
====================================================================================================== */

  return (
    <div>       
  <div className="form-content">
{/* ----------------------------- Declaring body header ------------------------------------------ */}
      <div className="form-head">       
          <span> PERSON ADDRESS FORM......</span>          
        <span id='img'>
            <Link to="/home">
            <img className='image' width = "40" height = "40" src={logo} alt="logo"/></Link>
        </span>
      </div> 

{/* ------------------------------ Name label ---------------------------------------------------- */}             
      <form className="form" action="#" onSubmit={save}>
          <label className="label_text" htmlFor="name">Full Name</label>
          <div className="row-content">
              <input className="input" type="text" id="name" name="name" placeholder="Enter Name" 
              onChange={onNameChange} value={formValue.name} required/>               
          </div>

{/* ------------------------------ Phone Number label ---------------------------------------------------- */}   
          <label className="label_text" htmlFor="phone">Phone Number</label>
          <div className="row-content">
              <input className="input" type="text" id="contact" name="contact" placeholder="Enter Phone Number" 
              onChange={onNameChange} value={formValue.contact} required/>           
          </div>

{/* ------------------------------ Address label ---------------------------------------------------- */}   
          <label className="label_text" htmlFor="address">Address</label>
          <div className="row-content">
              <textarea className="input" name="address" id="address" rows="4" placeholder="Enter Address" 
              onChange={onNameChange} value={formValue.address} ></textarea>            
          </div>

{/* ------------------------------ Drop down for States ---------------------------------------------------- */}   
          <div className="row">
              <div className="input-content">
                  <label className="label_text" htmlFor="state">State</label>
                  <div className="row-content">
                    <select id="state" className='input' name="state" onChange={(deatils) => handleCity(deatils)} value={formValue.state}>
                        <option value="" >Select State</option>
                        {
                            state && 
                            state !== undefined ?
                            state.map((state,index) => {
                            return(
                              <option key={index} value={state.name}>{state.name}</option>                         
                            )
                        })
                        :"No State"                   
                    }
                    </select>
                  </div>
              </div>
{/* ------------------------------ Drop down for city ---------------------------------------------------- */}   
              <div className="input-content">
                  <label className="label_text" htmlFor="city">City</label>
                  <div className="row-content">
                      <select id="city" className='input' name="city" onChange={onNameChange} value={formValue.city}>
                        <option value="">Select City</option>handleCity();
                        {                           
                            cityName && 
                            cityName !== undefined ?
                            cityName.map((city,index) => {
                                return(
                                    <option key={index} >{city}</option>                                   
                                )
                            })
                            :"No City"
                        }
                        </select>
                  </div>
              </div>

{/* ------------------------------ Zip label ---------------------------------------------------- */}   
              <div className="input-content">
                  <label className="label_text" htmlFor="zip">ZipCode</label>
                  <div className="row-content">
                      <input className="input" type="text" id="zip" name="zip" placeholder="Enter Zip Code" 
                      onChange={onNameChange} value={formValue.zip} required/>
                  </div>
              </div>
          </div>

{/* ------------------------------ Add and reset button ---------------------------------------------------- */}   
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