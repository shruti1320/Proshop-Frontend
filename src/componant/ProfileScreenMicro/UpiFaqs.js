import React from "react";

export default function UpiFaqs() {
  const faqs = [
    {
      question:
        "What happens when I update my email address (or mobile number)?",
      answer:
        "Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).",
    },
    {
      question:
        "When will my Proshop account be updated with the new email address (or mobile number)?",
      answer:
        "It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.",
    },
    {
      question:
        "What happens to my existing Proshop account when I update my email address (or mobile number)?",
      answer:
        "Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.",
    },
    {
      question:
        "Does my Seller account get affected when I update my email address?",
      answer:
        "Proshop has a 'single sign-on' policy. Any changes will reflect in your Seller account also.",
    },
  ];

  return (
    <div>
      <p className="fs-3 fw-bold mt-5">FAQs</p>
      {faqs.map((faq, index) => (
        <div key={index}>
          <p className="fs-5 fw-bold">{faq.question}</p>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}
