/* ============================================================
   PHARMACY PROFILE - CONFIGURATION
   Edit ONLY the objects below to reuse this page for another pharmacy.
   ============================================================ */

const pharmacyConfig = {
  name: "ABC Pharmacy",
  tagline: "Quality medicines and convenient access to doctor consultations.",
  logo: "assets/logo.svg",
  phone: "+91 98765 43210",
  whatsapp: "919876543210", // digits only, country code included
  address: "Plot 123, Main Road, Bhubaneswar, Odisha 751001",
  city: "Bhubaneswar",
  state: "Odisha",
  pincode: "751001",
  openingHours: "8:00 AM – 10:00 PM",
  consultationHours: "By appointment",
  mapsUrl: "https://maps.google.com/?q=Bhubaneswar+Odisha",
  websiteUrl: "https://example.com/pharmacy/abc-pharmacy"
};

const doctors = [
  {
    id: "doctor-001",
    name: "Dr. Ananya Sharma",
    qualification: "MBBS, MD",
    specialty: "General Medicine",
    experience: "8+ years",
    photo: "assets/doctors/doctor-1.svg",
    languages: ["English", "Hindi", "Odia"],
    consultationMode: ["In-person", "Video"],
    fee: "₹500",
    availability: "Available by appointment",
    whatsapp: "", // Leave blank to use pharmacyConfig.whatsapp
    bio: "Experienced physician providing evaluation and management of common adult medical conditions.",
    slotDuration: 30,
    availabilitySchedule: [
      { day: "Monday", start: "17:00", end: "19:00" },
      { day: "Wednesday", start: "17:00", end: "19:00" },
      { day: "Friday", start: "17:00", end: "19:00" }
    ]
  },
  {
    id: "doctor-002",
    name: "Dr. Rohan Mehta",
    qualification: "MBBS, MD",
    specialty: "Dermatology",
    experience: "7+ years",
    photo: "assets/doctors/doctor-2.svg",
    languages: ["English", "Hindi"],
    consultationMode: ["In-person", "Video"],
    fee: "₹600",
    availability: "Available by appointment",
    whatsapp: "",
    bio: "Dermatology consultant with an interest in common skin, hair and nail disorders.",
    slotDuration: 30,
    availabilitySchedule: [
      { day: "Tuesday", start: "17:30", end: "19:30" },
      { day: "Thursday", start: "17:30", end: "19:30" },
      { day: "Saturday", start: "10:00", end: "12:00" }
    ]
  },
  {
    id: "doctor-003",
    name: "Dr. Priya Nair",
    qualification: "MBBS, MD",
    specialty: "Pediatrics",
    experience: "10+ years",
    photo: "assets/doctors/doctor-3.svg",
    languages: ["English", "Hindi", "Odia"],
    consultationMode: ["In-person"],
    fee: "₹500",
    availability: "Available by appointment",
    whatsapp: "",
    bio: "Pediatrician providing routine child health consultations and assessment of common childhood illnesses.",
    slotDuration: 30,
    availabilitySchedule: [
      { day: "Monday", start: "18:00", end: "20:00" },
      { day: "Thursday", start: "18:00", end: "20:00" },
      { day: "Saturday", start: "16:00", end: "18:00" }
    ]
  },
  {
    id: "doctor-004",
    name: "Dr. Arjun Rao",
    qualification: "MBBS, MD",
    specialty: "Psychiatry",
    experience: "9+ years",
    photo: "assets/doctors/doctor-4.svg",
    languages: ["English", "Hindi", "Odia"],
    consultationMode: ["Video", "In-person"],
    fee: "₹700",
    availability: "Available by appointment",
    whatsapp: "",
    bio: "Psychiatrist providing assessment and treatment for common mental health and behavioral concerns.",
    slotDuration: 30,
    availabilitySchedule: [
      { day: "Tuesday", start: "18:00", end: "20:00" },
      { day: "Friday", start: "18:00", end: "20:00" }
    ]
  }
];

