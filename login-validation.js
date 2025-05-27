document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  form.addEventListener("submit", function (event) {
    let isValid = true;
    let errorMessage = "";

    // Kullanıcı adı kontrolü
    if (usernameInput.value.trim() === "") {
      isValid = false;
      errorMessage += "Kullanıcı adı boş olamaz.\n";
    }

    // Şifre kontrolü
    if (passwordInput.value.length < 6) {
      isValid = false;
      errorMessage += "Şifre en az 6 karakter olmalıdır.\n";
    }

    // Eğer valid değilse form gönderilmesin
    if (!isValid) {
      event.preventDefault(); // Form gönderimini durdur
      alert(errorMessage);    // Hataları göster
    }
  });
});
