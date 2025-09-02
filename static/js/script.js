const clearFileBtn = document.getElementById("clearFile");
const fileInput = document.getElementById("fileInput");
const fileNameInput = document.getElementById("fileName");
const fileSizeEl = document.getElementById("fileSize");
const emailForm = document.getElementById("emailForm");
const loadingEl = document.getElementById("loading");
const resultsEl = document.getElementById("results");
const categoryEl = document.getElementById("category");
const replyEl = document.getElementById("reply");
const dropArea = document.getElementById("dropArea");

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, (e) => e.preventDefault());
  dropArea.addEventListener(eventName, (e) => e.stopPropagation());
});

dropArea.addEventListener("dragover", () => dropArea.classList.add("dragover"));
dropArea.addEventListener("dragleave", () =>
  dropArea.classList.remove("dragover")
);
dropArea.addEventListener("drop", () => dropArea.classList.remove("dragover"));

dropArea.addEventListener("drop", (e) => {
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    fileInput.files = files;
    updateFileInfo();
  }
});

const formatBytes = (bytes) => {
  if (!bytes) return "0 B";
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
};

const updateFileInfo = () => {
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    fileNameInput.value = file.name;
    fileSizeEl.textContent = `(${formatBytes(file.size)})`;
  } else {
    clearFileInfo();
  }
};

const clearFileInfo = () => {
  fileInput.value = "";
  fileNameInput.value = "";
  fileSizeEl.textContent = "";
};

fileInput.addEventListener("change", updateFileInfo);
clearFileBtn.addEventListener("click", clearFileInfo);

emailForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailText = document.getElementById("emailText").value.trim();
  resultsEl.style.display = "none";
  loadingEl.style.display = "block";
  try {
    let response;
    if (fileInput.files.length > 0 && emailText) {
      alert("Por favor, envie **ou** um arquivo **ou** um texto, não os dois.");
      return;
    } else if (fileInput.files.length > 0) {
      const formData = new FormData();
      formData.append("file", fileInput.files[0]);
      response = await fetch("http://localhost:8000/email/upload", {
        method: "POST",
        body: formData,
      });
    } else if (emailText) {
      response = await fetch("http://localhost:8000/email/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: emailText }),
      });
    } else {
      alert("Por favor, selecione um arquivo ou insira um texto.");
      return;
    }
    const result = await response.json();
    categoryEl.innerText = result.category;
    replyEl.innerText = result.reply;
    resultsEl.style.display = "block";
  } catch (err) {
    alert("Ocorreu um erro ao processar a solicitação.");
    console.error(err);
  } finally {
    loadingEl.style.display = "none";
  }
});