/* ============================================================
   APPLICATION
   ============================================================ */

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const state = {
  selectedDoctor: null,
  whatsappUrl: "",
  lastFocus: null,
  activeSpecialty: "All",
  searchTerm: ""
};

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

document.addEventListener("DOMContentLoaded", init);

function init() {
  populatePharmacy();
  renderStructuredData();
  renderDoctorFilters();
  renderDoctors();
  populateDoctorSelect();
  setMinimumDate();
  bindEvents();
}

function populatePharmacy() {
  const mappings = {
    "#announcementText": `Doctor consultations now available at ${pharmacyConfig.name}`,
    "#headerPharmacyName": pharmacyConfig.name,
    "#heroPharmacyName": pharmacyConfig.name,
    "#heroCardPharmacy": pharmacyConfig.name,
    "#heroCardAddress": `${pharmacyConfig.city}, ${pharmacyConfig.state}`,
    "#pharmacyName": pharmacyConfig.name,
    "#pharmacyTagline": pharmacyConfig.tagline,
    "#pharmacyAddress": pharmacyConfig.address,
    "#pharmacyHours": pharmacyConfig.openingHours,
    "#pharmacyPhone": pharmacyConfig.phone,
    "#contactName": pharmacyConfig.name,
    "#contactAddress": pharmacyConfig.address,
    "#contactHours": pharmacyConfig.openingHours,
    "#contactPhone": pharmacyConfig.phone,
    "#footerName": pharmacyConfig.name,
    "#copyright": `© ${new Date().getFullYear()} ${pharmacyConfig.name}. All rights reserved.`
  };

  Object.entries(mappings).forEach(([selector, value]) => {
    const element = $(selector);
    if (element) element.textContent = value;
  });

  ["#headerLogo", "#pharmacyLogo", "#footerLogo"].forEach(selector => {
    const img = $(selector);
    if (img) img.src = pharmacyConfig.logo;
  });

  const pharmacyWhatsApp = buildWhatsAppUrl(pharmacyConfig.whatsapp, `Hello ${pharmacyConfig.name}, I would like to know more about doctor consultation services.`);
  const announcementWhatsApp = $("#announcementWhatsApp");
  const contactWhatsApp = $("#contactWhatsApp");
  const mapsButton = $("#mapsButton");

  if (announcementWhatsApp) announcementWhatsApp.href = pharmacyWhatsApp;
  if (contactWhatsApp) contactWhatsApp.href = pharmacyWhatsApp;
  if (mapsButton) mapsButton.href = pharmacyConfig.mapsUrl;

  document.title = `${pharmacyConfig.name} | Doctor Consultation`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = `Consult qualified doctors through ${pharmacyConfig.name}. Request an appointment through WhatsApp.`;
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = pharmacyConfig.websiteUrl;

  $("#doctorCount").textContent = doctors.length;
}

function renderStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    "name": pharmacyConfig.name,
    "telephone": pharmacyConfig.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": pharmacyConfig.address,
      "addressLocality": pharmacyConfig.city,
      "addressRegion": pharmacyConfig.state,
      "postalCode": pharmacyConfig.pincode,
      "addressCountry": "IN"
    },
    "url": pharmacyConfig.websiteUrl,
    "employee": doctors.map(doctor => ({
      "@type": "Person",
      "name": doctor.name,
      "jobTitle": doctor.specialty,
      "description": doctor.bio,
      "image": absoluteUrl(doctor.photo)
    }))
  };
  const target = $("#structured-data");
  if (target) target.textContent = JSON.stringify(schema);
}

function absoluteUrl(path) {
  try {
    return new URL(path, window.location.href).href;
  } catch {
    return path;
  }
}

function renderDoctorFilters() {
  const container = $("#specialtyFilters");
  if (!container) return;

  const specialties = ["All", ...new Set(doctors.map(d => d.specialty))];
  container.innerHTML = specialties.map(specialty => `
    <button class="filter-btn ${specialty === state.activeSpecialty ? "active" : ""}"
      type="button" data-specialty="${escapeHtml(specialty)}">
      ${escapeHtml(specialty)}
    </button>
  `).join("");
}

