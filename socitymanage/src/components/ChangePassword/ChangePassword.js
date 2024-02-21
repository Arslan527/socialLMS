import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import bcrypt from "bcryptjs";
import './ChangePassword.css'
import { updateUser } from '../../actions/users';
import Nav from '../Nav/Nav';

const initialState = { prevPassword: '', newPassword: '', confirmPassword: '' }

const ChangePassword = () => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState(initialState)
    const [errorMessage, setErrorMessage] = useState('')
    const user = JSON.parse(localStorage.getItem('profile'))

    const handleSubmit = (e) => {
        e.preventDefault()

        const isPasswordCorrect = bcrypt.compareSync(formData.prevPassword, user.result.password);

        if (isPasswordCorrect) {
            if (formData.newPassword && formData.confirmPassword) {
                if (formData.newPassword !== formData.confirmPassword) {
                    setErrorMessage('Please enter same password in "New Password" and "Confirm New Password" fields.')
                } else {
                    const hashedPassword = bcrypt.hashSync(
                      formData.newPassword,
                      12
                    );
                    dispatch(
                      updateUser(user.result._id, {
                        ...user.result,
                        password: hashedPassword,
                      })
                    );
                    setErrorMessage('')
                    setFormData(initialState)
                    localStorage.setItem('profile', JSON.stringify({ ...user, result: { ...user.result, password: bcrypt.hashSync(formData.newPassword, 12) } }))
                    alert("Password Changed Successfully!!!")

                }
            } else {
                setErrorMessage('Please Enter New Password!')
            }
        } else {
            setErrorMessage('Incorrect Previous Password!')
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <Nav />
            <form className="change-password__form" onSubmit={handleSubmit}>
                <div className="change-password__container">
                    <h1>Change Password</h1>

                    <p className="error-message">{errorMessage}</p>

                    <input className="input-field" type="password" name="prevPassword" id="prev-password" placeholder="Old Password" onChange={handleChange} value={formData.prevPassword} />
                    <input className="input-field" type="password" name="newPassword" id="new-password" placeholder="New Password" onChange={handleChange} value={formData.newPassword} />
                    <input className="input-field" type="password" name="confirmPassword" id="confirm-password" placeholder="Confirm New Password" onChange={handleChange} value={formData.confirmPassword} />

                    <input className="change-password__submit-btn submit-btn" type="submit" name="submit" placeholder="Submit" />
                </div>
            </form>
        </div>
    )
}

export default ChangePassword