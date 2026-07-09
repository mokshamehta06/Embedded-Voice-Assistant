(function () {
    const script = document.currentScript;
    const userId = script ? script.dataset.userId : null;

    if (!userId) {
        console.error("[VoiceAssistant] Missing data-user-id on script tag.");
        return;
    }

    const SERVER_URL = "http://localhost:5000";
    const CLIENT_URL = "http://localhost:5173";

    let assistantConfig = null;
    // Load CSS
    const link = document.createElement("link");
    link.href = CLIENT_URL + "/assistant.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Load Google Font
    const font = document.createElement("link");
    font.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
    font.rel = "stylesheet";
    document.head.appendChild(font);

    // Fetch assistant config from server (using the public route)
    fetch(SERVER_URL + "/api/assistant/assistant-config/" + userId)
        .then(function (res) { return res.json(); })
        .then(function (data) {
            const config = data.user || data; // handle both data shapes just in case
            if (!config || !config.assistantName) {
                console.error("[VoiceAssistant] Invalid config:", config);
                return;
            }
            buildWidget(config);
        })
        .catch(function (err) {
            console.error("[VoiceAssistant] Failed to load config:", err);
        });

    function buildWidget(config) {
        var theme = config.theme || "dark";
        var name = config.assistantName || "AI Assistant";
        var enableVoice = config.enableVoice !== false;

        // ── Floating Trigger Button ──
        var trigger = document.createElement("button");
        trigger.className = "voiceass-trigger";
        trigger.setAttribute("aria-label", "Open " + name);
        trigger.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"></path></svg>';
        document.body.appendChild(trigger);

        // ── Widget Container ──
        var widget = document.createElement("div");
        widget.className = "voiceass theme-" + theme;
        widget.style.display = "none";

        widget.innerHTML =
            // Header
            '<div class="va-header">' +
                '<div class="va-header-left">' +
                    '<div class="va-status-dot"></div>' +
                    '<span class="va-header-title">' + name + '</span>' +
                '</div>' +
                '<button class="va-close-btn" aria-label="Close">' +
                    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>' +
                '</button>' +
            '</div>' +

            // Body
            '<div class="va-body">' +
                '<div class="va-welcome">' +
                    // Gradient orb
                    '<div class="va-orb">' +
                        '<div class="va-orb-inner"></div>' +
                    '</div>' +
                    // Welcome text
                    '<h3 class="va-welcome-title">Hello! I\'m ' + name + '</h3>' +
                    '<p class="va-welcome-sub">Your smart voice assistant.<br>Ask anything about your website.</p>' +
                    (enableVoice ? '<p class="va-welcome-cta">Tap button to Speak</p>' : '') +
                '</div>' +
                // Messages will go here
                '<div class="va-messages"></div>' +
            '</div>' +

            // Footer
            '<div class="va-footer">' +
                '<div class="va-input-wrap">' +
                    '<input type="text" class="va-input" placeholder="Type a message..." />' +
                    '<button class="va-send-btn" aria-label="Send">' +
                        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>' +
                    '</button>' +
                '</div>' +
                (enableVoice ?
                    '<button class="va-mic-btn" aria-label="Speak">' +
                        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"/></svg>' +
                    '</button>'
                : '') +
            '</div>';

        document.body.appendChild(widget);

        // ── Event Listeners ──
        trigger.addEventListener("click", function () {
            widget.style.display = "flex";
            trigger.style.display = "none";
        });

        widget.querySelector(".va-close-btn").addEventListener("click", function () {
            widget.style.display = "none";
            trigger.style.display = "flex";
        });

        // Send message on Enter or click
        var input = widget.querySelector(".va-input");
        var sendBtn = widget.querySelector(".va-send-btn");
        var messagesDiv = widget.querySelector(".va-messages");
        var welcomeDiv = widget.querySelector(".va-welcome");

        function sendMessage() {
            var text = input.value.trim();
            if (!text) return;

            // Hide only title and subtitle so orb and status remain visible
            var title = widget.querySelector(".va-welcome-title");
            var sub = widget.querySelector(".va-welcome-sub");
            if (title) title.style.display = "none";
            if (sub) sub.style.display = "none";

            // Add user message
            var userMsg = document.createElement("div");
            userMsg.className = "va-msg va-msg-user";
            userMsg.textContent = text;
            messagesDiv.appendChild(userMsg);
            input.value = "";

            // Scroll to bottom
            messagesDiv.scrollTop = messagesDiv.scrollHeight;

            // Send to AI backend and display response
            var typing = document.createElement("div");
            typing.className = "va-typing";
            typing.innerHTML = '<span></span><span></span><span></span>';
            messagesDiv.appendChild(typing);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;

            fetch(SERVER_URL + "/api/assistant/ask-assistant", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text, userId: userId })
            })
            .then(function(res) { return res.json(); })
            .then(function(data) {
                typing.remove();
                var aiMsg = document.createElement("div");
                aiMsg.className = "va-msg va-msg-ai";
                aiMsg.textContent = data.response || data.message || "No response";
                messagesDiv.appendChild(aiMsg);
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
                
                // Call speak function with the AI response!
                if (typeof speak === "function") {
                    speak(aiMsg.textContent);
                }
            })
            .catch(function(err) {
                typing.remove();
                var aiMsg = document.createElement("div");
                aiMsg.className = "va-msg va-msg-ai";
                aiMsg.textContent = "Failed to connect to assistant.";
                messagesDiv.appendChild(aiMsg);
            });
        }

        sendBtn.addEventListener("click", sendMessage);
        input.addEventListener("keydown", function (e) {
            if (e.key === "Enter") sendMessage();
        });

        // Mic button (voice)
        if (enableVoice) {
            var micBtn = widget.querySelector(".va-mic-btn");
            var recognition = null;

            if (window.SpeechRecognition || window.webkitSpeechRecognition) {
                var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;

                recognition.onresult = (e) => {
                    const text = e.results[0][0].transcript;
                    input.value = text;
                    
                    micBtn.classList.remove("listening");
                    var ctaText = widget.querySelector(".va-welcome-cta");
                    if (ctaText) ctaText.textContent = "Tap button to Speak";
                    var orbInner = widget.querySelector(".va-orb-inner");
                    if (orbInner) orbInner.style.opacity = "0";
                    
                    recognition.stop();
                    sendMessage();
                };

                recognition.onerror = function (event) {
                    console.error("Speech Recognition Error:", event.error);
                    micBtn.classList.remove("listening");
                    var ctaText = widget.querySelector(".va-welcome-cta");
                    if (ctaText) ctaText.textContent = "Tap button to Speak";
                    var orbInner = widget.querySelector(".va-orb-inner");
                    if (orbInner) orbInner.style.opacity = "0";
                };

                recognition.onend = function () {
                    micBtn.classList.remove("listening");
                    var ctaText = widget.querySelector(".va-welcome-cta");
                    if (ctaText) ctaText.textContent = "Tap button to Speak";
                    var orbInner = widget.querySelector(".va-orb-inner");
                    if (orbInner) orbInner.style.opacity = "0";
                };
            }

            if (micBtn) {
                micBtn.addEventListener("click", function () {
                    var ctaText = widget.querySelector(".va-welcome-cta");
                    var orbInner = widget.querySelector(".va-orb-inner");
                    if (!recognition) {
                        alert("Speech recognition is not supported in this browser.");
                        return;
                    }
                    if (micBtn.classList.contains("listening")) {
                        recognition.stop();
                        micBtn.classList.remove("listening");
                        if (ctaText) ctaText.textContent = "Tap button to Speak";
                        if (orbInner) orbInner.style.opacity = "0";
                    } else {
                        recognition.start();
                        micBtn.classList.add("listening");
                        if (ctaText) ctaText.textContent = "Listening...";
                        if (orbInner) orbInner.style.opacity = "1";
                    }
                });
            }
        }
    }

    //load assistant
    const loadAssistant = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/api/assistant/assistant-config/${userId}`);
            const data = await response.json();
            console.log(data);

            if (data) {
                assistantConfig = data.user;
            }
        } catch (error) {
            console.log(
                "Assistant Load Error:",
                error
            );
        }
    };
    loadAssistant();
    // text-speech
    const speak = (text) => {
        window.speechSynthesis.cancel();
        
        // Map tutorial variables to your HTML classes
        const aiText = document.querySelector(".va-msg-ai:last-child"); 
        const status = document.querySelector(".va-welcome-cta");
        const wave = document.querySelector(".va-orb-inner");

        // Show AI response
        if (aiText) {
            aiText.innerText = text;
        }
        
        if (status) {
            status.innerText = "AI Speaking...";
        }

        const speech = new SpeechSynthesisUtterance(text);
        
        speech.lang = "hi-IN";
        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;

        // Voice end
        speech.onend = () => {
            if (status) {
                status.innerText = "Tap button to Speak";
            }
            if (wave) {
                wave.style.opacity = "0";
            }
        };

        // Start speaking
        window.speechSynthesis.speak(speech);
    };
})();
