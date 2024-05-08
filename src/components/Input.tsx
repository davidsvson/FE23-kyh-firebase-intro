import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useState } from "react";
import { db } from "../main";


export interface Person {
    id? : string;
    firstname : string;
    lastname : string;
}


const Input = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


    const handleSave = async () => {
       
        const person : Person = {
            firstname : firstName,
            lastname : lastName
        }

        try {
            await addDoc(collection(db, 'persons'), person);
            setFirstName('');
            setLastName('');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    }

    return (
        <>
            <label>Förnamn:</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
            <br></br>
            <label>Efternamn:</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
            <br></br>

            <button onClick={handleSave}>Save</button>
        </>
    )
}

export default Input;