import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import axios from 'axios';
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Password } from "primereact/password";
import { useParams } from "react-router-dom";
import { store } from './store/store';
import validator from "validator";
import './DonationForm.css'
import { useNavigate } from "react-router-dom";
export default function DonationForm() {
  const navigate = useNavigate();

  const api_url = "https://data.gov.il/api/3/action/datastore_search";
  const cities_resource_id = "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba";
  const city_name_key = "שם_ישוב";
  const cities_data_id = "cities-data";
  const cities_input = document.getElementById("city-choice");
  const [city, setCity] = useState("")
  const [phone, setPhone] = useState("")
  const getData = (resource_id, q = "", limit = "100") => {
    return axios.get(api_url, {
      params: { resource_id, q, limit },
      responseType: "json"
    });
  };
  const parseResponse = (records = [], field_name) => {
    const parsed =
      records
        .map((record) => `<option value="${record[field_name].trim()}">`)
        .join("\n") || "";
    return Promise.resolve(parsed);
  };
  const populateDataList = (id, resource_id, field_name, query, limit) => {
    const datalist_element = document.getElementById(id);
    if (!datalist_element) {
      console.log(
        "Datalist with id",
        id,
        "doesn't exist in the document, aborting"
      );
      return;
    }
    getData(resource_id, query, limit)
      .then((response) =>
        parseResponse(response?.data?.result?.records, field_name)
      )
      .then((html) => (datalist_element.innerHTML = html))
      .catch((error) => {
        console.log("Couldn't get list for", id, "query:", query, error);
      });
  };
  populateDataList(
    cities_data_id,
    cities_resource_id,
    city_name_key,
    undefined,
    32000
  );
  const route = useParams();
  let total = route.total
  let user = JSON.parse(localStorage.getItem('currentUser'));
  //טיפול בתקינות מספר אשראי
  const [digits3, setDigits3] = useState("");
  let [cardNumber, setCardNumber] = useState(" ");
  let [messageNum, setMessageNum] = useState(" ");
  let [messageExp, setMessageExp] = useState(" ");
  let [messageSub, setMessageSub] = useState(" ");
  let [messageCvv, setMessageCvv] = useState(" ");
  let [exp, setExp] = useState("");
  //מספר אשראי
  function handleCreditCard(event) {
    let value = event.target.value;
    setCardNumber(value);
    if (validator.isCreditCard(value)) {
      setMessageNum("");
    } else {
      setMessageNum("not valid number");
    }
  }
  //תוקף
  function validateExpiryDate(s) {
    if (!/\d\d-\d\d/.test(s)) {
      return 'Expiry date format must be MM-YY:';
    }
    var b = s.split('-');
    if (b[0] < 1 || b[0] > 12) {
      return 'Expiry month must be from 00 to 12 ';
    }
    var d = new Date()
    var c = d.getFullYear() / 100 | 0 + '';
    if (new Date(c + b[1], b[0], 1) < d) {
      return 'Expiry date must be this month or later:';
    }
    setExp(s)
    return ""
  }
  //cvv
  function isValid_CVV_Number(CVV_Number) {
    let regex = new RegExp(/^[0-9]{3,4}$/);
    if (CVV_Number == null) {
      setMessageCvv("wrong");
    }
    if (regex.test(CVV_Number) == true) {
      setMessageCvv("");
      setDigits3(CVV_Number)
    }
    else {
      setMessageCvv("wrong");
    }
  }
  function submit() {
    let m1 = messageNum, m2 = messageExp, m3 = messageCvv, c = city, p = phone
    if (m1 === "" && m2 === "" && m3 === "" && c !== "" && p !== "") {
      let u = {
        password: user.password, name: user.name,
        phone: p, city: c
      }
      console.log(user);
      setMessageSub("")
      
      store.dispatch({ type: 'setUser', payload:u })
      store.dispatch({ type: 'setUser', payload:u })

    }
    else {
      setMessageSub("One or more of the entered data is incorrect")
    }
    navigate(`/home/${false}`);
  }
  return (
    <>
      <form action="">
        <p>Donate: </p>
        <InputText placeholder="Username" value={user.name} />
        <br /><br />
        <div className="form-field" id="city-selection">
          <InputText list="cities-data" placeholder="City" id="city-choice" name="city-choice" onChange={(e) => setCity(e.target.value)} />
          <datalist id="cities-data">
            <option value="">טוען רשימת ערים...</option>
          </datalist>
        </div>
        <br />
        <InputMask mask="999-999-9999" placeholder="Phone number" onChange={(e) => setPhone(e.target.value)} />
        <br /><br />
        <InputMask mask="9999-9999-9999-9999" placeholder="Credit card number" value={cardNumber} onChange={handleCreditCard} />
        <p className="error">{messageNum}</p>
        <br />
        <InputText placeholder="Exp date" onChange={(e) => { setMessageExp(validateExpiryDate(e.target.value)) }} />
        <p className="error">{messageExp}</p>
        <br />
        <InputText maxLength={3} placeholder="cvv" onChange={(e) => isValid_CVV_Number(e.target.value)} />
        <p className="error">{messageCvv}</p>
        <p>total: {total}$</p>
        <p className="error">{messageSub}</p>
        <br />
        <input type="button" onClick={submit} value="pay now" className="button" />
      </form>
    </>

  )
};
