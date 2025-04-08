// // Import Firebase modules
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
// import 'https://cdn.jsdelivr.net/npm/sweetalert2@11'; // Fix SweetAlert import

// // Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCowpmHdCEHyF1dB1XwyU2D1M_HfqxwxFA",
//     authDomain: "charitydonation-f6ffa.firebaseapp.com",
//     projectId: "charitydonation-f6ffa",
//     storageBucket: "charitydonation-f6ffa.appspot.com",
//     messagingSenderId: "527082439076",
//     appId: "1:527082439076:web:3d71b8e2aeebef8c8ec131"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);






// document.addEventListener("DOMContentLoaded", function () {
//     let donateButton = document.querySelector(".btn-primary"); 
//     let loginButton = document.getElementById("loginBtn"); 
//     let modal = document.getElementById("loginModal");
//     let closeModal = document.getElementById("closeModal");
//     let logoutButton = document.getElementById("logoutButton");

//     // Open modal safely
//     if (donateButton) {
//         donateButton.addEventListener("click", function (event) {
//             event.preventDefault();
//             modal?.classList.add('show'); // Check if modal exists
//         });
//     }

//     if (loginButton) {
//         loginButton.addEventListener("click", function (event) {
//             event.preventDefault();
//             modal?.classList.add('show');
//         });
//     }

//     if (closeModal) {
//         closeModal.addEventListener("click", function () {
//             modal?.classList.remove('show');
//         });
//     }

//     window.addEventListener("click", function (event) {
//         if (event.target === modal) {
//             modal?.classList.remove('show');
//         }
//     });

//     // Toggle Login/Signup Forms
//     let showLogin = document.getElementById("showLogin");
//     let showSignup = document.getElementById("showSignup");

//     if (showLogin) {
//         showLogin.addEventListener("click", function (event) {
//             event.preventDefault();
//             document.getElementById("signupForm")?.style.setProperty("display", "none");
//             document.getElementById("loginForm")?.style.setProperty("display", "block");
//         });
//     }

//     if (showSignup) {
//         showSignup.addEventListener("click", function (event) {
//             event.preventDefault();
//             document.getElementById("signupForm")?.style.setProperty("display", "block");
//             document.getElementById("loginForm")?.style.setProperty("display", "none");
//         });
//     }

//     // Firebase Signup
//     let signupButton = document.getElementById("signupButton");
//     if (signupButton) {
//         signupButton.addEventListener("click", function () {
//             let email = document.getElementById("signupEmail").value;
//             let password = document.getElementById("signupPassword").value;

//             createUserWithEmailAndPassword(auth, email, password)
//                 .then(() => {
//                     Swal.fire("Success!", "Account created successfully.", "success").then(() => {
//                         window.location.href = "dashboard.html";
//                     });
//                 })
//                 .catch(error => Swal.fire("Error!", error.message, "error"));
//         });
//     }

//     // Firebase Login
//     let loginButtonAction = document.getElementById("loginButton");
//     if (loginButtonAction) {
//         loginButtonAction.addEventListener("click", function () {
//             let email = document.getElementById("loginEmail").value;
//             let password = document.getElementById("loginPassword").value;

//             signInWithEmailAndPassword(auth, email, password)
//                 .then(() => {
//                     Swal.fire("Welcome!", "Login successful.", "success").then(() => {
//                         window.location.href = "dashboard.html";
//                     });
//                 })
//                 .catch(error => Swal.fire("Error!", error.message, "error"));
//         });
//     }

//     // Firebase Logout
//     if (logoutButton) {
//         logoutButton.addEventListener("click", function () {
//             signOut(auth).then(() => {
//                 Swal.fire("Logged out!", "You have been logged out.", "success").then(() => {
//                     window.location.href = "index.html";
//                 });
//             }).catch(error => Swal.fire("Error!", error.message, "error"));
//         });
//     }
// });







