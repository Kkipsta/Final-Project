import {useState,useEffect} from "react"


export default function Home() {
    const [isAuthMessage, setIsAuthMessage] = useState("")
    


    useEffect(() => {
        const isLogedIn = localStorage.getItem('isLogedIn');

        if(isLogedIn && JSON.parse(isLogedIn) === true) {
            setIsAuthMessage("თქვენ დარეგისტრირდით")
        }else {
            setIsAuthMessage("პროდუქტების სანახავად უნდა დარეგისტრირდეთ")
        }
        
    }, [])



    
    return (
        <>
        <div style={{height:"50vh",display:"flex",alignItems: "center",justifyContent: "center"}}>
            <h1 style={{fontSize:"50px"}}>{isAuthMessage}</h1>
        </div>
        </>
    )
}
