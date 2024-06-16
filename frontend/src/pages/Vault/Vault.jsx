import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  getMetadata,
} from "firebase/storage";
import { storage } from "../firebase";
import axios from "axios";
import Navbar from "../../components/Navbar.jsx";


function Vault({thememode,toggle,user}) {
  const [fileUpload, setfileUpload] = useState(null);
  const [fileUrls, setfileUrls] = useState([]);


  const filesListRef = ref(storage, "files/");

  //function to upload file to firebase and mongodb
  const uploadFile = () => {

    if (fileUpload == null) return;
    const dateTime = new Date().toISOString();
    const fileName = `${fileUpload.name} ${dateTime}`;
    const fileRef = ref(storage, `files/${fileName}`);

    uploadBytes(fileRef, fileUpload).then(() => {
      getDownloadURL(fileRef).then((url) => {
        console.log(url)
        const addUrl= async()=>{
          try{
            const res = await axios.post(`http://localhost:3001/api/user/addUrl/${user._id}`,{url,fileName})
            console.log("file url",res.data)

          }catch(err){
            console.log(err)

          }
        } 
        addUrl()
        setfileUrls((prev) => [...prev, { url, fileName }]);
      });
    });
  };
  
  // ---------------------- function to download CSV file ------------------------- 
  const downloadCSV = async (fileName) => {
    const fileRef = ref(storage, `files/${fileName}`);
    const url = await getDownloadURL(fileRef);
    window.open(url, "_blank");
  };

  //function to fetch user files from database
  useEffect(()=>{
    const getFiles = async()=>{
      try{
        const res = await axios.get(`http://localhost:3001/api/user/getUrls/${user._id}`)//add user Id
        console.log(res.data)
        setfileUrls(res.data.files)
      }catch(err){
        console.log(err)
      }
    }
    getFiles()
    
  },[])

  return (
    <div className="h-full" style={{ backgroundColor: thememode === 'dark' ? '#181818' :'#f0f0f0' }}>

      <Navbar thememode={thememode} toggle={toggle}/>

      <div className="dark:text-white h-screen" >
      <div className='font-extrabold text-2xl mx-4 mt-4 dark:text-[#f0f0f0]'>Storage Vault</div>
      <div className="flex justify-between">
      <div className='mx-4 text-gray-600 dark:text-gray-400'>Export Transaction data with filters of your choice and upload them here in the vault</div>
      <div className="flex justify-end mx-4">
      <label for="actual-btn" className="text-white  rounded-md p-2 bg-[#000080] mx-1">Choose File</label>
      <input type="file" id="actual-btn" className="w-60 flex justify-center align-middle mx-2 border-none hidden" onChange={(event) => {setfileUpload(event.target.files[0]);}}/>
      <button onClick={uploadFile} className="text-white  rounded-md p-2 bg-[#000080]">Upload</button>
      </div>
      </div>

      <div className="grid grid-cols-3 dark:bg-[#181818] m-4">{fileUrls.map((file) => (
        <div key={file.fileName}>
          <div className="m-2 max-w-[400px] h-[100px]  w-82 h-34 rounded-md shadow-md font-semibold px-2 py-2 border-1 border-black border-dashed flex align-middle justify-center cursor-pointer" style={{ color: thememode === "dark" ? "white" : "black",backgroundColor:thememode==="dark"?"#282828":"white",borderColor:thememode==="dark"?"white":"black" }} alt={file.fileName} onClick={() => downloadCSV(file.fileName)}>
            <img src="folder.png" className="h-20 w-20"/>
            <div className="p-3">{file.fileName}</div>
            </div>
        </div>
      ))}</div>
    </div>
    </div>
  );
}

export default Vault;
