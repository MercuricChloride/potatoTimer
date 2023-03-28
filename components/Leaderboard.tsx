import { auth, db, app } from "@/lib/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { doc, getDoc, collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"

const Leaderboard: React.FC = () => {
    interface User {
        displayName: string;
        hours: number;
    }
    const [user] = useAuthState(auth)
    const [userData, setUserData] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const dayInMs = 86400000;

    // const data: User[] = [];

    // useEffect(() => {
    //     console.log("hello?")
    //     const getUsers = async () => {
    //         const querySnapshot = await getDocs(collection(db, "users"));
    //         console.log(querySnapshot.docs);
    //         querySnapshot.forEach((doc) => {
    //             getData(doc.id, doc.data().displayName);
    //         });
    //     }
    //     const getData = async (id: string, name: string) => {
    //         const now = new Date();
    //         const dateStr = `${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()}`;

    //         const docRef = doc(db, "users", id, "hours", dateStr);

    //         const docSnap = await getDoc(docRef);
    //         // maybe userdata.find where name = name ?
    //         // (item) => item.name === name
    //         /* if (docSnap.exists() && !userData.find((item) => item.displayName === name)){ */
    //         if (docSnap.exists()) {
    //             console.log("Document data:", docSnap.data());
    //             data.push({ displayName: name, hours: docSnap.data().hours.toFixed(2) })

    //             /* setUserData((userData) => [...userData, { displayName: name, hours: docSnap.data().hours.toFixed(2) }]) */
    //         } else {
    //             // doc.data() will be undefined in this case
    //             console.log("No such document!");
    //         }
    //         /* setUserData(data.sort((a, b) => a.hours - b.hours)) */
    //         setUserData(data)
    //     }
    //     getUsers()

    // }, [])

    useEffect(() => {
        if (!user) return;
        const data: User[] = [];
        const getUsers = async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                getData(doc.id, doc.data().displayName);
            });
            console.log("datatopp", data)
        setUserData(data.sort((a, b) => a.hours - b.hours));
        }
        const getData = async (id: string, name: string) => {
            let hours = 0;
            const now = new Date();
            for (let i = 0; i < 7; i++) {
                const then = new Date(now.getTime() - (dayInMs * i));
                const dateStr = `${then.getMonth() + 1}-${then.getDate()}-${then.getFullYear()}`;
                const docRef = doc(db, "users", id, "hours", dateStr);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    hours += docSnap.data().hours;
                }
                console.log("day", i)
            }
            console.log("hours", hours)
            console.log("databefore", data)
            data.push({ displayName: name, hours: parseInt(hours.toFixed(2)) })
            console.log("dataafter", data)
        }
        getUsers()
       console.log("data", data)
        console.log("userdata", userData)
        /* setUserData([...data]) */
        /* console.log("userData", userData) */
    }, [user])

    return (
        <div>
            <h1>Leaderboard</h1>
            <div className=" table">
                <>
                    <h2 className="w-full flex justify-center text-xl">Rank</h2>
                    <h2 className="w-full flex justify-center text-xl">Hacker</h2>
                    <h2 className="w-full flex justify-center text-xl">Hours Worked</h2>
                </>
                <>
                    <h2 className="w-full flex justify-center text-xl">1</h2>
                    <h2 className="w-full flex justify-center text-xl">John Doe</h2>
                    <h2 className="w-full flex justify-center text-xl">100</h2>
                </>
                <>
                    <h2 className="w-full flex justify-center text-xl">2</h2>
                    <h2 className="w-full flex justify-center text-xl">John Doe</h2>
                    <h2 className="w-full flex justify-center text-xl">100</h2>
                </>
                {userData.map((user, index) => (
                    <>
                        <h2 className="w-full flex justify-center text-xl">{index + 3}</h2>
                        <h2 className="w-full flex justify-center text-xl">{user.displayName}</h2>
                        <h2 className="w-full flex justify-center text-xl">{user.hours}</h2>
                    </>
                ))}

            </div>
        </div>
    )
}

export default Leaderboard
