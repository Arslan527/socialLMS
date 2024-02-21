export const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem('profile'))
    if (user?.result.roles.includes("Support") || user?.result.roles.includes("Admin")) {
        return true
    } else{
        return false
    }
}

export const isSupport = () => {
    const user = JSON.parse(localStorage.getItem('profile'))
    if (user?.result.roles.includes("Support")) {
        return true
    } else{
        return false
    }
}

export const isUser = () => { 
    const user = JSON.parse(localStorage.getItem('profile'))
    if (user?.result) {
        return true
    } else{
        return false
    }
}