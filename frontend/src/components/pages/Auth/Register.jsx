import Input from "../../form/Input"

function Register(){
    function handleOnChange(e){

    }

    return(
        <section>
            <h1>Register</h1>
            <form>
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
        </section>
    )
}

export default Register