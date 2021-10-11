import locations from '../locations.json'

export const getStates = () => {
    return locations.map(location => location.state)
}


export const getDistricts = (state:string) => {
    const districts = locations.filter(location => {
        return(
            location.state === state
        )
    })
    return districts.map(district => district.district)
}

export const getTowns = (state:string,district:string) => {
    const districts = locations.filter(location => {
        return(
            location.district === district &&
            location.state === state 
        )
    })
    return districts.map(district => district.town)
}