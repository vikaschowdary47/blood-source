type actionType = {
    type:string,
    payload:any,
}

export const reducer = (state:object,action:actionType) => {
    switch(action.type) {
        case 'SET_OTP':
            return {
                ...state,
                otp: action.payload
            }
        case 'SET_BECOME_A_DONOR_FORM':
            return {
                ...state,
                becomeADonorForm: action.payload
            }
        case 'SET_FIND_A_DONOR_FORM':
            return {
                ...state,
                findADonorForm: action.payload
            }
        default:
            return state 
    }
}