function renderDoctors() {
  const grid = $("#doctorGrid");
  const empty = $("#emptyState");
  if (!grid) return;

  const term = state.searchTerm.toLowerCase().trim();
  const filtered = doctors.filter(doctor => {
    const specialtyMatch = state.activeSpecialty === "All" || doctor.specialty === state.activeSpecialty;
    const searchable = [
      doctor.name,
      doctor.specialty,
      doctor.qualification,
      doctor.experience,
      ...(doctor.languages || [])
    ].join(" ").toLowerCase();
    return specialtyMatch && (!term || searchable.includes(term));
  });

  grid.innerHTML = filtered.map(doctor => doctorCardHtml(doctor)).join("");
  if (empty) empty.hidden = filtered.length !== 0;
}

function doctorCardHtml(doctor) {
  const timings = formatScheduleSummary(doctor.availabilitySchedule);
  const modes = doctor.consultationMode.join(" / ");

  return `
    <article class="doctor-card">
      <div class="doctor-photo">
        <img src="${escapeAttribute(doctor.photo)}" alt="${escapeAttribute(doctor.name)}" loading="lazy"
          onerror="this.src='assets/doctors/doctor-placeholder.svg'">
        <span class="doctor-status"><i></i>${escapeHtml(doctor.availability)}</span>
      </div>
      <div class="doctor-content">
        <span class="doctor-specialty">${escapeHtml(doctor.specialty)}</span>
        <h3>${escapeHtml(doctor.name)}</h3>
        <div class="doctor-qualification">${escapeHtml(doctor.qualification)} · ${escapeHtml(doctor.experience)}</div>
        <p class="doctor-bio">${escapeHtml(doctor.bio)}</p>
        <div class="doctor-meta">
          <div class="meta-box"><small>Consultation</small><strong>${escapeHtml(modes)}</strong></div>
          <div class="meta-box"><small>Timings</small><strong>${escapeHtml(timings)}</strong></div>
          <div class="meta-box"><small>Languages</small><strong>${escapeHtml((doctor.languages || []).join(", "))}</strong></div>
          <div class="meta-box"><small>Fee</small><strong>${escapeHtml(doctor.fee)}</strong></div>
        </div>
        <div class="doctor-actions">
          <button class="btn btn-primary" type="button" data-book-doctor="${escapeAttribute(doctor.id)}">Book Consultation</button>
        </div>
      </div>
    </article>
  `;
}

function formatScheduleSummary(schedule = []) {
  if (!schedule.length) return "By appointment";
  const grouped = [];
  schedule.forEach(item => {
    grouped.push(`${item.day.slice(0, 3)} ${formatTime(item.start)}–${formatTime(item.end)}`);
  });
  return grouped.join(", ");
}

function populateDoctorSelect() {
  const select = $("#doctorSelect");
  if (!select) return;
  select.innerHTML = `<option value="">Select a doctor</option>` + doctors.map(doctor =>
    `<option value="${escapeAttribute(doctor.id)}">${escapeHtml(doctor.name)} — ${escapeHtml(doctor.specialty)}</option>`
  ).join("");
}

function setMinimumDate() {
  const input = $("#appointmentDate");
  if (!input) return;
  input.min = getLocalDateString();
}

