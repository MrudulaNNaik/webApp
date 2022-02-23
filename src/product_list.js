import { QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Description from "./Description";
import firebase from "./firebase";
import "./index.css";

function ReadMore({ children, maxCount = 100 }) {
  const text = children;

  const [isTruncated, setIsTruncated] = useState(true);

  const resultString = isTruncated ? text.slice(0, 0) : text;

  function toggleIsTruncated() {
    setIsTruncated(!isTruncated);
  }

  return (
    <p>
      {resultString}
      <button className="btn" onClick={toggleIsTruncated}>
        {isTruncated ? "Know More" : "Show Less"}
      </button>
    </p>
  );
}

function ProductList() {
  const ref = firebase.firestore().collection("Gadgets");

  console.log(ref);
  const [data, setdata] = useState([]);
  const [loader, setloader] = useState(true);

  function getData() {
    ref.onSnapshot((querySnapshot) => {
      const prod = [];
      querySnapshot.forEach((doc) => {
        prod.push(doc.data());
      });
      setdata(prod);
      setloader(false);
    });
  }
  useEffect(() => {
    getData();
    console.log(data);
  }, []);
  return (
    <div>
      <div className="colorGradient">
        <h1 style={{ alignItems: "center" }}>
          Product List with Detailed Description
        </h1>
        {loader === false &&
          data.map((item) => (
            <div className="card-container">
              <div className="card" key={item.id}>
                <div className="image-container">
                  <img className="image" src={item.image} alt="image"></img>
                </div>
                <div className="card-component">
                  <div className="card-title">
                    <h3 className="title">{item.name}</h3>
                  </div>
                  <div className="card-price">
                    <h3 className="title">Rs.{item.price}</h3>
                  </div>

                  <div className="card-body">{item.smalldesc}</div>
                  <div className="card-desc">
                    <ReadMore>{item.detaildesc}</ReadMore>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductList;
