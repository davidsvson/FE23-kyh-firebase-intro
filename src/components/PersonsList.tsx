import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../main";
import { useEffect, useState } from "react";
import { Person } from "./Input";

const PersonsList = () => {
    const [persons , setPersons] = useState<Person[]>([]);

    // hämta alla dokument i collection ___EN GÅNG___
    // const getData = async () => {
    //     const querySnapshot = await getDocs(collection(db, "persons"));
    //     const personsList = querySnapshot.docs.map(doc => doc.data() as Person);
    //     setPersons(personsList);
    // }

    // hämta data varje gång datan förändras
    useEffect( () => {
       const unsubscribe = onSnapshot(collection(db, "persons"), (snapshot) => {
            const personsList : Person[] = snapshot.docs.map(doc => ( {...doc.data() as Person , id : doc.id}) );
            setPersons(personsList);
       })


       return () => unsubscribe();
    }, []);



    const content = persons.map(person => (
        <li key={person.firstname}>
            {person.firstname} {person.lastname} 
        </li>
    ) )

    return (
        <>
            {/* <button onClick={getData}>Get</button> */}
            <ul>
                {content}
            </ul>

        </>
    )
}

export default PersonsList;


// 1. läsa och skriva från firebase
// 2. Lägg till en radera-knapp efter varje namn - som raderar motsvarande person (deleteDoc)
// 3. Skapa en enkel blogg funktion. En input sida: där man kan skapa ett nytt blogginlägg - rubrik, datum , text
//          en blogg sida: som visar upp en lista av blogginlägg formaterade på ett snyggt sätt
//          extra: skapa filteriring på datum
// 4. bygg en ny quiz där frågorna finns på firebase 
