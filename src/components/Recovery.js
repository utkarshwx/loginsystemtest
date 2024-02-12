import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';

import { passwordValidate } from '../helper/validate';
import styles from '../styles/Username.module.css';

export default function Recovery() {

  const formik= useFormik({
    initialValues:{
      password  :'example123',
    },
    validate : passwordValidate,
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
            <h4 className='text-4xl font-bold'>Recovery</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>Enter 6 digit OTP which is received in your registered email</span>
          </div>
          <form className='space-y-4 mt-1 ' onSubmit={formik.handleSubmit}>
            <div className='textbox flex flex-col items-center gap-4'>
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Password' />
              <button className={styles.btn} type='submit'>Recover</button>
            </div>

            <div className='text-center py-4'>
              <span className='text-gray-600'>Didn't received OTP? <button className='text-green-400 font-bold'>Resend OTP</button></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
