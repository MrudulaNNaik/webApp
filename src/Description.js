import { QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import firebase from "./firebase";

function Description() {
  const ref = firebase.firestore().collection("Gadgets");
  const [desc, setDesc] = useState([]);
  function getDesc() {
    ref.onSnapshot((querySnapshot) => {
      const prod = [];
      querySnapshot.forEach((doc) => {
        prod.push(doc.data());
      });
      setDesc(prod);
    });
  }
  useEffect(() => {
    getDesc();
    console.log(desc);
  }, []);

  return (
    <div>
      {desc.map((item) => (
        <div className="card-container">
          <div className="card" key={item.id}>
            <div className="image-container">
              <p>{item.detaildesc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Description;
