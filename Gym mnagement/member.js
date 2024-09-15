// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBSXll3cKsXEj08IllQ6Psag59FKHVvIAk",
    authDomain: "gym-management-6e99d.firebaseapp.com",
    projectId: "gym-management-6e99d",
    storageBucket: "gym-management-6e99d.appspot.com",
    messagingSenderId: "159527884314",
    appId: "1:159527884314:web:cee2b018bfa989c9ed63a3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Logout function
function logout() {
    auth.signOut().then(() => {
        window.location.href = "index.html"; // Redirect to login page
    });
}

// Load Member Bills
function loadMemberBills() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            const uid = user.uid;
            db.collection('bills').where('memberId', '==', uid).get().then((snapshot) => {
                const billsList = document.getElementById('billsList');
                billsList.innerHTML = '';
                snapshot.forEach((doc) => {
                    const bill = doc.data();
                    billsList.innerHTML += `<p>Amount: ${bill.amount}, Due Date: ${bill.dueDate}</p>`;
                });
            });
        }
    });
}

// Load Notifications
function loadNotifications() {
    db.collection('notifications').get().then((snapshot) => {
        const notificationsList = document.getElementById('notificationsList');
        notificationsList.innerHTML = '';
        snapshot.forEach((doc) => {
            const notification = doc.data();
            notificationsList.innerHTML += `<p>${notification.message}</p>`;
        });
    });
}

// Load member bills and notifications when the page loads
window.onload = function() {
    loadMemberBills();
    loadNotifications();
};
