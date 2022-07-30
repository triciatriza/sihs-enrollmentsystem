import React from 'react'

const EditableRow = () => {
  return (
    <tr>
        <td>
            <input 
            type="text" 
            required ="required" 
            placeholder='Enter a name..' 
            name = 'fullname'
            ></input>
        </td>
        <td>
        <input 
            type="text" 
            required ="required" 
            placeholder='Enter an Address..' 
            name = 'address'
            ></input>
        </td>
        <td>
        <input 
            type="text" 
            required ="required" 
            placeholder='Enter phone number..' 
            name = 'phoneNumber'
            ></input>
        </td>
        <td>
        <input 
            type="text" 
            required ="required" 
            placeholder='Enter an email..' 
            name = 'email'
            ></input>
        </td>
    </tr>
  )
}

export default EditableRow
