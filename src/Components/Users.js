import { useEffect, useState } from "react";

export default function Users(props) {

    const [datum, setDatum] = useState(null);

    useEffect(() => {
      const fetchProduct = async () => {
        try {
          let data = await fetch("https://dummyjson.com/users");
  
          if (data.ok) {
            let res = await data.json();
            setDatum(res);
          }
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchProduct();
    }, []);

    console.log(datum)

    return (
        <>

            <h1>Users</h1>
        <section className="users">
            {
                datum && datum.users.map((user)=>(
                    <div className="user-box">
                        <p>Username: {user.username}</p>
                        <p>Password: {user.password}</p>
                    </div>
                ))
            }
        </section>
        </>
    )
}