// Firebase configuration (Ensure it's correctly initialized)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Config (Replace with your Firebase credentials)
const firebaseConfig = {
    apiKey: "AIzaSyCowpmHdCEHyF1dB1XwyU2D1M_HfqxwxFA",
   authDomain: "charitydonation-f6ffa.firebaseapp.com",
    projectId: "charitydonation-f6ffa",
     storageBucket: "charitydonation-f6ffa.appspot.com",
     messagingSenderId: "527082439076",
     appId: "1:527082439076:web:3d71b8e2aeebef8c8ec131"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to show donation modal
let currentDonationType = "";
export function showModal(donationType) {
    currentDonationType = donationType;
    document.getElementById("donationTitle").innerText = donationType;
    document.getElementById("donationModal").style.display = "flex";
}

// Function to close modal
export function closeModal() {
    document.getElementById("donationModal").style.display = "none";
    currentDonationType = "";
}
export async function submitDonation(event) {
    if (event) event.preventDefault(); 

    let donorName = document.getElementById("donorName").value;
    let donorEmail = document.getElementById("donorEmail").value;
    let donorPhone = document.getElementById("donorContact").value;
    let donationAmount = document.getElementById("donationAmount") ? document.getElementById("donationAmount").value : null;
    let additionalNotes = document.getElementById("additionalNotes") ? document.getElementById("additionalNotes").value : "";

    if (!donorName || !donorEmail || !donorPhone || !donationAmount) {
        alert("Please fill all required fields.");
        return;
    }

    let collectionName = "";
    if (currentDonationType === "Food for All") collectionName = "foodDonations";
    if (currentDonationType === "Fund Assistance") collectionName = "fundDonations";

    if (!collectionName) {
        alert("Invalid donation type.");
        return;
    }

    try {
        await addDoc(collection(db, collectionName), {
            name: donorName,
            email: donorEmail,
            phone: donorPhone,
            amount: donationAmount || "N/A",
            notes: additionalNotes
        });

        alert(`${currentDonationType} Donation Submitted Successfully!`);
        closeModal();
    } catch (error) {
        console.error("Error submitting donation:", error);
        alert("Error submitting donation. Please try again.");
    }
}





// Function to show clothing donation modal
export function showClothingModal() {
    document.getElementById("clothingDonationModal").style.display = "flex";
}

// Function to close clothing modal
export function closeClothingModal() {
    document.getElementById("clothingDonationModal").style.display = "none";
}

// Submit Clothing Donation
export async function submitClothingDonation(event) {

    if (event) event.preventDefault(); 
    let donorName = document.getElementById("clothingDonarName").value;
    let donorEmail = document.getElementById("clothingDonarEmail").value;
    let donorPhone = document.getElementById("donorPhone").value;
    let clothType = document.getElementById("clothType").value;
    let clothQuantity = document.getElementById("clothQuantity").value;
    let additionalNotes = document.getElementById("additionalNotes").value;


    console.log("Checking donorName element:", document.getElementById("donorName"));
console.log("Checking donorEmail element:", document.getElementById("donorEmail"));


    console.log("Donor Name:", donorName);
    console.log("Email:", donorEmail);
    console.log("Phone:", donorPhone);
    console.log("Clothing Type:", clothType);
    console.log("Quantity:", clothQuantity);

    if (!donorName || !donorEmail || !donorPhone || !clothQuantity) {
        alert("Please fill all required fields.");
        return;
    }

    try {
        await addDoc(collection(db, "clothingDonations"), {
            name: donorName,
            email: donorEmail,
            phone: donorPhone,
            clothingType: clothType,
            quantity: clothQuantity,
            notes: additionalNotes
        });

        alert("Donation Submitted Successfully!");
        closeClothingModal();
    } catch (error) {
        console.error("Error submitting donation:", error);
        alert("Error submitting donation. Please try again.");
    }
}








// Fetch and display clothing donations
export async function fetchClothingDonations() {
    const donationsList = document.getElementById("clothingDonationsList");
    donationsList.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "clothingDonations"));
    querySnapshot.forEach((doc) => {
        const donation = doc.data();
        donationsList.innerHTML += `
            <tr>
                <td>${donation.name}</td>
                <td>${donation.email}</td>
                <td>${donation.phone}</td>
                <td>${donation.clothingType}</td>
                <td>${donation.quantity}</td>
                <td>${donation.notes || "N/A"}</td>
            </tr>`;
    });
}




