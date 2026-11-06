The logo and doctor photos can be any image format. Just make the file name in the config match the real file, including the extension, for example logo: "./images/mylab.jpg".

What I changed to make it reusable

Hard-coded values moved into the config. The address, Google Maps links, call numbers, WhatsApp greeting and the “Same-Day Reports” tag no longer sit in the HTML. Leave mapsUrl and directionsUrl blank and they are generated from the lab name and address.
Tests are shorter to write. I built the long test list from the compact testCatalogue, so you no longer write an id, description and short name for every test. One difference: the default test description now reads “Category investigation at Lab Name.” (the old one repeated “investigations investigation” for some categories).
Doctor ids are automatic.
Top-right badge image. The “Powered by DoctorJet” badge uses the lab logo unless you set platformLogo, for example to a DoctorJet logo.
Share on WhatsApp handler. I removed the duplicate handler for it. Behaviour is the same.
Sample data. The sample tests and doctors are placeholders, so replace them for each lab.