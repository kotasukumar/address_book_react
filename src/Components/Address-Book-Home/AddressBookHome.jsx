import React, { Component} from 'react'
import './Home.css'
import {Link} from 'react-router-dom'
import add from '../../Assests/add_person.png';
import BookServices from '../../Service/BookService';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

class Home extends Component {
    /*============================================================================================ */
    // navigate = useNavigate();
    constructor(props) {
        super(props);
        this.state = {
            addressbook: [],
            allconatctArray: []
        };
    }

    componentDidMount() {
        this.fetchData();
        // console.log(this.props)
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

    sortByCity() {
        BookServices.sortByCity().then((response) => {
            this.setState({ addressbook: response.data.data });
        });
    }
    sortByState() {
        BookServices.sortByState().then((response) => {
            this.setState({ addressbook: response.data.data });
        });
    }
    
    /* delete = (personId) => {
        BookServices.deletePerson(personId);
        window.location.reload();
        this.fetchData();
    }; */

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

    update = (id) => {       
        let navigate = useNavigate();
        navigate(`/AddressBookForm/${id}`);
        console.log(id);
     };
    /*============================================================================================ */
    render() {
  return (
    <div>    
    <div className="main-content">
        <div className="header-content">
            <div className="person-detail-text">
                Person Details
            </div>
            <Link to="/form">
                <img width='30' height='30' src={add} alt='/'/></Link>
        </div>
    
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
                            <td><button onClick={() => this.update(book.id)} >Edit</button>
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