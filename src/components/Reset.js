import React from 'react';

import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';

import { resetPasswordValidate } from '../helper/validate';
import styles from '../styles/Username.module.css';

export default function Reset() {

  const formik= useFormik({
    initialValues:{
      password  : '',
      confirmpassword  : '',
    },
    validate : resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values);
    }
  })

  return (
    <div className="container mx-auto w-full h-screen">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className={styles.glass}>
          <div className="title mt-10 flex flex-col items-center">
            <h4 className='text-4xl font-bold'>Reset Password</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>Enter new password</span>
          </div>
          <form className='space-y-3 my-5 ' onSubmit={formik.handleSubmit}>
            <div className='textbox flex flex-col items-center gap-2'>
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Password' />
              <input {...formik.getFieldProps('confirmpassword')} className={styles.textbox} type="password" placeholder='Confirm Password' />
              <button className={styles.btn} type='submit'>Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
