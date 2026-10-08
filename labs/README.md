https://chatgpt.com/c/6ac78636-5e54-83ec-a04d-e70fcf44e45b

Architecture
- Single standalone index.html — HTML, CSS and JavaScript are contained in one file.
- Configuration-driven — change only laboratory, labTests, and associated doctor objects to create another laboratory profile.
- Two client-side journeys — LAB TESTS and DOCTORS, switched without page reload.
- No patient-data backend — form data exists only in JavaScript memory long enough to construct the WhatsApp URL.
- QR/share system — QR is generated from window.location.href; sharing uses the current profile URL.
- Responsive DoctorJet UI — desktop sidebar, tablet single-column layout, mobile sticky booking action and near-full-screen modal.
- Dynamic test selection — category filtering, search, add/remove, estimated-total calculation and mobile sticky summary.
- Dynamic doctor availability — doctor-specific consultation modes, days and time slots are generated from configuration.
Below is the complete copy-paste-ready index.html.



WHAT TO CHANGE FOR EACH LAB
Only the configuration section near the bottom needs to be changed for the normal reuse case.
1. Laboratory identity
Inside:
const laboratory = {

change:
name: "ABC Diagnostics",
type: "Advanced Diagnostic Laboratory",
label: "Diagnostic Laboratory",
description: "...",
location: "Bhubaneswar, Odisha",
address: "Saheed Nagar, Bhubaneswar, Odisha",
logo: "./lab-logo.png",

2. WhatsApp number
Change:
whatsapp: "919876543210",

Use the international-format number without +, spaces or hyphens.
Example:
whatsapp: "919876543210",

This is the number that receives both laboratory test bookings and doctor appointment requests.
3. Contact details
Change:
phone: "+91 98765 43210",
email: "info@abcdiagnostics.com",
maps: "https://www.google.com/maps/search/?api=1&query=...",

4. Laboratory information
Change:
accreditation: "NABL Accredited",
reportType: "Digital reports",
homeCollection: "Available",
testCountLabel: "500+",

and:
openingHours: [...]

and:
facilities: [...]

5. Laboratory tests
Replace the contents of:
const labTests = [
    ...
];

Each test uses:
{
    id: "cbc",
    name: "Complete Blood Count",
    shortName: "CBC",
    category: "Blood",
    description: "Measures haemoglobin, RBC, WBC and platelet parameters.",
    price: 450,
    reportTime: "Same day",
    sample: "Blood",
    homeCollection: true
}

You can add as many tests as required.
6. Associated doctors
Replace:
const doctors = [
    ...
];

Each doctor controls their own:
- name
- specialty
- qualification
- photo
- fee
- consultation modes
- available days
- available time slots
For example:
days: [
    "Monday",
    "Wednesday",
    "Friday"
],

slots: [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM"
]

The appointment modal automatically generates the selectable slots from this configuration.
7. Images
Place the corresponding files alongside index.html, for example:
index.html
lab-logo.png
doctor-amit.jpg
doctor-priya.jpg
doctor-neha.jpg

If your DoctorJet deployment has a centralized image directory, simply change the image paths in the configuration.
WHATSAPP MESSAGE FLOW
A. Laboratory test journey
1. Patient selects tests
For example:
CBC
HbA1c
TSH

The page immediately calculates:
3 tests
Estimated total ₹1,200

No server request occurs.
2. Patient clicks Book Selected Tests
The Apple-style modal collects:
- Name
- Mobile
- Age
- Gender
- Email
- Address
- Area
- PIN
- Visit laboratory / Home collection
- Collection address where applicable
- Preferred date
- Preferred time
- Optional note
The selected tests and estimated total are automatically inserted into the request.
3. Patient submits
JavaScript constructs the WhatsApp message entirely in the browser and opens:
https://wa.me/<LAB_WHATSAPP_NUMBER>?text=<ENCODED_MESSAGE>

The laboratory's WhatsApp receives a structured request containing:
🏥 ABC DIAGNOSTICS
LAB TEST BOOKING REQUEST

━━━━━━━━━━━━━━━━━━

PATIENT DETAILS

...

━━━━━━━━━━━━━━━━━━

SELECTED LAB TESTS

1. Complete Blood Count (CBC)
Estimated Cost: ₹450

...

━━━━━━━━━━━━━━━━━━

ESTIMATED TOTAL

₹1,200

━━━━━━━━━━━━━━━━━━

SAMPLE COLLECTION

...

━━━━━━━━━━━━━━━━━━

ADDITIONAL NOTE

...

There is no database, Google Sheet, API, backend, localStorage or cookie-based patient-data storage in this implementation.
B. Doctor appointment journey
1. Patient opens DOCTORS
The page renders doctors directly from:
const doctors = [...]

Each doctor's available:
consultationModes
days
slots

is taken from their configuration.
2. Patient clicks Book
The selected doctor is loaded into the appointment modal.
The patient chooses:
- Patient name
- Mobile
- Age
- Gender
- In-person / Online
- Preferred date
- Available time slot
- Optional reason
The code also checks that the selected date corresponds to one of the doctor's configured working days.
3. Patient submits
A structured WhatsApp request is generated:
🏥 ABC DIAGNOSTICS
DOCTOR APPOINTMENT REQUEST

━━━━━━━━━━━━━━━━━━

DOCTOR

Dr. Amit Kumar
Consultant Physician

━━━━━━━━━━━━━━━━━━

PATIENT DETAILS

Name: Rahul Kumar
Mobile: 9876543210
Age: 42
Gender: Male

━━━━━━━━━━━━━━━━━━

APPOINTMENT

Consultation: In-person
Date: 15 October 2026
Time: 10:30 AM

━━━━━━━━━━━━━━━━━━

REASON FOR CONSULTATION

General physician consultation

━━━━━━━━━━━━━━━━━━

Please contact the patient to confirm the appointment.

It is then opened directly in the laboratory's configured WhatsApp number.
This gives you the intended DoctorJet business model:
DoctorJet Business QR → Laboratory Profile → LAB TESTS / DOCTORS → Booking → Structured WhatsApp request to the laboratory.