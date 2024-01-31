Doubts

1. const JSX = useMemo(() => TableHOX(Columns,data)(),[])

// How is firebase being setUp ?
=> Create a New Project in firebase.
=> Go to the project , then on the left-sideBar go to the " project-overview " section at the top of the sidebar.
=> In the hero-section of project-overview select the type of project as "web".
=> You will get some essential data required for firebase setup.

Now , setup the firebase App through documentation.

// Login Feature
use, signInWithPopUp and googleAuthProvider functions for logging.

// Find Out if the user is in a logged-In state or Logged-Out state
use,onAuthStateChanged(auth,(user) => { // If the user is logged In , the above user variable will contain all the Login informaiton })

// How firebase is being used for frontend Authetication ?
