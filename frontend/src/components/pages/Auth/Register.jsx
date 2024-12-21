import Input from "../../form/Input"
import styles from '../../form/Form.module.css'
import {Link} from 'react-router-dom'
import { useState } from "react"

function Register(){
    const [user, setUser] = useState({});

    function handleOnChange(e){
        setUser({ ...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        //send user to the bd
        console.log(user)
    }

    return(
        <section className={styles.form_container}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <Input 
                    text='Name'
                    type='text'
                    name='name'
                    placeholder='Type your name'
                    handleOnChange={handleOnChange}
                />
                <Input 
                    text='Phone'
                    type='text'
                    name='phone'
                    placeholder='Type your phone'
                    handleOnChange={handleOnChange}
                />
                <Input 
                    text='E-mail'
                    type='email'
                    name='email'
                    placeholder='Type your e-mail'
                    handleOnChange={handleOnChange}
                />
                <Input 
                    text='Password'
                    type='password'
                    name='password'
                    placeholder='Type your password'
                    handleOnChange={handleOnChange}
                />
                <Input 
                    text='Confirm Password'
                    type='password'
                    name='confirmpassword'
                    placeholder='Confirm your password'
                    handleOnChange={handleOnChange}
                />
                <input type="submit" value="Register" />
            </form>
            <p>
                Already have an account? <Link to='/login'>Click here.</Link>
            </p>
        </section>
    )
}

export default Register