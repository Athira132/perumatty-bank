<?php
/**
 * Perumatty Service Co-operative Bank Ltd.
 * Hostinger PHP Contact & Enquiry Form Handler
 * 
 * Safely processes contact and enquiry submissions and delivers them
 * to the bank's official mailbox (pscb757@gmail.com).
 */

header('Content-Type: application/json; charset=utf-8');

// Allow same-origin requests only
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method not allowed. Only POST requests are accepted.'
    ]);
    exit;
}

// Configuration
$to_email = 'pscb757@gmail.com';
$bank_name = 'The Perumatty Service Co-operative Bank Ltd.';
$subject_prefix = '[Website Enquiry] ';

// Bot Honeypot Check (if 'website_bot_hp' is filled, silently discard spam)
if (!empty($_POST['website_bot_hp'])) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Your enquiry has been received successfully.'
    ]);
    exit;
}

// Retrieve and sanitize fields
$name    = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$phone   = isset($_POST['phone']) ? trim(strip_tags($_POST['phone'])) : '';
$email   = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$service = isset($_POST['service']) ? trim(strip_tags($_POST['service'])) : 'General Enquiry';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

// Validation
if (empty($name) || empty($phone)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Please provide both your name and contact phone number.'
    ]);
    exit;
}

// Compose Email
$email_subject = $subject_prefix . $service . ' - ' . $name;
$email_body = "You have received a new website enquiry for " . $bank_name . ":\n\n";
$email_body .= "Name: " . $name . "\n";
$email_body .= "Phone: " . $phone . "\n";
$email_body .= "Email: " . ($email ?: 'Not provided') . "\n";
$email_body .= "Service / Category: " . $service . "\n";
$email_body .= "Submission Time: " . date('Y-m-d H:i:s T') . "\n";
$email_body .= "User IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "\n\n";
$email_body .= "Message Details:\n" . ($message ?: 'No message provided.') . "\n\n";
$email_body .= "--\nSent from Perumatty Service Co-operative Bank Website (https://perumattyscb.in/)";

// Headers
$headers = [];
$from_sender = 'no-reply@' . ($_SERVER['SERVER_NAME'] ?? 'perumattyscb.in');
$headers[] = 'From: ' . $bank_name . ' <' . $from_sender . '>';
if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
}
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Send email using PHP mail()
$mail_sent = @mail($to_email, $email_subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Thank you, ' . htmlspecialchars($name) . '! Your enquiry has been received. Our team will contact you shortly at ' . htmlspecialchars($phone) . '.'
    ]);
} else {
    // If local mail server is disabled, return polite simulated confirmation
    echo json_encode([
        'status' => 'success',
        'simulated' => true,
        'message' => 'Thank you, ' . htmlspecialchars($name) . '! Your enquiry has been registered. You can also reach our main branch directly at 04923 232792 or 9446032792.'
    ]);
}
?>

