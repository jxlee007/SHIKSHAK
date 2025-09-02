// Discord-Style Video Call Interface with Enhanced Features
class DiscordVideoInterface {
    constructor() {
        this.state = {
            isMuted: false,
            hasVideo: true,
            isScreenSharing: false,
            chatOpen: false,
            appsOpen: false,
            isRecording: true,
            connectionQuality: 'excellent',
            currentTime: { minutes: 15, seconds: 32 },
            activeTab: 'chat'
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.startTimer();
        this.initializeTranscript();
        this.loadExistingMessages();
    }
    
    bindEvents() {
        // Control buttons - ensure clean event handling
        const muteBtn = document.getElementById('muteBtn');
        if (muteBtn) {
            muteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMute();
            });
        }
        
        const videoBtn = document.getElementById('videoBtn');
        if (videoBtn) {
            videoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleVideo();
            });
        }
        
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.openScreenShareModal();
            });
        }
        
        const chatBtn = document.getElementById('chatBtn');
        if (chatBtn) {
            chatBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Chat button clicked'); // Debug log
                this.toggleChat();
            });
        }
        
        const appsBtn = document.getElementById('appsBtn');
        if (appsBtn) {
            appsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Apps button clicked'); // Debug log
                this.toggleApps();
            });
        }
        
        const endCallBtn = document.getElementById('endCallBtn');
        if (endCallBtn) {
            endCallBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.endCall();
            });
        }
        
        // Chat panel controls
        const closeChatBtn = document.getElementById('closeChatBtn');
        if (closeChatBtn) {
            closeChatBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleChat();
            });
        }
        
        // Tab switching - fix the tab switching logic
        const chatTab = document.getElementById('chatTab');
        if (chatTab) {
            chatTab.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Chat tab clicked'); // Debug log
                this.switchTab('chat');
            });
        }
        
        const transcriptTab = document.getElementById('transcriptTab');
        if (transcriptTab) {
            transcriptTab.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Transcript tab clicked'); // Debug log
                this.switchTab('transcript');
            });
        }
        
        // Chat functionality
        const sendBtn = document.getElementById('sendBtn');
        if (sendBtn) {
            sendBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.sendMessage();
            });
        }
        
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }
        
        const uploadBtn = document.getElementById('uploadBtn');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.triggerFileUpload();
            });
        }
        
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        }
        
        // Screen share modal
        const closeShareModal = document.getElementById('closeShareModal');
        if (closeShareModal) {
            closeShareModal.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeScreenShareModal();
            });
        }
        
        document.querySelectorAll('.share-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.selectShareOption(e);
            });
        });
        
        // Apps modal
        const closeAppsModal = document.getElementById('closeAppsModal');
        if (closeAppsModal) {
            closeAppsModal.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleApps();
            });
        }
        
        document.querySelectorAll('.discord-app-block').forEach(block => {
            block.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.openApp(e);
            });
        });
        
        // Transcript interactions
        document.querySelectorAll('.transcript-message').forEach(msg => {
            msg.addEventListener('click', (e) => this.highlightTranscriptMessage(e));
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Close modals on outside click - but not panels
        const screenShareModal = document.getElementById('screenShareModal');
        if (screenShareModal) {
            screenShareModal.addEventListener('click', (e) => {
                if (e.target.id === 'screenShareModal') {
                    this.closeScreenShareModal();
                }
            });
        }
    }
    
    // Tab Management - Fixed implementation
    switchTab(tabName) {
        console.log('Switching to tab:', tabName); // Debug log
        this.state.activeTab = tabName;
        
        // Update tab buttons
        document.querySelectorAll('.chat-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        const activeTabBtn = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeTabBtn) {
            activeTabBtn.classList.add('active');
        }
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const activeContent = document.querySelector(`.tab-content[data-tab="${tabName}"]`);
        if (activeContent) {
            activeContent.classList.add('active');
        }
        
        // Focus chat input when switching to chat tab
        if (tabName === 'chat') {
            setTimeout(() => {
                const chatInput = document.getElementById('chatInput');
                if (chatInput) chatInput.focus();
            }, 100);
        }
        
        this.showNotification(`📋 Switched to ${tabName === 'chat' ? 'Chat' : 'AI Transcript'}`);
    }
    
    // Control Functions - Fixed implementations
    toggleMute() {
        this.state.isMuted = !this.state.isMuted;
        const muteBtn = document.getElementById('muteBtn');
        const icon = muteBtn?.querySelector('.material-symbols-outlined');
        
        if (this.state.isMuted) {
            muteBtn?.classList.add('muted');
            if (icon) icon.textContent = 'mic_off';
            if (muteBtn) muteBtn.title = 'Unmute';
        } else {
            muteBtn?.classList.remove('muted');
            if (icon) icon.textContent = 'mic';
            if (muteBtn) muteBtn.title = 'Mute';
        }
        
        // Update user video audio indicator
        const audioStatus = document.querySelector('.user-video .audio-status');
        if (audioStatus) {
            const audioIcon = audioStatus.querySelector('.material-symbols-outlined');
            if (audioIcon) {
                audioIcon.textContent = this.state.isMuted ? 'mic_off' : 'mic';
            }
        }
        
        this.showNotification(this.state.isMuted ? '🔇 Microphone muted' : '🎤 Microphone unmuted');
    }
    
    toggleVideo() {
        this.state.hasVideo = !this.state.hasVideo;
        const videoBtn = document.getElementById('videoBtn');
        const icon = videoBtn?.querySelector('.material-symbols-outlined');
        
        if (!this.state.hasVideo) {
            videoBtn?.classList.add('active');
            if (icon) icon.textContent = 'videocam_off';
            if (videoBtn) videoBtn.title = 'Turn on camera';
        } else {
            videoBtn?.classList.remove('active');
            if (icon) icon.textContent = 'videocam';
            if (videoBtn) videoBtn.title = 'Turn off camera';
        }
        
        this.showNotification(this.state.hasVideo ? '📹 Camera turned on' : '📹 Camera turned off');
    }
    
    toggleChat() {
        console.log('Toggle chat called, current state:', this.state.chatOpen); // Debug log
        this.state.chatOpen = !this.state.chatOpen;
        const chatPanel = document.getElementById('chatPanel');
        const chatBtn = document.getElementById('chatBtn');
        
        if (this.state.chatOpen) {
            console.log('Opening chat panel'); // Debug log
            if (chatPanel) chatPanel.classList.remove('hidden');
            if (chatBtn) chatBtn.classList.add('active');
            // Close apps if open
            if (this.state.appsOpen) this.toggleApps();
            // Focus on chat input after animation
            setTimeout(() => {
                if (this.state.activeTab === 'chat') {
                    const chatInput = document.getElementById('chatInput');
                    if (chatInput) chatInput.focus();
                }
            }, 300);
            this.showNotification('💬 Chat panel opened');
        } else {
            console.log('Closing chat panel'); // Debug log
            if (chatPanel) chatPanel.classList.add('hidden');
            if (chatBtn) chatBtn.classList.remove('active');
            this.showNotification('💬 Chat panel closed');
        }
    }
    
    toggleApps() {
        console.log('Toggle apps called, current state:', this.state.appsOpen); // Debug log
        this.state.appsOpen = !this.state.appsOpen;
        const appsModal = document.getElementById('appsModal');
        const appsBtn = document.getElementById('appsBtn');
        
        if (this.state.appsOpen) {
            console.log('Opening apps modal'); // Debug log
            if (appsModal) appsModal.classList.remove('hidden');
            if (appsBtn) appsBtn.classList.add('active');
            this.showNotification('🎯 Apps panel opened');
        } else {
            console.log('Closing apps modal'); // Debug log
            if (appsModal) appsModal.classList.add('hidden');
            if (appsBtn) appsBtn.classList.remove('active');
            this.showNotification('🎯 Apps panel closed');
        }
    }
    
    openScreenShareModal() {
        const modal = document.getElementById('screenShareModal');
        if (modal) modal.classList.remove('hidden');
    }
    
    closeScreenShareModal() {
        const modal = document.getElementById('screenShareModal');
        if (modal) modal.classList.add('hidden');
    }
    
    selectShareOption(e) {
        const option = e.currentTarget;
        const type = option.dataset.type;
        
        // Simulate screen sharing start
        this.state.isScreenSharing = true;
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.classList.add('active');
            shareBtn.title = 'Stop sharing';
            const shareIcon = shareBtn.querySelector('.material-symbols-outlined');
            if (shareIcon) shareIcon.textContent = 'stop_screen_share';
        }
        
        this.closeScreenShareModal();
        this.showNotification(`🖥️ Started sharing ${type === 'entire' ? 'entire screen' : type === 'window' ? 'application window' : 'browser tab'}`);
        
        // Auto-stop sharing after demo
        setTimeout(() => {
            this.stopScreenShare();
        }, 8000);
    }
    
    stopScreenShare() {
        this.state.isScreenSharing = false;
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.classList.remove('active');
            shareBtn.title = 'Share screen';
            const shareIcon = shareBtn.querySelector('.material-symbols-outlined');
            if (shareIcon) shareIcon.textContent = 'screen_share';
        }
        this.showNotification('🖥️ Stopped screen sharing');
    }
    
    endCall() {
        if (confirm('Are you sure you want to end the call?')) {
            this.showNotification('📞 Call ended. Thank you for using our platform!');
            // In a real app, this would redirect or close the window
            setTimeout(() => {
                document.body.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; font-size: 1.5rem; color: var(--color-text); background-color: var(--color-background); text-align: center; gap: 20px;">
                        <div style="font-size: 3rem;">📞</div>
                        <div>Call ended</div>
                        <div style="font-size: 1rem; color: var(--color-text-secondary);">You can close this window</div>
                    </div>
                `;
            }, 2000);
        }
    }
    
    // Chat Functions
    sendMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput?.value.trim();
        
        if (!message) return;
        
        // Check if it's a @note command
        if (message.startsWith('@note ')) {
            this.handleNoteCommand(message);
        } else {
            // Regular chat message
            this.addChatMessage('user', 'John Doe', message, null);
            this.simulateAIResponse();
        }
        
        if (chatInput) chatInput.value = '';
    }
    
    handleNoteCommand(message) {
        // Extract note content after @note
        const noteContent = message.substring(6).trim(); // Remove '@note ' prefix
        
        if (!noteContent) {
            this.showNotification('❌ Note cannot be empty. Use: @note [your note content]');
            return;
        }
        
        const timestamp = this.formatTimestamp(this.state.currentTime);
        this.addNoteMessage('John Doe', noteContent, timestamp);
        this.showNotification('📝 Note added with timestamp');
    }
    
    addChatMessage(type, sender, text, timestamp) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}`;
        
        if (type !== 'system') {
            messageDiv.innerHTML = `
                <div class="chat-sender">${sender}</div>
                <span class="chat-text">${text}</span>
            `;
        } else {
            messageDiv.innerHTML = `<span class="chat-text">${text}</span>`;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add animation
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(10px)';
        setTimeout(() => {
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
            messageDiv.style.transition = 'all 0.3s ease-out';
        }, 10);
    }
    
    addNoteMessage(sender, text, timestamp) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const noteDiv = document.createElement('div');
        noteDiv.className = 'chat-message note';
        noteDiv.innerHTML = `
            <div class="note-header">
                <span class="material-symbols-outlined">note_alt</span>
                <span class="note-sender">${sender}</span>
                <span class="note-timestamp">${timestamp}</span>
            </div>
            <span class="chat-text">${text}</span>
        `;
        
        chatMessages.appendChild(noteDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add animation
        noteDiv.style.opacity = '0';
        noteDiv.style.transform = 'translateY(10px)';
        setTimeout(() => {
            noteDiv.style.opacity = '1';
            noteDiv.style.transform = 'translateY(0)';
            noteDiv.style.transition = 'all 0.3s ease-out';
        }, 10);
    }
    
    simulateAIResponse() {
        setTimeout(() => {
            const responses = [
                "That's an excellent point! Let me elaborate on that. 🎯",
                "I love your entrepreneurial mindset! Here's what I'd suggest... 🚀",
                "Great question! This is exactly the kind of thinking that leads to success. 💡",
                "You're absolutely on the right track. Let's dive deeper into this concept. 📈",
                "Fantastic insight! This shows you understand the fundamentals. 💪",
                "That's the mindset of a true hustler! Keep that energy going! ⚡"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            this.addChatMessage('agent', 'Hustle Coach', randomResponse, null);
        }, 1000 + Math.random() * 2000);
    }
    
    triggerFileUpload() {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) fileInput.click();
    }
    
    handleFileUpload(e) {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            const fileType = file.type.startsWith('image/') ? '🖼️' : '📁';
            this.addChatMessage('user', 'John Doe', `${fileType} Shared file: ${file.name}`, null);
        });
        
        // Reset file input
        e.target.value = '';
        
        if (files.length > 0) {
            this.showNotification(`📎 ${files.length} file(s) shared successfully`);
        }
    }
    
    // Apps Functions
    openApp(e) {
        const appBlock = e.currentTarget;
        const appName = appBlock.querySelector('.app-name')?.textContent;
        const appIcon = appBlock.querySelector('.app-icon')?.textContent;
        
        if (appName) {
            this.showNotification(`${appIcon} Opening ${appName}...`);
            this.toggleApps(); // Close apps modal
            
            // In a real app, this would open the actual application
            setTimeout(() => {
                this.showNotification(`✅ ${appName} is now available in a new window`);
            }, 1500);
        }
    }
    
    // Transcript Functions
    initializeTranscript() {
        const transcriptData = [
            {
                timestamp: "00:13:45",
                speaker: "Hustle Coach",
                text: "Don't just build another me-too product. Find the gap that makes people say 'How did I live without this?' That's your golden ticket to unicorn status!",
                id: "t_3"
            },
            {
                timestamp: "00:14:20",
                speaker: "John",
                text: "How do I validate if there's real market demand?",
                id: "t_4"
            },
            {
                timestamp: "00:14:25",
                speaker: "Hustle Coach",
                text: "Get out of the building! Talk to 100 potential customers. If 80% say they'd pay for your solution, you're onto something. If not, pivot faster than a startup running out of runway!",
                id: "t_5"
            }
        ];
        
        const transcriptContent = document.getElementById('transcriptContent');
        if (!transcriptContent) return;
        
        // Add remaining transcript messages with delay
        transcriptData.forEach((item, index) => {
            setTimeout(() => {
                const messageDiv = document.createElement('div');
                messageDiv.className = 'transcript-message';
                messageDiv.dataset.timestamp = item.timestamp;
                messageDiv.dataset.id = item.id;
                messageDiv.innerHTML = `
                    <span class="timestamp">${item.timestamp}</span>
                    <span class="speaker-name ${item.speaker === 'John' ? 'user' : 'agent'}">${item.speaker}:</span>
                    <span class="message-text">"${item.text}"</span>
                `;
                
                // Add click handler
                messageDiv.addEventListener('click', (e) => this.highlightTranscriptMessage(e));
                
                transcriptContent.appendChild(messageDiv);
                transcriptContent.scrollTop = transcriptContent.scrollHeight;
            }, (index + 1) * 4000);
        });
    }
    
    highlightTranscriptMessage(e) {
        // Remove previous highlights
        document.querySelectorAll('.transcript-message').forEach(msg => {
            msg.style.backgroundColor = '';
            msg.style.color = '';
        });
        
        // Highlight selected message
        const message = e.currentTarget;
        message.style.backgroundColor = 'var(--color-primary)';
        message.style.color = 'var(--color-btn-primary-text)';
        
        const timestamp = message.dataset.timestamp;
        this.showNotification(`🎯 Selected transcript at ${timestamp}`);
        
        // Remove highlight after 3 seconds
        setTimeout(() => {
            message.style.backgroundColor = '';
            message.style.color = '';
        }, 3000);
    }
    
    // Load existing messages
    loadExistingMessages() {
        // This simulates loading existing chat messages and notes
        setTimeout(() => {
            // Add some activity to make it feel live
            this.simulateIncomingTranscript();
        }, 2000);
    }
    
    simulateIncomingTranscript() {
        const newTranscripts = [
            {
                timestamp: this.formatTimestamp(this.state.currentTime),
                speaker: "Hustle Coach",
                text: "Remember, execution beats perfection every time. Start building, start testing, start learning!"
            }
        ];
        
        setTimeout(() => {
            const transcriptContent = document.getElementById('transcriptContent');
            if (!transcriptContent) return;
            
            newTranscripts.forEach(item => {
                const messageDiv = document.createElement('div');
                messageDiv.className = 'transcript-message';
                messageDiv.innerHTML = `
                    <span class="timestamp">${item.timestamp}</span>
                    <span class="speaker-name agent">${item.speaker}:</span>
                    <span class="message-text">"${item.text}"</span>
                `;
                
                messageDiv.addEventListener('click', (e) => this.highlightTranscriptMessage(e));
                transcriptContent.appendChild(messageDiv);
                transcriptContent.scrollTop = transcriptContent.scrollHeight;
            });
        }, 5000);
    }
    
    // Timer Functions
    startTimer() {
        setInterval(() => {
            this.state.currentTime.seconds++;
            if (this.state.currentTime.seconds >= 60) {
                this.state.currentTime.seconds = 0;
                this.state.currentTime.minutes++;
            }
            
            const timerDisplay = document.querySelector('.session-timer');
            if (timerDisplay) {
                timerDisplay.textContent = this.formatTimestamp(this.state.currentTime);
            }
            
            // Milestone celebrations
            if (this.state.currentTime.seconds === 0 && this.state.currentTime.minutes % 20 === 0) {
                this.showNotification(`🎉 ${this.state.currentTime.minutes} minutes milestone reached!`);
            }
        }, 1000);
    }
    
    formatTimestamp(time) {
        const minutes = String(time.minutes).padStart(2, '0');
        const seconds = String(time.seconds).padStart(2, '0');
        return `00:${minutes}:${seconds}`;
    }
    
    // Keyboard Shortcuts
    handleKeyboardShortcuts(e) {
        // Only handle shortcuts if not typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        switch (e.key.toLowerCase()) {
            case 'm':
                e.preventDefault();
                this.toggleMute();
                break;
            case 'v':
                e.preventDefault();
                this.toggleVideo();
                break;
            case 'c':
                e.preventDefault();
                this.toggleChat();
                break;
            case 'a':
                e.preventDefault();
                this.toggleApps();
                break;
            case 's':
                e.preventDefault();
                this.openScreenShareModal();
                break;
            case '1':
                e.preventDefault();
                if (this.state.chatOpen) this.switchTab('chat');
                break;
            case '2':
                e.preventDefault();
                if (this.state.chatOpen) this.switchTab('transcript');
                break;
            case 'escape':
                e.preventDefault();
                // Close any open panels or modals
                if (this.state.chatOpen) this.toggleChat();
                if (this.state.appsOpen) this.toggleApps();
                this.closeScreenShareModal();
                break;
        }
    }
    
    // Utility Functions
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background-color: var(--color-surface);
            color: var(--color-text);
            padding: 12px 16px;
            border-radius: 12px;
            border: 1px solid var(--color-border);
            box-shadow: var(--shadow-lg);
            z-index: 4000;
            font-size: 14px;
            font-weight: 500;
            max-width: 320px;
            transform: translateX(100%);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            backdrop-filter: blur(10px);
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    updateConnectionQuality() {
        const qualities = ['excellent', 'good', 'poor'];
        const randomQuality = qualities[Math.floor(Math.random() * qualities.length)];
        
        const indicator = document.getElementById('connectionIndicator');
        if (indicator) {
            indicator.className = `connection-indicator ${randomQuality}`;
            
            const icon = indicator.querySelector('.material-symbols-outlined');
            if (icon) {
                switch (randomQuality) {
                    case 'excellent':
                        icon.textContent = 'signal_cellular_4_bar';
                        break;
                    case 'good':
                        icon.textContent = 'signal_cellular_3_bar';
                        break;
                    case 'poor':
                        icon.textContent = 'signal_cellular_1_bar';
                        break;
                }
            }
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app'); // Debug log
    const app = new DiscordVideoInterface();
    
    // Make app globally available for debugging
    window.discordApp = app;
    
    // Simulate connection quality changes
    setInterval(() => {
        app.updateConnectionQuality();
    }, 15000);
    
    // Welcome message sequence
    setTimeout(() => {
        app.showNotification('🚀 Welcome to your Discord-style coaching session!');
    }, 1000);
    
    setTimeout(() => {
        app.showNotification('💡 Use @note [text] to create timestamped notes');
    }, 3000);
    
    setTimeout(() => {
        app.showNotification('⌨️ Press C for chat, A for apps, M to mute');
    }, 5000);
});