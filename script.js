document.addEventListener("DOMContentLoaded", () => {
  // 1. आज की तारीख इनपुट में डिफ़ॉल्ट सेट करें
  const bookDateInput = document.getElementById("bookDateInput");
  if (bookDateInput) {
    const today = new Date().toISOString().split("T")[0];
    bookDateInput.value = today;
  }

  // 2. टैब नेविगेशन स्विचिंग
  const navItems = document.querySelectorAll(".nav-item");
  const tabContents = document.querySelectorAll(".tab-content");

  function switchTab(targetTabId) {
    tabContents.forEach(tab => tab.classList.remove("active"));
    navItems.forEach(item => item.classList.remove("active"));

    const selectedTab = document.getElementById(`tab-${targetTabId}`);
    if (selectedTab) selectedTab.classList.add("active");

    const activeNav = document.querySelector(`.nav-item[data-tab="${targetTabId}"]`);
    if (activeNav) activeNav.classList.add("active");
  }

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const tabId = item.getAttribute("data-tab");
      switchTab(tabId);
    });
  });

  // होम स्क्रीन के सर्विस कार्ड्स पर क्लिक करके सीधा उस टैब पर जाना
  document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("click", () => {
      const target = card.getAttribute("data-target");
      switchTab(target);
    });
  });

  // 3. फसल डॉक्टर: गैलरी व कैमरा अपलोड और रोग पहचान
  const uploadZone = document.getElementById("uploadZone");
  const cropFileInput = document.getElementById("cropFileInput");
  const previewBox = document.getElementById("previewBox");
  const imagePreview = document.getElementById("imagePreview");
  const removeImgBtn = document.getElementById("removeImgBtn");
  const runScanBtn = document.getElementById("runScanBtn");
  const scanLoader = document.getElementById("scanLoader");
  const scanResult = document.getElementById("scanResult");

  uploadZone.addEventListener("click", () => {
    cropFileInput.click();
  });

  cropFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        imagePreview.src = evt.target.result;
        uploadZone.classList.add("hidden");
        previewBox.classList.remove("hidden");
        scanResult.classList.add("hidden");
      };
      reader.readAsDataURL(file);
    }
  });

  removeImgBtn.addEventListener("click", () => {
    cropFileInput.value = "";
    previewBox.classList.add("hidden");
    uploadZone.classList.remove("hidden");
    scanResult.classList.add("hidden");
    scanLoader.classList.add("hidden");
  });

  runScanBtn.addEventListener("click", () => {
    previewBox.classList.add("hidden");
    scanLoader.classList.remove("hidden");

    setTimeout(() => {
      scanLoader.classList.add("hidden");
      previewBox.classList.remove("hidden");
      scanResult.classList.remove("hidden");
    }, 1500);
  });

  // 4. खाद-दवा टोकन बुकिंग
  document.querySelectorAll(".token-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.getAttribute("data-item");
      const tokenNum = Math.floor(1000 + Math.random() * 9000);
      alert(`✅ सफल! आपका ${item} के लिए ऑनलाइन टोकन बुक हो गया है।\nटोकन नंबर: AGP-${tokenNum}\nकृपया 24 घंटे में केंद्र पर जाकर खाद प्राप्त करें।`);
    });
  });

  // 5. ट्रैक्टर 2-वे बुकिंग सिस्टम
  const bookingModal = document.getElementById("bookingModal");
  const bookSlotBtn = document.getElementById("bookSlotBtn");
  const closeBookingModal = document.getElementById("closeBookingModal");
  const submitRequestBtn = document.getElementById("submitRequestBtn");
  const tractorActionRamlal = document.getElementById("tractorActionRamlal");
  const chatModal = document.getElementById("chatModal");
  const closeChatModal = document.getElementById("closeChatModal");

  bookSlotBtn.addEventListener("click", () => {
    bookingModal.classList.remove("hidden");
  });

  closeBookingModal.addEventListener("click", () => {
    bookingModal.classList.add("hidden");
  });

  // स्लॉट चयन
  document.querySelectorAll(".slot-pill").forEach(slot => {
    slot.addEventListener("click", () => {
      document.querySelectorAll(".slot-pill").forEach(s => s.classList.remove("active"));
      slot.classList.add("active");
    });
  });

  submitRequestBtn.addEventListener("click", () => {
    bookingModal.classList.add("hidden");
    
    // मालिक के पास रिक्वेस्ट जाने का इंटरफेस
    tractorActionRamlal.innerHTML = `
      <div class="status-badge-pending">
        <span>⏳ मालिक की मंजूरी का इंतजार...</span>
        <button id="simulateAcceptBtn" class="primary-btn bg-kheti btn-sm">
          मालिक स्वीकृति सिम्युलेट करें
        </button>
      </div>
    `;

    document.getElementById("simulateAcceptBtn").addEventListener("click", () => {
      tractorActionRamlal.innerHTML = `
        <div class="status-badge-accepted">
          <div>
            <span>✅ रामलाल जी ने रिक्वेस्ट स्वीकार की!</span>
            <p style="font-size:10px; color:#555;">कल दोपहर • हकाई तय</p>
          </div>
          <div style="display:flex; gap:6px;">
            <button id="openChatBtn" class="primary-btn bg-gerua btn-sm">💬 चैट करें</button>
            <a href="tel:9829012345" class="call-btn" style="background:#1A365D; color:#fff; display:flex; align-items:center;">📞 कॉल</a>
          </div>
        </div>
      `;

      document.getElementById("openChatBtn").addEventListener("click", () => {
        chatModal.classList.remove("hidden");
      });

      // चैट अपने-आप खोलें
      chatModal.classList.remove("hidden");
    });
  });

  closeChatModal.addEventListener("click", () => {
    chatModal.classList.add("hidden");
  });

  // चैट में संदेश भेजना
  const sendMsgBtn = document.getElementById("sendMsgBtn");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");

  function sendChatMessage() {
    const text = chatInput.value.trim();
    if (text) {
      const msgDiv = document.createElement("div");
      msgDiv.className = "chat-msg outgoing";
      msgDiv.innerText = text;
      chatMessages.appendChild(msgDiv);
      chatInput.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  sendMsgBtn.addEventListener("click", sendChatMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendChatMessage();
  });

  // 6. सरकारी योजना अलर्ट मोडल
  const govBellBtn = document.getElementById("govBellBtn");
  const govModal = document.getElementById("govModal");
  const closeGovModal = document.getElementById("closeGovModal");

  govBellBtn.addEventListener("click", () => {
    govModal.classList.remove("hidden");
  });

  closeGovModal.addEventListener("click", () => {
    govModal.classList.add("hidden");
  });

  // 7. वॉयस और चौपाल के अन्य बटन्स
  document.getElementById("voiceAlertBtn").addEventListener("click", () => {
    alert("🎙️ वॉयस सेवा तैयार है: अपनी स्थानीय भाषा में सवाल बोलें!");
  });

  document.getElementById("likeBtn").addEventListener("click", () => {
    const count = document.getElementById("likeCount");
    count.innerText = parseInt(count.innerText) + 1;
  });

  document.getElementById("newPostBtn").addEventListener("click", () => {
    const text = prompt("किसान चौपाल पर अपनी सलाह या प्रश्न लिखें:");
    if (text) alert("✅ आपकी पोस्ट चौपाल पर प्रकाशित हो गई है!");
  });
});
