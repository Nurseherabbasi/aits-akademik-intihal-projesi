function validateForm(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();

  if (username === "") {
    alert("Kullanıcı adı boş olamaz.");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Geçerli bir e-posta adresi girin.");
    return false;
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert("Şifre en az 8 karakter olmalı ve hem harf hem sayı içermelidir.");
    return false;
  }

  if (password !== confirmPassword) {
    alert("Şifreler eşleşmiyor.");
    return false;
  }

  alert("Kayıt başarılı!");
  return true;
}
