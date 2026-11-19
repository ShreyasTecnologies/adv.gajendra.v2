document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.textContent = open ? '×' : '☰';
    });
    mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    }));
  }
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const closeAnnouncement = document.getElementById('closeAnnouncement');
  if (closeAnnouncement) closeAnnouncement.addEventListener('click', () => {
    const bar = document.getElementById('announcement');
    if (bar) bar.hidden = true;
  });

  // Edit this text before publishing a festival greeting, filing reminder or office-closure notice.
  const announcementMessage = 'Good Service Finance Consultancy — Professional taxation assistance in Agra.';
  const announcementText = document.getElementById('announcementText');
  if (announcementText) announcementText.textContent = announcementMessage;

  const enquiryForm = document.getElementById('enquiryForm');
  if (enquiryForm) enquiryForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!enquiryForm.reportValidity()) return;
    const data = new FormData(enquiryForm);
    const message = [
      'Hello, Good Service Finance Consultancy.',
      'I would like to make an enquiry.',
      `Name: ${data.get('name')}`,
      `Phone: ${data.get('phone')}`,
      `Service: ${data.get('service')}`,
      `Message: ${data.get('message')}`
    ].join('\\n');
    const url = 'https://wa.me/917055025777?text=' + encodeURIComponent(message);
    window.open(url, '_blank', 'noopener,noreferrer');
    const status = document.getElementById('formStatus');
    if (status) status.textContent = 'WhatsApp opened with your enquiry. Please review and press Send in WhatsApp.';
  });

  const emiForm = document.getElementById('emiForm');
  if (emiForm) {
    const money = value => new Intl.NumberFormat('en-IN', {style:'currency', currency:'INR', maximumFractionDigits:0}).format(value);
    const calculate = () => {
      const principal = Number(document.getElementById('loanAmount').value);
      const annualRate = Number(document.getElementById('interestRate').value);
      const years = Number(document.getElementById('loanTenure').value);
      if (!(principal > 0) || annualRate < 0 || years <= 0) return;
      const months = years * 12;
      const rate = annualRate / 1200;
      const emi = rate === 0 ? principal / months : principal * rate * Math.pow(1 + rate, months) / (Math.pow(1 + rate, months) - 1);
      const total = emi * months;
      document.getElementById('emiValue').textContent = money(emi);
      document.getElementById('interestValue').textContent = money(total - principal);
      document.getElementById('totalValue').textContent = money(total);
    };
    emiForm.addEventListener('submit', event => { event.preventDefault(); calculate(); });
    calculate();
  }
});
