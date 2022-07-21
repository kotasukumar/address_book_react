import React, { Component} from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
import add from '../../Assests/add_person.png';
import BookServices from '../../Service/BookService';
import { toast } from 'react-toastify';
import { NavLink } from "react-router-dom";
import logout from '../../Assests/logout.webp';

class Home extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            addressbook: [],
            allconatctArray: []
        };
    }

    componentDidMount() {
        this.fetchData();  //calling fetch data function to get all addressess
    }

	fetchData = () => {
        BookServices.getAll().then((response) => {
            this.setState({ 
                addressbook: response.data.contactData,
                allconatctArray:response.data.contactData
            });
            console.log(this.state.addressbook);
            console.log(response);
        })
        .catch((err) => {
          toast.error("Something went wrong, while getting all the records", err);
          console.log(err)
        });
    };

    /* 
    Calling short by city in bookservice to perform sorting of cities
     */
    sortByCity() {
        BookServices.sortByCity().then((response) => {
            this.setState({ addressbook: response.data.contactData });
        });
    }

    /*
     Calling short by state in bookservice to perform sorting of states 
     */
    sortByState() {
        BookServices.sortByState().then((response) => {
            this.setState({ addressbook: response.data.contactData });
        });
    }

    /* 
    Passing contact id to service layer to delete the particular contact 
    */
    delete = (employeeId) => {   
        var answer = window.confirm("Data once deleted cannot be restored!! Do you wish to continue ?");
        if(answer === true){
          BookServices.deletePerson(employeeId)
            alert("Data deleted successfully!!");
            window.location.reload();
            this.fetchData();
        }
        else{
          window.location.reload();
        }
  };

/*===================================================================================================
                                HTML for Home page
====================================================================================================== */
    render() {
  return (
    <div>    
    <div className="main-content">
        <div className="header-content">
{/* ----------------------------- Declaring body header ------------------------------------------ */}
            <div className="person-detail-text">
                Person Details
            </div>
            <Link to="/login">
                <img width='60' height='60' src={logout} alt='/'/></Link>
            <Link to="/form">
                <img width='30' height='30' src={add} alt='/'/></Link>
        </div>
    
{/* ----------------------------- Declaring table content------------------------------------------ */}
    <table id="table-display" className="table">
    <thead><tr>            
            <th scope="col" >Name</th>
            <th scope="col" >Contact</th>
            <th scope="col" >Address</th>
            <th scope="col" onClick={()=> this.sortByCity()}>City</th>
            <th scope="col" onClick={()=> this.sortByState()}>State</th>
            <th scope="col" >Zip</th>
            <th scope="col" >Action</th>
        </tr></thead>
        <tbody>
            {this.state.addressbook && this.state.addressbook.map((book,index) => (
                        <tr key={`${index}`}>                             
                            <td>{book.name}</td>
                            <td>{book.mobileNumber}</td>
							<td>{book.address}</td>
							<td>{book.city}</td>
                            <td>{book.state}</td>
                            <td>{book.pinCode}</td>
                            <td><NavLink to={`/AddressBookForm/${book.id}`}><button>Edit</button></NavLink>
                            <button onClick={() => this.delete(book.id)} >Delete</button></td>
                        </tr>
    ))}
                </tbody>       
            </table>

        </div>
    </div>
  )}
}
export default Home;