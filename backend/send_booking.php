<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Metoda nepermisa.'
    ]);
    exit;
}

$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Date invalide.'
    ]);
    exit;
}

$name = trim((string)($data['name'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$preferredTime = trim((string)($data['preferredTime'] ?? ''));
$notes = trim((string)($data['notes'] ?? ''));

if ($name === '' || $email === '' || $preferredTime === '') {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'error' => 'Campurile obligatorii lipsesc.'
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'error' => 'Adresa de email este invalida.'
    ]);
    exit;
}

$fromEmail = 'no-reply@example.com';
$fromName = 'Astro Tarot';

$safeName = htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeTime = htmlspecialchars($preferredTime, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeNotes = htmlspecialchars($notes, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

$subject = 'Confirmare programare';
$body = "Buna, {$safeName},\r\n\r\n";
$body .= "Iti multumesc pentru programare. Cererea ta a fost inregistrata cu succes.\r\n\r\n";
$body .= "Detalii programare:\r\n";
$body .= "- Nume: {$safeName}\r\n";
$body .= "- Email: {$safeEmail}\r\n";
$body .= "- Ora preferata: {$safeTime}\r\n\r\n";

if ($safeNotes !== '') {
    $body .= "Intrebarea / intentia ta:\r\n";
    $body .= "{$safeNotes}\r\n\r\n";
}

$body .= "Voi reveni in curand cu confirmarea finala si toate detaliile necesare.\r\n\r\n";
$body .= "Multumesc,\r\n";
$body .= "[Numele tau / Brand]\r\n\r\n";
$body .= "---\r\n";
$body .= "Acesta este un email automat. Te rugam sa nu raspunzi direct.\r\n";

$headers = [
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "From: {$fromName} <{$fromEmail}>",
    "Reply-To: {$fromEmail}",
    "X-Mailer: PHP/" . phpversion()
];

$sent = mail($email, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Emailul nu a putut fi trimis. Verifica configurarea serverului.'
    ]);
    exit;
}

echo json_encode([
    'success' => true
]);
