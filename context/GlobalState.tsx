import React,{createContext,useReducer} from 'react';
import {reducer} from './Reducer';

type initialStateType = {
    otp:number | null,
    becomeADonorForm: object ,
    findADonorForm: object,
}

const initialState:initialStateType = {
    otp:null,
    becomeADonorForm:{
        name: '',
        mobile: '',
        bloodGroup: '',
        state:'',
        district:'',
        mandal:  '',
        donorPrivacy: false,
    },
    findADonorForm:{
        bloodGroup: "",
              state: "",
              district: "",
              mandal: "",
              donorPrivacy: false,
    }
}
export const GlobalContext = createContext(initialState)

export const GlobalContextProvider = (props:any) => {
    const [state, dispatch] = useReducer(reducer, initialState);

     const setOtp = (otp:number) => {
        dispatch({
            type:'SET_OTP',
            payload:otp
        })
    }

    const setBecomeADonorForm = (form:object) => {
        dispatch({
            type:'SET_BECOME_A_DONOR_FORM',
            payload:form
        })
    }

    const setFindADonorForm = (form:object) => {
        dispatch({
            type:'SET_FIND_A_DONOR_FORM',
            payload:form
        })
    }

    return(
        <GlobalContext.Provider value={{state,setOtp,setBecomeADonorForm,setFindADonorForm}}>
            {props.children}
        </GlobalContext.Provider>
    )
}
