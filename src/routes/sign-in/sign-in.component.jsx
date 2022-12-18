import { 
        signInWIthGooglePopup, 
        createUserDocumentFromAuth
    } from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';



const SignIn = () => {
    // useEffect(() => {
    //     async function test() {
    //         const response = await getRedirectResult(auth);
    //         if (response) {
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //     }
    //     test();
    // },[]);

    const logGoogleUser = async () => {
        const {user} = await signInWIthGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };



    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;