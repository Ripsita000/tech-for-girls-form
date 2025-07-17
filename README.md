# 🌸 Tech For Girls - Registration Form  

A modern **registration form** for the **Tech For Girls Community** with image upload & cropping, WhatsApp sharing, and Google Sheets integration via **Google Apps Script**.  



## ✨ Features  

✅ **Responsive UI** – Built with Bootstrap  
✅ **Image Upload & Crop** – Uses Cropper.js for a clean profile picture  
✅ **WhatsApp Sharing** – Share the invite with friends before submitting  
✅ **Google Sheets Integration** – Saves form data & image to Google Drive/Sheets  
✅ **One-Time Submission** – Prevents duplicate entries using `localStorage`  
✅ **Success Message** – Shows a “Thank you” screen after successful submission  

---

## 🛠️ Tech Stack  

- **HTML5, CSS3, JavaScript (jQuery)**  
- **Bootstrap 4.5** for styling  
- **Toastr.js** for notifications  
- **Cropper.js** for image cropping  
- **Google Apps Script (code.gs)** for backend data storage  

---

## 📸 How It Works  

1. **Fill the form** with your details  
2. **Share on WhatsApp** (mandatory 5 clicks before submit)  
3. **Upload & crop your image**  
4. Click **Submit** → The image & form data are uploaded to Google Sheets & Google Drive  

---

## 🗂️ Folder Structure  
tech-for-girls-form/
|── code.gs # Google Apps Script backend
│── index.html # Main registration form
│── style.css # Custom styles
│── script.js # Form logic & integration
│── README.md # Project documentation
