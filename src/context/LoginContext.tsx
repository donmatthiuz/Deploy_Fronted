import { createContext } from "react"

const LoginContext = createContext({ loggedin: false, setLoggedIn: () => {} })

export default LoginContext 