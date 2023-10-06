import React, { useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon as FA} from '@fortawesome/react-fontawesome';
import { faPhone,faEnvelope,faMapMarker,faUser, faFlag,  faBuilding, faContactCard, faNetworkWired, faArrowCircleLeft, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import logo from "../images/logo.png";
const defaultForm = {
  name: "",
  email: "",
  phone: "",
  linkedin: "",
  country: "",
  state: "",
  city: "",
  pin: "",
};
export default function Register(props) {
  const {updateEmail ,updateProfile} = props;
  const [form, setForm] = useState(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const updateForm = (field, value) => {
    setForm((prevForm) => {
      if(field==="email"){
        updateEmail(value);
      }
      return {
        ...prevForm,
        [field]: value,
      };
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(form);
    
    if (
      form.name === "" ||
      form.email === "" ||
      form.phone === "" ||
      form.linkedin === "" ||
      form.country === "" ||
      form.state === "" ||
      form.city === "" ||
      form.pin === ""
    ) {
      setError(true);
      return;
    } 
    try{
      const res = await axios.post('http://localhost:3000/reg',form);
      if(!res.data){
        setError(true);
        return;
      }
      setSubmitted(true);
      setTimeout(() => {
        updateProfile(true);
      }, 1000);
    }catch(err){
      setError(true);
    }
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>User {form.name} successfully registered!!</h1>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="main">
      <div className="circle-left"></div>
      <div className="circle-right"></div>
      <div className="form">
        <div className="backbtn">
          <span><FA icon={faArrowLeft}/></span>
        </div>
        <div className="header">
          <h1>Create Investor Profile</h1>
        </div>

        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>
        <div className="container">
          <div className="left box">
            <span>
              <img src={logo} />{" "}
            </span>
          </div>
          <div className="right box">
            <form>
              <div className="inputBox">
                <div className="imgIcon">
                  <FA icon={faUser}/>
                </div>
                <div className="miniCont">
                  <label className="label">Name</label>
                  <input
                    onChange={(e) => updateForm("name", e.target.value)}
                    className="input"
                    value={form.name}
                    required
                    type="text"
                  />
                </div>
              </div>

              <div className="inputBox">
                <div className="imgIcon">
                <FA icon={faEnvelope}/>
                </div>
                <div className="miniCont">
                  <label className="label">Email</label>
                  <input
                    onChange={(e) => updateForm("email", e.target.value)}
                    className="input"
                    value={form.email}
                    type="email"
                    required
                  />
                </div>
              </div>
              <div className="inputBox">
                <div className="imgIcon">
                <FA icon={faPhone}/>
                </div>
                <div className="miniCont">
                  <label className="label">Phone no.</label>
                  <input
                    onChange={(e) => updateForm("phone", e.target.value)}
                    className="input"
                    value={form.phone}
                    type="tel"
                    required
                  />
                </div>
              </div>
              <div className="inputBox">
                <div className="imgIcon">
                <FA icon={faNetworkWired}/>
                </div>
                <div className="miniCont">
                  <label className="label">Linkedin Link</label>
                  <input
                    onChange={(e) => updateForm("linkedin", e.target.value)}
                    className="input"
                    value={form.linkedin}
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="inputBox">
                <div className="imgIcon">
                 <FA icon={faFlag}/>
                </div>
                <div className="miniCont">
                  <label className="label">Country</label>
                  <input
                    onChange={(e) => updateForm("country", e.target.value)}
                    className="input"
                    value={form.country}
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="inputBox">
                <div className="imgIcon">
                  <FA icon={faMapMarker}/>
                </div>
                <div className="miniCont">
                  <label className="label">State</label>
                  <input
                    onChange={(e) => updateForm("state", e.target.value)}
                    className="input"
                    value={form.state}
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="inputBox flexRow">
                <div className="flexRow">
                  <div className="imgIcon">
                    <FA icon={faBuilding}/>
                  </div>
                  <div className="miniCont">
                    <label className="label">City</label>
                    <input
                      col={5}
                      onChange={(e) => updateForm("city", e.target.value)}
                      className="input"
                      value={form.city}
                      type="text"
                      required
                    />
                  </div>
                </div>  
                  <div className="flexRow">
                    <div className="imgIcon">
                      <FA icon={faContactCard}/>
                    </div>
                    <div className="miniCont">
                      <label className="label">Pin Code</label>
                      <input
                      col={5}
                        onChange={(e) => updateForm("pin", e.target.value)}
                        className="input"
                        value={form.pin}
                        type="number"
                        required
                      />
                    </div>
                  </div>
              </div>
              <div className="inputBox">
                <div className="flexRow">
                  <input
                    onChange={(e) => updateForm("pin", e.target.value)}
                    className="input"
                    value={form.pin}
                    type="checkbox"
                    required
                  />
                  <span>
                    I agree to the terms and conditions and whatever
                    informationid asked for i have provided the right
                    information
                  </span>
                </div>
              </div>
              <div className="flexRowReverse">
                <button onClick={handleSubmit} className="btn" type="submit">
                  Next
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