function getLocalDateString(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function bindEvents() {
  document.addEventListener("click", event => {
    const bookingButton = event.target.closest("[data-book-doctor]");
    if (bookingButton) {
      openBooking(bookingButton.dataset.bookDoctor);
      return;
    }

    const openButton = event.target.closest(".js-open-booking");
    if (openButton) {
      openBooking();
      return;
    }

    const filter = event.target.closest("[data-specialty]");
    if (filter) {
      state.activeSpecialty = filter.dataset.specialty;
      $$(".filter-btn").forEach(btn => btn.classList.toggle("active", btn === filter));
      renderDoctors();
    }
  });

  $("#doctorSearch")?.addEventListener("input", event => {
    state.searchTerm = event.target.value;
    renderDoctors();
  });

  $("#menuToggle")?.addEventListener("click", toggleMobileMenu);

  $$("#mobileMenu a").forEach(link => link.addEventListener("click", closeMobileMenu));

  $("#modalClose")?.addEventListener("click", closeBooking);
  $("#confirmationClose")?.addEventListener("click", closeBooking);

  $("#bookingModal")?.addEventListener("click", event => {
    if (event.target === $("#bookingModal")) closeBooking();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !$("#bookingModal").hidden) closeBooking();
  });

  $("#doctorSelect")?.addEventListener("change", event => {
    state.selectedDoctor = doctors.find(d => d.id === event.target.value) || null;
    renderSelectedDoctor();
    resetTimeField();
  });

  $("#appointmentDate")?.addEventListener("change", () => populateTimeSlots());

  $("#bookingForm")?.addEventListener("submit", handleBookingSubmit);

  $("#openWhatsAppAgain")?.addEventListener("click", () => {
    if (state.whatsappUrl) window.open(state.whatsappUrl, "_blank", "noopener,noreferrer");
  });
}

