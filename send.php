<?php
// send.php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';

// ===== CONFIGURA AQUÍ TU CUENTA GMAIL =====
$smtpUser = 'ingosursa@gmail.com';           // tu Gmail (mismo al que quieres recibir)
$smtpPass = 'pwxrmmmepzddzcuh';     // contraseña de aplicación de 16 caracteres
$toEmail  = 'ingosursa@gmail.com';           // destinatario (tú mismo)
// ==========================================

// 1) Recoger y validar datos
$userEmail = trim($_POST['email']   ?? '');
$subject   = trim($_POST['subject'] ?? '');
$bodyMsg   = trim($_POST['message'] ?? '');
// Honeypot anti-spam
$honeypot  = trim($_POST['website'] ?? '');

if ($honeypot !== '') {
  http_response_code(400);
  echo 'Solicitud no válida.';
  exit;
}

if ($userEmail === '' || $subject === '' || $bodyMsg === '') {
  http_response_code(400);
  echo 'Faltan datos obligatorios.';
  exit;
}
if (!filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo 'El email no es válido.';
  exit;
}

$mail = new PHPMailer(true);

try {
  // 2) SMTP Gmail
  $mail->isSMTP();
  $mail->Host       = 'smtp.gmail.com';
  $mail->SMTPAuth   = true;
  $mail->Username   = $smtpUser;
  $mail->Password   = $smtpPass;               // Contraseña de aplicación (NO tu password normal)
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
  $mail->Port       = 587;
  $mail->CharSet    = 'UTF-8';

  // 3) Encabezados
  $mail->setFrom($smtpUser, 'Contacto Web');
  $mail->addAddress($toEmail);
  $mail->addReplyTo($userEmail);               // al responder, te responde al usuario

  // 4) Contenido
  $mail->isHTML(true);
  $mail->Subject = 'Contacto web: ' . $subject;
  $mail->Body    = '<p>Has recibido un nuevo mensaje desde el formulario de contacto:</p>'
                 . '<p><strong>Email remitente:</strong> ' . htmlspecialchars($userEmail) . '</p>'
                 . '<p><strong>Asunto:</strong> ' . htmlspecialchars($subject) . '</p>'
                 . '<p><strong>Mensaje:</strong><br>' . nl2br(htmlspecialchars($bodyMsg)) . '</p>';
  $mail->AltBody  = "Email: $userEmail\nAsunto: $subject\n\nMensaje:\n$bodyMsg";

  // 5) Enviar
  $mail->send();

  // 6) Redirección o respuesta
  header('Location: gracias.html'); // crea gracias.html si quieres
  exit;

} catch (Exception $e) {
  http_response_code(500);
  echo 'No se pudo enviar el correo. Error: ' . $mail->ErrorInfo;
}
