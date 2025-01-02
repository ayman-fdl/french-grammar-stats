// Function to send a message
function sendMessage() {
    const input = document.getElementById("user-input");
    const chatContainer = document.getElementById("chat-container");
    const userMessage = input.value.trim();

    if (userMessage) {
        // Display the user's message in the chat container
        displayUserMessage(userMessage, chatContainer);

        // Clear the input field
        input.value = "";

        // Scroll to the bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Send the message to the backend via fetch
        sendToBackend(userMessage, chatContainer);
    }
}

// Function to send the message to the backend
function sendToBackend(userMessage, chatContainer) {
    fetch('/submit/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: userMessage })
    })
    .then(response => response.json())
    .then(data => handleResponse(data, chatContainer))
    .catch(error => {
        console.error('Error:', error);
        displayBotMessage("Une erreur est survenue. Veuillez réessayer.", chatContainer);
    });
}

// Function to display the user's message
function displayUserMessage(userMessage, chatContainer) {
    const userBubble = document.createElement("div");
    userBubble.className = "message user";
    userBubble.innerHTML = `<div class="bubble">${userMessage}</div>`;
    chatContainer.appendChild(userBubble);
}

// Function to display the bot's response
function displayBotMessage(botMessage, chatContainer) {
    const botBubble = document.createElement("div");
    botBubble.className = "message bot";
    botBubble.innerHTML = `<div class="bubble">${botMessage}</div>`;
    chatContainer.appendChild(botBubble);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
}

// Handle the response from the backend
function handleResponse(data, chatContainer) {
    if (data.status === 'success') {
        displayBotMessage(data.processed_input, chatContainer);
    } else {
        displayBotMessage("Erreur dans le traitement de l'input.", chatContainer);
    }
}

// Event listener for the 'Enter' key to send the message
function checkEnter(event) {
    if (event.keyCode === 13) { // Check if the key is "Enter"
        sendMessage();
        event.preventDefault(); // Prevent default action (e.g., form submission)
    }
}

document.getElementById("exportPdfButton").addEventListener("click", function () {
    const dashboard = document.body;

    html2canvas(dashboard, {scale: 2, useCORS: true}).then(canvas => {
        const imgData = canvas.toDataURL("image/png");

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const pdf = new jspdf.jsPDF('p', 'px', [imgWidth, imgHeight]);

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        pdf.save("dashboard.pdf");
    });
});