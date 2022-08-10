import React, { useState } from 'react'
import { toast } from 'react-toastify'

import Container from '../../components/UI/container'
import CustomInput from '../../components/UI/custominput'
import CustomButton from '../../components/UI/custombutton'

const toastifyOptions = {
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  icon: false,
  draggable: true,
  pauseOnHover: true,
  rtl: false
}

const apiUrl = 'http://localhost:3000/v1'

const Root = () => {
  const [inputValue, setInputValue] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isDisabled || inputValue.length === 0) return

    const notification = toast.loading('The request is getting processed', { autoClose: 3000 })

    fetch(`${apiUrl}/video/info?url=${inputValue}`)
      .then((res) => res.json())
      .then((data) => {
        toast.update(notification, {
          ...toastifyOptions,
          render: 'Here is your video ❤️'
        })
        console.log(data)
      })
      .catch((e) => {
        toast.update(notification, {
          ...toastifyOptions,
          render: 'There was an error 💥'
        })
        console.log(e)
      })
  }

  const handleChange = (e) => {
    const { value } = e.target

    setIsDisabled(false)
    setInputValue(value)
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <CustomInput
          type={'text'}
          name="url"
          placeholder="Paste your link here. Youtube/Twitter/Reddit"
          onChange={handleChange}
        />
        <CustomButton
          name={'submit'}
          value={'Download'}
          disabled={isDisabled}
        />
          <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>

      </form>
    </Container>

  )
}

export default Root
