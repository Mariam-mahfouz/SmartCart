import Papa from "papaparse";
import { ref, push } from "firebase/database";
import { database } from "../../../firebase";

export default function UploadData() {

  const handleUpload = (e) => {
    const file = e.target.files[0];

    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const products = result.data;
        console.log("CSV Data:", result.data);
        console.log(Object.keys(result.data[0]));
        products.forEach((p) => {
      
            console.log(p);
        products.forEach((p) => {
          products.forEach((p) => {

            push(ref(database, "products"), {
              id: p["Product ID"],
              name: p["Description"],
              category: p["Broad Category (BPC)"],
              subCategory: p["Specific Category (SPC)"],
              brand: p["Brand (BC)"],
              hasOffer: false,
              discount: 0,
              imageUrl: ""
            });
          
          });

});
        });

        alert("Products uploaded successfully 🚀");
      }
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload Products (CSV)</h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleUpload}
      />
    </div>
  );
}