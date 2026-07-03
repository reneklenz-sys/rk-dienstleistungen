import type { LocalizedString } from "@/types/content";

export type LegalPageKey = "impressum" | "datenschutz" | "cookies" | "barrierefreiheit";

export type LegalPageContent = {
  title: LocalizedString;
  description: LocalizedString;
  html: LocalizedString;
};

export const legalPages: Record<LegalPageKey, LegalPageContent> = {
  impressum: {
    title: { de: "Impressum", en: "Legal notice" },
    description: {
      de: "Anbieterkennzeichnung für René Klenz — Digitale Dienstleistungen.",
      en: "Legal notice for René Klenz — digital services.",
    },
    html: {
      de: `
        <section>
          <h2>Angaben gemäß § 5 TMG</h2>
          <p><strong>René Klenz</strong><br />Digitale Dienstleistungen<br />[Straße und Hausnummer ergänzen]<br />[PLZ Ort ergänzen]<br />Deutschland</p>
        </section>
        <section>
          <h2>Kontakt</h2>
          <p>E-Mail: <a href="mailto:reneklenz@gmail.com">reneklenz@gmail.com</a><br />Telefon: <a href="tel:+4917645812748">+49 176 45812748</a></p>
        </section>
        <section>
          <h2>Umsatzsteuer</h2>
          <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />[USt-IdNr. ergänzen, falls vorhanden]</p>
        </section>
        <section>
          <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <p>René Klenz<br />[Anschrift wie oben ergänzen]</p>
        </section>
        <section>
          <h2>EU-Streitschlichtung</h2>
          <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" rel="noopener noreferrer" target="_blank">https://ec.europa.eu/consumers/odr/</a>.<br />Meine E-Mail-Adresse finden Sie oben im Impressum.</p>
        </section>
        <section>
          <h2>Verbraucherstreitbeilegung</h2>
          <p>Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </section>
        <p><em>Hinweis: Bitte die markierten Platzhalter vor dem Livegang mit den finalen Angaben bzw. einem geprüften eRecht24-Text ersetzen.</em></p>
      `,
      en: `
        <section>
          <h2>Provider information</h2>
          <p><strong>René Klenz</strong><br />Digital services<br />[Add street and number]<br />[Add postal code and city]<br />Germany</p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>Email: <a href="mailto:reneklenz@gmail.com">reneklenz@gmail.com</a><br />Phone: <a href="tel:+4917645812748">+49 176 45812748</a></p>
        </section>
        <p><em>Note: Replace the placeholders with your final legal details before launch.</em></p>
      `,
    },
  },
  datenschutz: {
    title: { de: "Datenschutzerklärung", en: "Privacy policy" },
    description: {
      de: "Informationen zur Verarbeitung personenbezogener Daten auf dieser Website.",
      en: "Information about personal data processing on this website.",
    },
    html: {
      de: `
        <section>
          <h2>1. Verantwortlicher</h2>
          <p>René Klenz, Digitale Dienstleistungen<br />E-Mail: <a href="mailto:reneklenz@gmail.com">reneklenz@gmail.com</a></p>
        </section>
        <section>
          <h2>2. Hosting und technische Bereitstellung</h2>
          <p>Diese Website wird über einen Hosting-Dienst bereitgestellt. Beim Aufruf werden technisch notwendige Daten (z. B. IP-Adresse, Zeitpunkt, angeforderte Seite, Browser-Typ) verarbeitet, um die Website stabil und sicher auszuliefern.</p>
        </section>
        <section>
          <h2>3. Kontaktaufnahme</h2>
          <p>Es gibt kein Online-Kontaktformular. Wenn Sie mich per E-Mail oder Telefon kontaktieren, verarbeite ich die von Ihnen übermittelten Daten ausschließlich zur Bearbeitung Ihrer Anfrage.</p>
        </section>
        <section>
          <h2>4. CMS / Sanity</h2>
          <p>Inhalte dieser Website können über Sanity CMS gepflegt werden. Dabei werden Inhaltsdaten beim Abruf der Seite ausgeliefert. Es werden keine optionalen Tracking- oder Marketing-Tools über Sanity eingebunden.</p>
        </section>
        <section>
          <h2>5. PWA / lokale Speicherung</h2>
          <p>Die Website kann als Progressive Web App installiert werden. Dafür können lokal gespeichert werden: Spracheinstellung und Service-Worker-Cache für schnellere Wiederaufrufe. Es werden keine optionalen Analyse-Cookies gesetzt.</p>
        </section>
        <section>
          <h2>6. Ihre Rechte</h2>
          <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch und Datenübertragbarkeit im Rahmen der gesetzlichen Vorgaben.</p>
        </section>
        <p><em>Hinweis: Vor dem Livegang sollte hier der finale Datenschutztext (z. B. eRecht24) eingefügt und mit der tatsächlichen technischen Umsetzung abgeglichen werden.</em></p>
      `,
      en: `
        <section>
          <h2>1. Controller</h2>
          <p>René Klenz, digital services<br />Email: <a href="mailto:reneklenz@gmail.com">reneklenz@gmail.com</a></p>
        </section>
        <section>
          <h2>2. Hosting</h2>
          <p>This website is delivered through a hosting provider. Basic technical data is processed to serve pages securely and reliably.</p>
        </section>
        <section>
          <h2>3. Contact</h2>
          <p>There is no contact form. If you contact me by email or phone, I process your data only to handle your request.</p>
        </section>
        <section>
          <h2>4. PWA / local storage</h2>
          <p>The site can be installed as a PWA. Language preference and cached assets may be stored locally. No optional analytics cookies are used.</p>
        </section>
        <p><em>Note: Replace this section with your final privacy policy before launch.</em></p>
      `,
    },
  },
  cookies: {
    title: { de: "Cookie-Einstellungen", en: "Cookie settings" },
    description: {
      de: "Informationen zu Cookies und lokaler Speicherung auf dieser Website.",
      en: "Information about cookies and local storage on this website.",
    },
    html: {
      de: `
        <section>
          <h2>Cookies und lokale Speicherung</h2>
          <p>Diese Website verwendet derzeit keine optionalen Tracking-, Analyse- oder Marketing-Cookies.</p>
          <p>Für technische Komfortfunktionen kann der Browser lokale Speicherfunktionen nutzen, zum Beispiel für die Spracheinstellung und den Service-Worker-Cache der PWA.</p>
        </section>
        <section>
          <h2>Ihre Einstellungen</h2>
          <p>Da aktuell keine optionalen Cookies gesetzt werden, ist kein Cookie-Banner erforderlich. Gespeicherte Browserdaten können Sie jederzeit in den Browser-Einstellungen löschen.</p>
        </section>
      `,
      en: `
        <section>
          <h2>Cookies and local storage</h2>
          <p>This website currently does not use optional tracking, analytics or marketing cookies.</p>
          <p>Local storage may be used for language preference and PWA caching only.</p>
        </section>
      `,
    },
  },
  barrierefreiheit: {
    title: { de: "Erklärung zur Barrierefreiheit", en: "Accessibility statement" },
    description: {
      de: "Informationen zur Barrierefreiheit dieser Website.",
      en: "Accessibility information for this website.",
    },
    html: {
      de: `
        <section>
          <h2>Stand der Vereinbarkeit</h2>
          <p>Diese Website ist teilweise mit den Anforderungen des Barrierefreiheitsstärkungsgesetzes (BFSG) vereinbar. Ich arbeite laufend an besserer Kontrastwahrnehmung, Tastaturbedienbarkeit und semantischer Struktur.</p>
        </section>
        <section>
          <h2>Umgesetzte Maßnahmen</h2>
          <ul>
            <li>Semantische Überschriften und Landmark-Struktur</li>
            <li>Fokus-States für interaktive Elemente</li>
            <li>Dark-Mode mit ausreichendem Kontrast</li>
            <li>Textalternativen für zentrale Bilder</li>
            <li>Responsive Darstellung für mobile Endgeräte</li>
          </ul>
        </section>
        <section>
          <h2>Feedback und Kontakt</h2>
          <p>Wenn Sie Barrieren feststellen, schreiben Sie mir bitte an <a href="mailto:reneklenz@gmail.com">reneklenz@gmail.com</a>. Ich bemühe mich um eine schnelle Prüfung und Verbesserung.</p>
        </section>
      `,
      en: `
        <section>
          <h2>Conformance status</h2>
          <p>This website is partially aligned with common accessibility requirements. Contrast, keyboard use and semantic structure are continuously improved.</p>
        </section>
        <section>
          <h2>Feedback</h2>
          <p>If you notice accessibility barriers, please email <a href="mailto:reneklenz@gmail.com">reneklenz@gmail.com</a>.</p>
        </section>
      `,
    },
  },
};

export const legalPageKeys = Object.keys(legalPages) as LegalPageKey[];
