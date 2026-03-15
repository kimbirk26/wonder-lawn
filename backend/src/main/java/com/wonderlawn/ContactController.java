package com.wonderlawn;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:8888", "https://wonderlawn.site" })
public class ContactController {

    private final JavaMailSender mailSender;

    @Value("${wonderlawn.email.to}")
    private String emailTo;

    @Value("${wonderlawn.email.from}")
    private String emailFrom;

    public ContactController(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @PostMapping("/contact")
    public ResponseEntity<String> contact(@Valid @RequestBody ContactRequest req) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(emailFrom);
        mail.setTo(emailTo);
        mail.setReplyTo(req.email());
        mail.setSubject("Wonder Lawn enquiry — " + (req.service().isBlank() ? "General" : req.service()));
        mail.setText("""
                New enquiry from the Wonder Lawn website:

                Name:    %s
                Email:   %s
                Service: %s

                Message:
                %s
                """.formatted(req.name(), req.email(), req.service(), req.message()));

        mailSender.send(mail);
        return ResponseEntity.ok("sent");
    }
}
