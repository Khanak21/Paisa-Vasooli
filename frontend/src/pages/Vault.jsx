
// import { useState, useEffect } from "react";
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   listAll,
//   list,
// } from "firebase/storage";
// import { storage } from "./firebase";
// import { v4 } from "uuid";

// function Vault() {
//   const [fileUpload, setfileUpload] = useState(null);
//   const [fileUrls, setfileUrls] = useState([]);

//   const filesListRef = ref(storage, "files/");
//   const uploadFile = () => {
//     if (fileUpload == null) return;
//     const dateTime = Date();
//     const fileRef = ref(storage, `files/${fileUpload.name+" "+dateTime}`);
//     uploadBytes(fileRef, fileUpload).then((snapshot) => {
//       getDownloadURL(snapshot.ref).then((url) => {
//         setfileUrls((prev) => [...prev, url]);
//       });
//     });
//   };

//   useEffect(() => {
//     listAll(filesListRef).then((response) => {
//       response.items.forEach((item) => {
//         getDownloadURL(item).then((url) => {
//           setfileUrls((prev) => [...prev, url]);
//         });
//       });
//     });
//   }, []);

//   return (
//     <div>
//       <input
//         type="file"
//         onChange={(event) => {
//           setfileUpload(event.target.files[0]);
//         }}
//       />
//       <button onClick={uploadFile}> Upload file</button>
//       {fileUrls.map((url) => {
//         return <img src={url} />;
//       })}
//     </div>
//   );
// }

// export default Vault;
import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  getMetadata,
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

function Vault() {
  const [fileUpload, setfileUpload] = useState(null);
  const [fileUrls, setfileUrls] = useState([]);

  const filesListRef = ref(storage, "files/");

  const uploadFile = () => {
    if (fileUpload == null) return;
    const dateTime = new Date().toISOString();
    const fileName = `${fileUpload.name} ${dateTime}`;
    const fileRef = ref(storage, `files/${fileName}`);
    uploadBytes(fileRef, fileUpload).then(() => {
      getDownloadURL(fileRef).then((url) => {
        setfileUrls((prev) => [...prev, { url, fileName }]);
      });
    });
  };

  const downloadCSV = async (fileName) => {
    const fileRef = ref(storage, `files/${fileName}`);
    const url = await getDownloadURL(fileRef);
    window.open(url, "_blank");
  };

  useEffect(() => {
    listAll(filesListRef).then((response) => {
      response.items.forEach((item) => {
        getMetadata(item).then((metadata) => {
          const fileName = metadata.name || "";
          getDownloadURL(item).then((url) => {
            setfileUrls((prev) => [...prev, { url, fileName }]);
          });
        });
      });
    });
  }, []);

  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          setfileUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}>Upload file</button>
      {fileUrls.map((file) => (
        <div key={file.fileName}>
          <img src="https://w7.pngwing.com/pngs/670/803/png-transparent-excel-logo-logos-logos-and-brands-icon.png" className="w-4 h-4" alt={file.fileName} onClick={() => downloadCSV(file.fileName)}/>{file.fileName}
        </div>
      ))}
    </div>
  );
}

export default Vault;
