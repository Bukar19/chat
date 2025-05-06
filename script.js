 document.addEventListener('DOMContentLoaded', function() {
            const messagesArea = document.getElementById('messages-area');
            const messageInput = document.getElementById('message-input');
            const sendButton = document.getElementById('send-button');
            const user1Toggle = document.getElementById('user1-toggle');
            const user2Toggle = document.getElementById('user2-toggle');
            
            // Default active user
            let activeUser = 'user1';
            
            // User information
            const users = {
                user1: {
                    name: 'Haruna',
                    color: '#e3f2fd'
                },
                user2: {
                    name: 'Fadimatu',
                    color: '#f1f1f1'
                }
            };
            
            // Chat message history
            const chatHistory = [];
            
            // Toggle between users
            user1Toggle.addEventListener('click', function() {
                activeUser = 'user1';
                updateActiveUserUI();
            });
            
            user2Toggle.addEventListener('click', function() {
                activeUser = 'user2';
                updateActiveUserUI();
            });
            
            function updateActiveUserUI() {
                // Update toggle buttons
                user1Toggle.classList.toggle('active', activeUser === 'user1');
                user2Toggle.classList.toggle('active', activeUser === 'user2');
                
                // Update input placeholder
                messageInput.placeholder = `Type as ${users[activeUser].name}...`;
            }
            
            // Function to add a message to the chat
            function addMessage(user, text) {
                const timestamp = new Date();
                
                // Create message object
                const messageObj = {
                    user: user,
                    text: text,
                    timestamp: timestamp
                };
                
                // Add to history
                chatHistory.push(messageObj);
                
                // Create DOM elements
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message');
                messageDiv.classList.add(`message-${user}`);
                
                const usernameDiv = document.createElement('div');
                usernameDiv.classList.add('message-username');
                usernameDiv.textContent = users[user].name;
                
                const textDiv = document.createElement('div');
                textDiv.textContent = text;
                
                const timeDiv = document.createElement('div');
                timeDiv.classList.add('timestamp');
                timeDiv.textContent = formatTime(timestamp);
                
                messageDiv.appendChild(usernameDiv);
                messageDiv.appendChild(textDiv);
                messageDiv.appendChild(timeDiv);
                
                messagesArea.appendChild(messageDiv);
                
                // Scroll to the bottom of messages area
                messagesArea.scrollTop = messagesArea.scrollHeight;
            }
            
            function formatTime(date) {
                return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            }
            
            // Event listeners
            sendButton.addEventListener('click', sendMessage);
            messageInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
            
            // Function to handle sending a message
            function sendMessage() {
                const messageText = messageInput.value.trim();
                
                if (messageText !== '') {
                    // Add message to chat
                    addMessage(activeUser, messageText);
                    
                    // Clear input field
                    messageInput.value = '';
                }
            }
            
            // Add welcome message
            addMessage('user2', 'Hello Haruna! This is Fadimatu. Welcome to our chat!');
            
            // Initialize UI
            updateActiveUserUI();
        });