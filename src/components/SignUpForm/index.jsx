import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './SignUpForm.module.css'

const INITIAL_VALUES = {
	fullName: '',
	email: '',
	password: '',
	confirmPassword: '',
}

const REX_INCORRECT_VALUES = {
	fullName: /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s'-]{3,}$/,
	email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
	password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
	confirmPassword: null,
}

class SignUpForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			fullName: INITIAL_VALUES.fullName,
			email: INITIAL_VALUES.email,
			password: INITIAL_VALUES.password,
			confirmPassword: INITIAL_VALUES.confirmPassword,
			validationGroup: {
				isValidFullName: false,
				isValidEmail: false,
				isValidPassword: false,
				isValidConfirmPassword: false,
			},
			agreeToTerms: false,
		}
	}

	submitActionBtn = () => {
		const {
			isValidFullName,
			isValidEmail,
			isValidPassword,
			isValidConfirmPassword,
		} = this.state.validationGroup

		if (
			isValidFullName &&
			isValidEmail &&
			isValidPassword &&
			isValidConfirmPassword &&
			this.state.agreeToTerms
		) {
			alert('Form submitted successfully!')
			this.setState(INITIAL_VALUES)
		} else {
			alert('Please fill out the form correctly.')
		}
	}

	handleInputChange = (e) => {
		const { name, value } = e.target
		this.setState((prevState) => {
			let isValidField = false

			if (name === 'confirmPassword') {
				isValidField = value === prevState.password
			} else {
				const regex = REX_INCORRECT_VALUES[name]
				isValidField = regex?.test(value) || false
			}

			return {
				[name]: value,
				validationGroup: {
					...prevState.validationGroup,
					[`isValid${name.charAt(0).toUpperCase() + name.slice(1)}`]:
						isValidField,
				},
			}
		})
	}

	handleCheckboxChange = (e) => {
		this.setState({ agreeToTerms: e.target.checked })
	}

	render() {
		const { fullName, email, password, confirmPassword, validationGroup } =
			this.state

		const fullNameClassName = classNames(styles.signUpFormInput, {
			[styles.signUpFormInputValid]: validationGroup.isValidFullName,
			[styles.signUpFormInputInvalid]: !validationGroup.isValidFullName,
		})

		const emailClassName = classNames(styles.signUpFormInput, {
			[styles.signUpFormInputValid]: validationGroup.isValidEmail,
			[styles.signUpFormInputInvalid]: !validationGroup.isValidEmail,
		})

		const passwordClassName = classNames(styles.signUpFormInput, {
			[styles.signUpFormInputValid]: validationGroup.isValidPassword,
			[styles.signUpFormInputInvalid]: !validationGroup.isValidPassword,
		})

		const confirmPasswordClassName = classNames(styles.signUpFormInput, {
			[styles.signUpFormInputValid]: validationGroup.isValidConfirmPassword,
			[styles.signUpFormInputInvalid]: !validationGroup.isValidConfirmPassword,
		})

		return (
			<div className={styles.signUpFormContainer}>
				<h1 className={styles.SignUpFormTitle}>Create Your Account</h1>
				<form className={styles.signUpForm} action='#'>
					<label className={styles.signUpFormLabel}>
						<span className={styles.signUpFormLabelName}>Full Name</span>
						<input
							className={fullNameClassName}
							type='text'
							name='fullName'
							placeholder='John Doe'
							value={fullName}
							onChange={(e) => this.handleInputChange(e)}
							autoFocus
						/>
					</label>
					<label className={styles.signUpFormLabel}>
						<span className={styles.signUpFormLabelName}>Email Address</span>
						<input
							className={emailClassName}
							type='email'
							name='email'
							placeholder='johndoe@gmail.com'
							value={email}
							onChange={(e) => this.handleInputChange(e)}
						/>
					</label>
					<label className={styles.signUpFormLabel}>
						<span className={styles.signUpFormLabelName}>Password</span>
						<input
							className={passwordClassName}
							type='password'
							name='password'
							placeholder='Password'
							value={password}
							onChange={(e) => this.handleInputChange(e)}
						/>
					</label>
					<label className={styles.signUpFormLabel}>
						<span className={styles.signUpFormLabelName}>Confirm Password</span>
						<input
							className={confirmPasswordClassName}
							type='password'
							name='confirmPassword'
							placeholder='Confirm Password'
							value={confirmPassword}
							onChange={(e) => this.handleInputChange(e)}
						/>
					</label>
					<div className={styles.signUpFormCheckbox}>
						<input
							className={styles.signUpFormCheckboxInput}
							type='checkbox'
							id='agreeToTermsId'
							checked={this.state.agreeToTerms}
							onChange={(e) => this.handleCheckboxChange(e)}
						/>
						<span className={styles.signUpFormCheckboxName}>
							I agree to the Terms and Conditions
						</span>
					</div>
					<button
						className={styles.signUpFormBtn}
						type='submit'
						onClick={(e) => {
							e.preventDefault()
							this.submitActionBtn()
						}}
					>
						Sign Up
					</button>
				</form>
			</div>
		)
	}
}

export default SignUpForm