export async function fetchDonations(donationType, tableId) {
    const donationsList = document.getElementById(tableId);

    if (!donationsList) {
        console.error(`⚠️ Element #${tableId} NOT FOUND in the DOM!`);
        return;
    }

    donationsList.innerHTML = "<tr><td colspan='5'>Loading...</td></tr>"; // Show loading text

    let collectionName = donationType === "food" ? "foodDonations" : "fundDonations";

    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        console.log(`📌 Total ${donationType} Donations Fetched:`, querySnapshot.size);

        if (querySnapshot.empty) {
            donationsList.innerHTML = "<tr><td colspan='5'>No donations found.</td></tr>";
            return;
        }

        donationsList.innerHTML = ""; // Clear previous rows before adding new ones

        querySnapshot.forEach((doc) => {
            const donation = doc.data();
            console.log("✅ Donation Data:", donation); // Log each donation

            donationsList.innerHTML += `
                <tr>
                    <td>${donation.name || "N/A"}</td>
                    <td>${donation.email || "N/A"}</td>
                    <td>${donation.phone || "N/A"}</td>
                    <td>${donation.amount || "N/A"}</td>
                    <td>${donation.notes || "N/A"}</td>
                </tr>`;
        });

    } catch (error) {
        console.error("❌ Error Fetching Donations:", error);
        donationsList.innerHTML = `<tr><td colspan="5">Error fetching donations. Check console.</td></tr>`;
    }
}
// Payment processing using Razorpay
export function processPayment() {
    var donorName = document.getElementById("donorName").value;
    var donorContact = document.getElementById("donorContact").value;
    var donorEmail = document.getElementById("donorEmail").value;
    var donationAmount = document.getElementById("donationAmount").value;

    if (!donorName || !donorContact || !donorEmail || !donationAmount) {
        alert("Please fill in all the details before proceeding to payment.");
        return;
    }
    var donationType = document.getElementById("donationTitle").innerText; // Get type from modal
    var collectionName = donationType === "Food for All" ? "foodDonations" : "fundDonations";

    var options = {
        "key": "rzp_test_nqshwH9ZWOlWB1", // Replace with your Razorpay test API key
        "amount": donationAmount * 100,
        "currency": "INR",
        "name": "Charity Donation",
        "description": "Support a cause",
        "image": "img/logo.png",
        "handler": async function (response) {
            alert("✅ Payment successful! Payment ID: " + response.razorpay_payment_id);

            // Save to Firestore after successful payment
            try {
                await addDoc(collection(db, collectionName), {
                    name: donorName,
                    email: donorEmail,
                    phone: donorContact,
                    amount: donationAmount,
                    paymentId: response.razorpay_payment_id,
                    timestamp: new Date()
                });

                console.log(`✅ Donation recorded in Firestore (${collectionName})`);
                alert("🎉 Donation recorded successfully!");
            } catch (error) {
                console.error("❌ Error saving donation:", error);
                alert("⚠️ Error saving donation. Please check the console.");
            }

            closeModal(); // Close the donation modal
        },
        "prefill": {
            "name": donorName,
            "email": donorEmail,
            "contact": donorContact
        },
        "theme": {
            "color": "#ff6b6b"
        },
        "payment_capture": 1,
        "method": {
            "upi": true,
            "wallet": true,
            "card": true,
            "netbanking": true
        }
    };

    var rzp = new Razorpay(options);
    rzp.open();
}



// // Logout function
// export function logout() {
//     signOut(auth).then(() => {
//         alert("Logged out successfully.");
//         window.location.href = "index.html";
//     }).catch((error) => {
//         alert("Error logging out.");
//         console.error(error);
//     });
// }

// Attach event listeners




document.addEventListener("DOMContentLoaded", function () {
    let donateButton = document.querySelector(".btn-primary"); 
    let loginButton = document.getElementById("loginBtn"); 
    let modal = document.getElementById("loginModal");
    let closeModal = document.getElementById("closeModal");
    let logoutButton = document.getElementById("logoutButton");

    // Open modal safely
    if (donateButton) {
        donateButton.addEventListener("click", function (event) {
            event.preventDefault();
            modal?.classList.add('show'); // Check if modal exists
        });
    }

    if (loginButton) {
        loginButton.addEventListener("click", function (event) {
            event.preventDefault();
            modal?.classList.add('show');
        });
    }

    if (closeModal) {
        closeModal.addEventListener("click", function () {
            modal?.classList.remove('show');
        });
    }

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal?.classList.remove('show');
        }
    });

    // Toggle Login/Signup Forms
    let showLogin = document.getElementById("showLogin");
    let showSignup = document.getElementById("showSignup");

    if (showLogin) {
        showLogin.addEventListener("click", function (event) {
            event.preventDefault();
            document.getElementById("signupForm")?.style.setProperty("display", "none");
            document.getElementById("loginForm")?.style.setProperty("display", "block");
        });
    }

    if (showSignup) {
        showSignup.addEventListener("click", function (event) {
            event.preventDefault();
            document.getElementById("signupForm")?.style.setProperty("display", "block");
            document.getElementById("loginForm")?.style.setProperty("display", "none");
        });
    }

    // Firebase Signup
    let signupButton = document.getElementById("signupButton");
    if (signupButton) {
        signupButton.addEventListener("click", function () {
            let email = document.getElementById("signupEmail").value;
            let password = document.getElementById("signupPassword").value;

            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    Swal.fire("Success!", "Account created successfully.", "success").then(() => {
                        window.location.href = "dashboard.html";
                    });
                })
                .catch(error => Swal.fire("Error!", error.message, "error"));
        });
    }

    // Firebase Login
    let loginButtonAction = document.getElementById("loginButton");
    if (loginButtonAction) {
        loginButtonAction.addEventListener("click", function () {
            let email = document.getElementById("loginEmail").value;
            let password = document.getElementById("loginPassword").value;

            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    Swal.fire("Welcome!", "Login successful.", "success").then(() => {
                        window.location.href = "dashboard.html";
                    });
                })
                .catch(error => Swal.fire("Error!", error.message, "error"));
        });
    }

    // Firebase Logout
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            signOut(auth).then(() => {
                Swal.fire("Logged out!", "You have been logged out.", "success").then(() => {
                    window.location.href = "index.html";
                });
            }).catch(error => Swal.fire("Error!", error.message, "error"));
        });
    }
});

