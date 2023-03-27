
import { useState } from 'react'
import './login.css'
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { store } from './store/store';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
function Login() {
    const users = useSelector((state) => state.users.usersList)
    const directors = useSelector((state) => state.users.directorsList)
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState(0);
    let f = false;
    const header = <div className="font-bold mb-3">Pick a password</div>;
    const footer = (
        <>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>At least one lowercase</li>
                <li>Minimum 8 characters</li>
            </ul>
        </>
    );
    function checkInput() {
        if(name==""||password===0)
        return;
        directors.forEach(element => {
            if (element.password === password) {
                f = true;
            }
        });
        let isExist = false;

        users.forEach(element => {
            if (element.password == password && element.name === name) {
                isExist = true
            }
        });
        if (isExist == false)
            store.dispatch({ type: 'addUser', payload: { password: password, name: name, phone: "", city: "" } })

        localStorage.setItem('currentUser', JSON.stringify({ name: name, password: password, phone: "", city: "" }));
        navigate(`/home/${f}`);
    }

    return (
        <>

            <h2 className='titleLogin'>WellCome</h2>
            <p className='title2'>LOGIN</p>
            <div className="form">
                <div className='insideForm'>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText placeholder="Username" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <br />
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-lock"></i>
                        </span>
                        <Password onChange={(e) => setPassword(e.target.value)} header={header} footer={footer} toggleMask />
                    </div>
                    <div className="card flex flex-wrap justify-content-center gap-3">
                        <Button  label="LOGIN"  raised onClick={checkInput} />
                    </div>

                </div>
            </div>
        </>
    )
}


export default Login