import styled from 'styled-components'

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`

export const TextFieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const TextField = styled.input`
   width: 200px;
   padding: 20px;
   display: block;
   margin: 5px;
   font-size: 15px;
   background: #eee;
   border: none;
`

export const CheckBox = styled.input`
    &:hover {
        cursor: pointer;
    }
`

export const CheckBoxFont = styled.p`
    font-size: 13px;
    display: inline;

`