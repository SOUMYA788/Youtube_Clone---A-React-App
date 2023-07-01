export const appData = {
    currentTab:"home",
    showSideNav:false,
    showDashboard:false,
    logOutError:null,
    accountDeleteError:null,
    logoutProcessing:false,
    showAlert:false,
}

export const appDataUpdator = (state, action) => {
    switch (action.type) {
        case "setCurrentTab": {
            return {
                ...state,
                currentTab: action.currentTab
            }
        }
        case "setShowSideNav": {
            return {
                ...state,
                showSideNav: action.showSideNav
            }
        }
        case "setShowDashboard": {
            return {
                ...state,
                showDashboard: action.showDashboard
            }
        }
        case "setLogOutError": {
            return {
                ...state,
                logOutError: action.logOutError
            }
        }
        case "setAccountDeleteError": {
            return {
                ...state,
                accountDeleteError: action.accountDeleteError
            }
        }
        case "setLogoutProcessing": {
            return {
                ...state,
                logoutProcessing: action.logoutProcessing
            }
        }
        case "setShowAlert": {
            return {
                ...state,
                showAlert: action.showAlert
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}