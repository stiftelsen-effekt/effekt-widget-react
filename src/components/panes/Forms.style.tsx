import styled from 'styled-components'

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`

export const InputFieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
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
    margin-left: 10px;
    &:hover {
        cursor: pointer;
    }
`

export const RadioButton = styled.input`
    margin-left: 10px;
    &:hover {
        cursor: pointer;
}
`

export const InputLabel = styled.p`
    align-self: start;
    font-size: 12px;
    display: inline;
    position: relative;
    bottom: 2px;
    margin-left: 5px;
`