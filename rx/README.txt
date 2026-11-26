DOCTORJET RX — WEB DEPLOYMENT PACKAGE

Target URL: https://doctorjet.in/rx/index.html

CONTENTS
- index.html: prescription application based on the Thomson Clinic Prescription System.
- CDCI_Medicine_Master.csv: medicine catalogue bridge file (93,911 entries).

DEPLOYMENT
Upload BOTH files into the same /rx/ directory on the DoctorJet website. The final paths must be:
  /rx/index.html
  /rx/CDCI_Medicine_Master.csv

Then open https://doctorjet.in/rx/index.html

DATA STORAGE AND PRIVACY
- Patient and consultation data are stored in IndexedDB in the browser profile on the device using the app.
- The application does not send patient data to DoctorJet hosting. The only network request is the optional medicine catalogue download from the same /rx/ folder.
- This means records do not synchronise between devices or browsers. Use the same Mac and same browser profile.
- Export complete backup regularly. Store the JSON backup in an encrypted, access-controlled location. Restore it through Settings & Data.
- Clearing website data, deleting browser profile data, or using private browsing can remove or hide records.
- This is not a Finder-visible SQLite database and is not a substitute for a validated clinical information system.

SECURITY
- Serve only over HTTPS.
- Restrict access to the /rx/ page if possible, even though patient data is not hosted there; the app code itself can be public.
- Use a dedicated macOS user account, strong login password and FileVault.
- Do not use shared/public computers. Anyone using the same browser profile may access local records.
- Test backup and restore with dummy data before clinical use.

MEDICINE CATALOGUE
The bundled CDCI CSV is a reference index. Clinical dosage, frequency and duration are not prefilled by the source file and must be prescribed and verified by the clinician. The catalogue may contain duplicate brands or incomplete metadata; verify product, strength, formulation, route and manufacturer before prescribing.
