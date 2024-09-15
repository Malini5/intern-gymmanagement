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

// Add Member
function addMember() {
    const memberName = document.getElementById('memberName').value;
    const memberEmail = document.getElementById('memberEmail').value;
    const memberPassword = document.getElementById('memberPassword').value;

    auth.createUserWithEmailAndPassword(memberEmail, memberPassword)
        .then((userCredential) => {
            const userId = userCredential.user.uid;
            db.collection('users').doc(userId).set({
                userType: 'member',
                name: memberName,
                email: memberEmail
            }).then(() => {
                alert('Member added successfully!');
                loadMembers();
            });
        }).catch((error) => {
            alert('Error adding member: ' + error.message);
        });
}

// Load Members List
function loadMembers() {
    db.collection('users').where('userType', '==', 'member').get().then((snapshot) => {
        const membersList = document.getElementById('membersList');
        membersList.innerHTML = '';
        const memberSelect = document.getElementById('memberSelect');
        memberSelect.innerHTML = '<option>Select Member</option>';

        snapshot.forEach((doc) => {
            const member = doc.data();
            membersList.innerHTML += `<p>${member.name} - ${member.email}</p>`;
            memberSelect.innerHTML += `<option value="${doc.id}">${member.name}</option>`;
        });
    });
}

// Create Bill
function createBill() {
    const memberId = document.getElementById('memberSelect').value;
    const amount = document.getElementById('billAmount').value;
    const dueDate = document.getElementById('billDueDate').value;

    db.collection('bills').add({
        memberId: memberId,
        amount: amount,
        dueDate: dueDate
    }).then(() => {
        alert('Bill created successfully!');
    }).catch((error) => {
        alert('Error creating bill: ' + error.message);
    });
}

// Send Notification
function sendNotification() {
    const message = document.getElementById('notificationMessage').value;
    db.collection('notifications').add({
        message: message,
        timestamp: new Date()
    }).then(() => {
        alert('Notification sent successfully!');
    }).catch((error) => {
        alert('Error sending notification: ' + error.message);
    });
}

// Load members when the page loads
window.onload = function() {
    loadMembers();
};
