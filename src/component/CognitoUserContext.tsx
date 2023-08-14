import { createContext } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";

const CognitoUserContext = createContext<CognitoUser | null>(null);
console.log("context", CognitoUserContext);

export default CognitoUserContext;
