import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore,collection, addDoc,getDocs  } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
  const firebaseConfig = {
   apiKey: "AIzaSyAkjn_N55tIebBeIHo2KENa1nvCBloRLBU",
    authDomain: "smit-form-users.firebaseapp.com",
    projectId: "smit-form-users",
    storageBucket: "smit-form-users.firebasestorage.app",
    messagingSenderId: "1053464694162",
    appId: "1:1053464694162:web:8847995c4169475df5854b"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let getForm=document.getElementById('formbody')
let getSearchForm=document.getElementById('searchform')
let getCity=document.getElementById('formcity')
let getCountry=document.getElementById('formcountry')
let arr=[['Karachi','Lahore'],['Istanbul','Izmir']]
if(getCountry){
  getCountry.addEventListener('change',(e)=>{
    let temp=getCity.firstChild
    getCity.innerHTML=''
    getCity.appendChild(temp)
    if(e.srcElement.selectedIndex==1){ 
        getCity.selectedIndex=0   
        arr[e.srcElement.selectedIndex-1].forEach(cv=>{
            let creEl=document.createElement('option')
            creEl.innerText=cv
            getCity.appendChild(creEl)
        })
    }else{
        getCity.selectedIndex=0
        arr[e.srcElement.selectedIndex-1].forEach(cv=>{
            let creEl=document.createElement('option')
            creEl.innerText=cv
            getCity.appendChild(creEl)
        })
    }
})
}
if(getForm){getForm.addEventListener('submit',async ()=>{
  const cloudName = "dudzzegfg";
  const uploadPreset = "unsigned_preset";
  let getFile=document.getElementById('formfile')
  let getCourse=document.getElementById('formcourse')
  let getProficiency=document.getElementById('formproficiency')
  let getName=document.getElementById('formname')
  let getFatherName=document.getElementById('formfathername')
  let getEmail=document.getElementById('formemail')
  let getNumber=document.getElementById('formnumber')
  let getCnic=document.getElementById('formcnic')
  let getFatherCnic=document.getElementById('formfathercnic')
  let getDate=document.getElementById('formdate')
  let getGender=document.getElementById('formgender')
  let getAddress=document.getElementById('formaddress')
  let getQualification=document.getElementById('formqualification')
  let getLaptop=document.getElementById('formlaptop')
  const file = getFile.files[0];
  let country
  Array.from(getCountry.childNodes).forEach(cv=>{
    if(cv.selected && !cv.disabled){
      country=cv.value
      getCountry.selectedIndex=0
    }
  })
  let city
  Array.from(getCity.childNodes).forEach(cv=>{
    if(cv.selected && !cv.disabled){
      city=cv.value
      getCity.selectedIndex=0
    }
  })
  let course
  Array.from(getCourse.childNodes).forEach(cv=>{
    if(cv.selected && !cv.disabled){
      course=cv.value
      getCourse.selectedIndex=0
    }
  })
  let proficiency
  Array.from(getProficiency.childNodes).forEach(cv=>{
    if(cv.selected && !cv.disabled){
      proficiency=cv.value
      getProficiency.selectedIndex=0
    }
  })
  let name=getName.value
  getName.value=''
  let fatherName=getFatherName.value
  getFatherName.value=''
  let email=getEmail.value
  getEmail.value=''
  let number=getNumber.value
  getNumber.value=''
  let cnic=getCnic.value
  getCnic.value=''
  let fatherCnic=getFatherCnic.value
  getFatherCnic.value=''
  let date=getDate.value
  getDate.value=''
  let gender
  Array.from(getGender.childNodes).forEach(cv=>{
    if(cv.selected && !cv.disabled){
      gender=cv.value
      getGender.selectedIndex=0
    }
  })
  let address=getAddress.value
  getAddress.value=''
  let qualification
  Array.from(getQualification.childNodes).forEach(cv=>{
    if(cv.selected && !cv.disabled){
      qualification=cv.value
      getQualification.selectedIndex=0
    }
  })
  let laptop
  Array.from(getLaptop.childNodes).forEach(cv=>{
    if(cv.selected && !cv.disabled){
      laptop=cv.value
      getLaptop.selectedIndex=0
    }
  })
  if (!file) return;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.secure_url) {
      getFile.value=''
      console.log("Uploaded:", data.secure_url);
      try {
        const docRef = await addDoc(collection(db, "users form"), {
          country,city,course,proficiency,name,fatherName,email,number,cnic,fatherCnic,date,gender,address,qualification,laptop,
          url:data.secure_url
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      console.error("Upload failed:", data);
    }
  } catch (err) {
    console.error("Error uploading:", err);
  }

})
}
if(getSearchForm){
  getSearchForm.addEventListener('submit',async ()=>{
    let arrr=[]
    let getSearch=document.getElementById('searchINP')
    let getContainer=document.getElementById('container')
    getContainer.innerHTML=''
    const querySnapshot = await getDocs(collection(db, "users form"));
querySnapshot.forEach((doc) => {
  if(doc.data().cnic==getSearch.value){
    arrr.push(doc.data())
  }
});
arrr.forEach(cv=>{
  getContainer.innerHTML+=`<div class="card col-md-5 col-8 my-md-5 m-3" style="width: 18rem;">
<img src="${cv.url}" width="80%" height="200px" class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">Name: ${cv.name}</h5>
  <p class="card-text">Course: ${cv.course}</p>
</div>
</div>`
})
  })
}