function toggleMobileMenu() {
  const menu = $("#mobileMenu");
  const button = $("#menuToggle");
  const open = menu.classList.toggle("open");
  button.setAttribute("aria-expanded", String(open));
  button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

function closeMobileMenu() {
  const menu = $("#mobileMenu");
  const button = $("#menuToggle");
  menu.classList.remove("open");
  button?.setAttribute("aria-expanded", "false");
}

function openBooking(doctorId = "") {
  state.lastFocus = document.activeElement;

  if (doctorId) {
    state.selectedDoctor = doctors.find(d => d.id === doctorId) || null;
  } else if (!state.selectedDoctor) {
    state.selectedDoctor = null;
  }

  const modal = $("#bookingModal");
  const bookingView = $("#bookingView");
  const confirmationView = $("#confirmationView");

  bookingView.hidden = false;
  confirmationView.hidden = true;
  modal.hidden = false;
  document.body.classList.add("modal-open");

  populateDoctorSelect();
  const select = $("#doctorSelect");

  if (state.selectedDoctor) {
    select.value = state.selectedDoctor.id;
  } else {
    select.value = "";
  }

  renderSelectedDoctor();
  resetTimeField();
  setMinimumDate();

  requestAnimationFrame(() => {
    (state.selectedDoctor ? $("#patientName") : $("#doctorSelect"))?.focus();
  });
}

function closeBooking() {
  const modal = $("#bookingModal");
  if (!modal || modal.hidden) return;

  modal.hidden = true;
  document.body.classList.remove("modal-open");
  $("#bookingForm")?.reset();
  clearValidation();
  state.selectedDoctor = null;
  state.whatsappUrl = "";
  resetTimeField();
  $("#bookingView").hidden = false;
  $("#confirmationView").hidden = true;
  $("#selectedDoctorCard").innerHTML = "";

  if (state.lastFocus && typeof state.lastFocus.focus === "function") {
    state.lastFocus.focus();
  }
}

function renderSelectedDoctor() {
  const container = $("#selectedDoctorCard");
  if (!container) return;

  if (!state.selectedDoctor) {
    container.innerHTML = `
      <div class="selected-doctor-inner">
        <div>
          <strong style="font-size:12px">Select a doctor below</strong>
          <p style="margin:3px 0 0;font-size:10px;color:#64748b">You can review doctor details before submitting.</p>
        </div>
      </div>
    `;
    return;
  }

  const doctor = state.selectedDoctor;
  container.innerHTML = `
    <div class="selected-doctor-inner">
      <div class="selected-doctor-photo">
        <img src="${escapeAttribute(doctor.photo)}" alt="${escapeAttribute(doctor.name)}"
          onerror="this.src='assets/doctors/doctor-placeholder.svg'">
      </div>
      <div>
        <h3>${escapeHtml(doctor.name)}</h3>
        <p>${escapeHtml(doctor.qualification)} · ${escapeHtml(doctor.specialty)}</p>
      </div>
      <div class="selected-meta">
        <strong>${escapeHtml(doctor.fee)}</strong><br>
        ${escapeHtml(doctor.experience)}
      </div>
    </div>
  `;
}

function resetTimeField() {
  const timeSelect = $("#appointmentTime");
  const hint = $("#timeHint");
  timeSelect.innerHTML = `<option value="">Select a date first</option>`;
  timeSelect.disabled = true;
  if (hint) hint.textContent = state.selectedDoctor
    ? "Available slots will appear after selecting a date."
    : "Select a doctor and date to see available slots.";
}

function populateTimeSlots() {
  const dateValue = $("#appointmentDate").value;
  const timeSelect = $("#appointmentTime");
  const hint = $("#timeHint");

  timeSelect.innerHTML = "";
  timeSelect.disabled = true;

  if (!state.selectedDoctor || !dateValue) {
    timeSelect.innerHTML = `<option value="">Select a doctor and date first</option>`;
    if (hint) hint.textContent = "Available slots will appear after selecting a date.";
    return;
  }

  const date = parseLocalDate(dateValue);
  const day = dayNames[date.getDay()];
  const schedule = state.selectedDoctor.availabilitySchedule.filter(item => item.day === day);

  if (!schedule.length) {
    timeSelect.innerHTML = `<option value="">No slots available on ${day}</option>`;
    if (hint) hint.textContent = `${state.selectedDoctor.name} is not available on this date. Please select another date.`;
    return;
  }

  const slots = schedule.flatMap(item => generateSlots(item.start, item.end, state.selectedDoctor.slotDuration || 30));

  timeSelect.innerHTML = `<option value="">Select a time</option>` + slots.map(slot =>
    `<option value="${escapeAttribute(slot.value)}">${escapeHtml(slot.label)}</option>`
  ).join("");

  timeSelect.disabled = false;
  if (hint) hint.textContent = `${slots.length} available slot${slots.length === 1 ? "" : "s"} on ${day}.`;
}

function parseLocalDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function generateSlots(start, end, duration) {
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  let cursor = startHour * 60 + startMinute;
  const finish = endHour * 60 + endMinute;
  const slots = [];

  while (cursor < finish) {
    const next = cursor + duration;
    if (next > finish) break;

    const h = Math.floor(cursor / 60);
    const m = cursor % 60;
    const value = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    slots.push({ value, label: formatTime(value) });
    cursor = next;
  }

  return slots;
}

function formatTime(value) {
  const [hour, minute] = value.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function handleBookingSubmit(event) {
  event.preventDefault();
  clearValidation();

  const data = {
    doctorId: $("#doctorSelect").value,
    patientName: $("#patientName").value.trim(),
    patientMobile: $("#patientMobile").value.trim(),
    patientAge: $("#patientAge").value.trim(),
    patientGender: $("#patientGender").value,
    appointmentDate: $("#appointmentDate").value,
    appointmentTime: $("#appointmentTime").value,
    consultationType: $("#consultationType").value,
    reason: $("#reason").value.trim(),
    additionalMessage: $("#additionalMessage").value.trim(),
    consent: $("#consent").checked
  };

  const doctor = doctors.find(d => d.id === data.doctorId);
  if (!doctor) {
    setFieldError("doctorSelect", "Please select a doctor.");
  }

  if (!data.patientName || data.patientName.length < 2) {
    setFieldError("patientName", "Please enter your full name.");
  }

  if (!/^[6-9]\d{9}$/.test(data.patientMobile.replace(/\D/g, ""))) {
    setFieldError("patientMobile", "Enter a valid 10-digit Indian mobile number.");
  }

  if (data.patientAge && (!Number.isInteger(Number(data.patientAge)) || Number(data.patientAge) < 0 || Number(data.patientAge) > 120)) {
    setFieldError("patientAge", "Enter a valid age.");
  }

  if (!data.appointmentDate) {
    setFieldError("appointmentDate", "Please select a date.");
  } else if (data.appointmentDate < getLocalDateString()) {
    setFieldError("appointmentDate", "Please select today or a future date.");
  }

  if (!data.appointmentTime) {
    setFieldError("appointmentTime", "Please select an available time.");
  }

  if (!data.reason || data.reason.length < 3) {
    setFieldError("reason", "Please provide a brief reason for consultation.");
  }

  if (!data.consent) {
    setFieldError("consent", "Please confirm the consent statement.");
  }

  if ($$(".field.invalid").length > 0) {
    showToast("Please correct the highlighted fields.");
    const firstInvalid = $(".field.invalid input, .field.invalid select, .field.invalid textarea");
    firstInvalid?.focus();
    return;
  }

  state.selectedDoctor = doctor;
  const message = buildWhatsAppMessage(data, doctor);
  const number = doctor.whatsapp || pharmacyConfig.whatsapp;
  state.whatsappUrl = buildWhatsAppUrl(number, message);

  const opened = window.open(state.whatsappUrl, "_blank", "noopener,noreferrer");
  if (!opened) {
    showToast("Your browser blocked the WhatsApp window. Use “Open WhatsApp Again”.");
  }

  showConfirmation(data, doctor);
}

function buildWhatsAppMessage(data, doctor) {
  const date = formatDateForMessage(data.appointmentDate);
  return [
    `Hello ${pharmacyConfig.name},`,
    ``,
    `I would like to request a doctor consultation.`,
    ``,
    `PATIENT DETAILS`,
    `Name: ${data.patientName}`,
    `Age: ${data.patientAge || "Not provided"}`,
    `Gender: ${data.patientGender || "Not provided"}`,
    `Mobile: ${data.patientMobile}`,
    ``,
    `DOCTOR`,
    `${doctor.name}`,
    `${doctor.qualification}`,
    `${doctor.specialty}`,
    ``,
    `CONSULTATION`,
    `Date: ${date}`,
    `Preferred Time: ${formatTime(data.appointmentTime)}`,
    `Mode: ${data.consultationType}`,
    `Consultation Fee: ${doctor.fee}`,
    ``,
    `Reason for consultation:`,
    data.reason,
    ``,
    `Additional message:`,
    data.additionalMessage || "None",
    ``,
    `Please confirm the appointment.`,
    ``,
    `Thank you.`
  ].join("\n");
}

function formatDateForMessage(value) {
  if (!value) return "Not provided";
  const date = parseLocalDate(value);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

function buildWhatsAppUrl(number, message) {
  const cleanNumber = String(number || "").replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

function showConfirmation(data, doctor) {
  $("#bookingView").hidden = true;
  $("#confirmationView").hidden = false;

  $("#confirmationSummary").innerHTML = `
    <div><strong>Doctor:</strong> ${escapeHtml(doctor.name)}</div>
    <div><strong>Date:</strong> ${escapeHtml(formatDateForMessage(data.appointmentDate))}</div>
    <div><strong>Time:</strong> ${escapeHtml(formatTime(data.appointmentTime))}</div>
    <div><strong>Mode:</strong> ${escapeHtml(data.consultationType)}</div>
  `;
}

function clearValidation() {
  $$(".field").forEach(field => field.classList.remove("invalid"));
  $$(".field-error").forEach(error => error.textContent = "");
}

function setFieldError(id, message) {
  const input = document.getElementById(id);
  const field = input?.closest(".field");
  const error = document.querySelector(`[data-error-for="${id}"]`);
  field?.classList.add("invalid");
  if (error) error.textContent = message;
}

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

function escapeAttribute(value) {
  return escapeHtml(value);
}
