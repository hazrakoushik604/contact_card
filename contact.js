// Get saved contacts from localStorage
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const contactForm = document.getElementById("contactForm");
const toggleFormBtn = document.getElementById("toggleFormBtn");

if (nameInput) {
    nameInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^A-Za-z ]/g, "");
    });
}

if (phoneInput) {
    phoneInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 10);
    });
}

if (toggleFormBtn && contactForm) {
    toggleFormBtn.addEventListener("click", function () {
        contactForm.classList.toggle("hidden");

        if (contactForm.classList.contains("hidden")) {
            toggleFormBtn.textContent = "Show Form";
        } else {
            toggleFormBtn.textContent = "Hide Form";
        }
    });
}

// Add Contact
function addContact() {

    // Get values from input
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let photo = document.getElementById("photo").value.trim();

    // Check empty fields
    if (name === "" || phone === "" || photo === "") {
        alert("Please fill all fields!");
        return;
    }

    // Validate contact name: only letters and spaces
    if (!/^[A-Za-z ]+$/.test(name)) {
        alert("Name must contain only letters and spaces.");
        return;
    }

    // Validate phone number: exactly 10 digits
    if (!/^\d{10}$/.test(phone)) {
        alert("Phone number must be exactly 10 digits.");
        return;
    }

    // Create contact object
    let contact = {
        name: name,
        phone: phone,
        photo: photo
    };

    // Add contact to array
    contacts.push(contact);

    // Save array to localStorage
    localStorage.setItem("contacts", JSON.stringify(contacts));

    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("photo").value = "";

    // Display contacts
    displayContacts();
}


// Display Contacts
function displayContacts() {

    let contactList = document.getElementById("contactList");

    contactList.innerHTML = "";

    contacts.forEach(function(contact, index) {

        contactList.innerHTML += `
            <div class="contact-card">

                <img src="${contact.photo}" alt="Profile Photo">

                <h2>${contact.name}</h2>

                <p>📞 ${contact.phone}</p>

                <button 
                    class="delete-btn"
                    onclick="deleteContact(${index})">
                    Delete
                </button>

            </div>
        `;
    });
}


// Delete Contact
function deleteContact(index) {

    contacts.splice(index, 1);

    // Update localStorage
    localStorage.setItem("contacts", JSON.stringify(contacts));

    // Display updated contacts
    displayContacts();
}


// Show saved contacts when page loads
displayContacts();

