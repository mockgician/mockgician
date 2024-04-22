import React from 'react';
import useForm from '../../hooks/useForm';

const SignIn = ({ signInUser }) => {
    const { enteredValues, errors, handleChangeInput, isFormValid } = useForm();

    function handleSubmit(evt) {
        evt.preventDefault();
        signInUser({
            username: enteredValues.login,
            password: enteredValues.password,
        });
    }

    return(
        <main className="main">
            <section className="signin">
                <form className="signin__form" onSubmit={handleSubmit}>
                    
                    <label className="signin__input-label">Login</label>
                    <input 
                    className="signin__input" 
                    placeholder="Enter your user name" 
                    value={enteredValues.login || ""} 
                    type="text" 
                    name="login" 
                    id="login-input" 
                    required
                    onChange={handleChangeInput}
                    />
                    
                    <label className="signin__input-label">Password</label>
                    <input 
                    className="signin__input" 
                    placeholder="Enter your password" 
                    value={enteredValues.password || ""} 
                    type="password" 
                    name="password" 
                    id="password-input" 
                    minLength='2' 
                    maxLength='35' 
                    required
                    onChange={handleChangeInput}
                    />

                    {
                    errors.login || errors.password ? 
                        (
                        <span className="signin__error">"Invalid user name or password"</span>
                        ) 
                    : 
                        null
                    }

                    <button type="submit" 
                    disabled={!isFormValid ? true : false}
                    className={
                        !isFormValid
                            ? "signin__button signin__button_inactive"
                            : "signin__button"
                    }>Sign in</button>
                </form>
            </section> 
        </main>
    );
}

export default SignIn;