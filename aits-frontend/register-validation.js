document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");

  form.addEventListener("submit", function (event) {
    let isValid = true;
    let errorMessage = "";

    // Kullanıcı adı boş mu?
    if (usernameInput.value.trim() === "") {
      isValid = false;
      errorMessage += "Kullanıcı adı boş olamaz.\n";
    }

    // E-posta doğrulama
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      isValid = false;
      errorMessage += "Geçerli bir e-posta adresi girin.\n";
    }

    // Şifre karmaşıklığı kontrolü
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(passwordInput.value)) {
      isValid = false;
      errorMessage += "Şifre en az 8 karakter olmalı ve hem harf hem sayı içermelidir.\n";
    }

    // Şifre eşleşiyor mu?
    if (passwordInput.value !== confirmPasswordInput.value) {
      isValid = false;
      errorMessage += "Şifreler eşleşmiyor.\n";
    }

    if (!isValid) {
      event.preventDefault();
      alert(errorMessage);
    } else {
      event.preventDefault(); // Formu backend'e göndermek için engelle
      alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
      setTimeout(() => {
        window.location.href = "login.html"; // login sayfasına yönlendirme
      }, 1000);
    }
  });
});
