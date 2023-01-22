import { useEffect, useState } from "react"
import {
  GoogleAuthProvider,
  User,
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithCredential
} from "firebase/auth"


// This is the firebase.ts file we created a few
// steps ago when we received our config!
import { auth } from "./firebase"

// We'll need to specify that we want Firebase to store
// our credentials in localStorage rather than in-memory
setPersistence(auth, browserLocalPersistence)
function IndexPopup() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User>(null)

  // Whenever the user clicks logout, we need to 
  // use the auth object we imported from our firebase.ts
  // file and sign them out!
  const onLogoutClicked = async () => {
    if (user) {
      await auth.signOut()
    }
  }

  // When the user clicks log in, we need to ask Chrome
  // to log them in, get their Google auth token, 
  // send it to Firebase, and let Firebase do its magic
  // if everything worked, we'll get a user object from them
  const onLoginClicked = () => {
    chrome.identity.getAuthToken({ interactive: true }, async function (token) {
      if (chrome.runtime.lastError || !token) {
        console.error(chrome.runtime.lastError)
        setIsLoading(false)
        return
      }
      if (token) {
        const credential = GoogleAuthProvider.credential(null, token)
        try {
          // There's no need to do anything with what this returns
          // since we're keeping track of the user object with
          // onAuthStateChanged
          await signInWithCredential(auth, credential)
        } catch (e) {
          console.error("Could not log in. ", e)
        }
      }
    })
  }

  // We register this listener once when this component starts
  useEffect(() => {
    // Whenever the auth changes, we make sure we're no longer loading
    // and set the user! On login, this will populate with a new user
    // on logout, this will make user null
    onAuthStateChanged(auth, (user) => {
      setIsLoading(false)
      setUser(user)
    })
  }, [])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h1>
        Welcome to your <a href="https://www.plasmo.com">Plasmo</a> Extension!
      </h1>
      {!user ? (
        <button
          onClick={() => {
            setIsLoading(true)
            onLoginClicked()
          }}>
          Log in
        </button>
      ) : (
        <button
          onClick={() => {
            setIsLoading(true)
            onLogoutClicked()
          }}>
          Log out
        </button>
      )}
      <div>
        {isLoading ? "Loading..." : ""}
        {!!user ? (
          <div>
            Welcome to Plasmo, {user.displayName} your email address is{" "}
            {user.email}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default IndexPopup

