/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
import React, { useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import './Imprint.css'


const ImprintHTML = () => {
	const impRef = useRef(null)
	const priRef = useRef(null)

	const [impIsOpen, openImp] = useState(0)
	const [priIsOpen, openPri] = useState(0)

	return (
		<>
			<Helmet>
				<title>iFound.one – Site Notice & Privacy Protection</title>
				{/* <meta name="description" content="iFound.one tries hard not to record any user data. Except for your name and your location information, no data will be transmitted. Photos are cleaned from all meta information when saved on our servers and are provided with a Creative Commons license." /> */}
				<meta name="description" content="iFound.one gibt sich größte Mühe, keine Nutzerdaten aufzuzeichnen. Bis auf den angegeben Namen und deine Angaben zum Fundort werden keine Daten übermittelt. Fotos werden beim Abspeichern auf unseren Servern von allen Metainformationen bereinigt und mit einer Creative Commons Lizenz versehen." />
				<link rel="canonical" href="https://www.ifound.one/imprint/" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="iFound.one" />
				<meta property="og:site_name" content="iFound.one" />
				<meta property="og:url" content="https://www.ifound.one/gallery/" />
				<meta property="og:image" content="https://www.ifound.one/logo.svg" />
				{/* <meta property="og:description" content="iFound.one tries hard not to record any user data. Except for your name and your location information, no data will be transmitted. Photos are cleaned from all meta information when saved on our servers and are provided with a Creative Commons license." /> */}
				<meta property="og:description" content="iFound.one gibt sich größte Mühe, keine Nutzerdaten aufzuzeichnen. Bis auf den angegeben Namen und deine Angaben zum Fundort werden keine Daten übermittelt. Fotos werden beim Abspeichern auf unseren Servern von allen Metainformationen bereinigt und mit einer Creative Commons Lizenz versehen." />
			</Helmet>
			<section id="legal" className="container-fluid row pb-3 mx-auto">

				<article
					id="disclaimer"
					className="text-center mt-5 pb-2 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 text-flip-more"
				>
					<h1 className="display-1">Wir speichern gar nichts.</h1>
					<h2 className="h5">
						iFound.one gibt sich größte Mühe, keine Nutzerdaten aufzuzeichnen. Bis auf den angegeben Namen und deine Angaben zum Fundort werden keine Daten übermittelt. Fotos werden beim Abspeichern auf unseren Servern von allen Metainformationen bereinigt und mit einer Creative Commons Lizenz versehen. Weitere Informationen dazu findest du
						{' '}
						<a href="http://creativecommons.org/licenses/by-nc/4.0/" rel="noopener noreferrer">hier</a>
						.
					</h2>
				</article>

				<article
					ref={impRef}
					id="imprint"
					className={`my-3 col-lg-8 offset-lg-2 rounded bg-primary bg-secondary text-white${(!impIsOpen) ? ' collapsed' : ''}`}
				>

					<h1
						onClick={() => openImp(!impIsOpen)}
						onKeyPress={(e) => (e.key === 'Enter' ? openImp(!impIsOpen) : null)}
					>
						Impressum

					</h1>

					<div>

						<h2>Angaben gemäß § 5 TMG</h2>
						<p>
							Peter Thoma
							<br />
							Böhlerweg 52
							<br />
							40549 Düsseldorf
						</p>

						<h2>Kontakt</h2>
						<p>
							Telefon: ‭+49 151 51587143‬
							<br />
							E-Mail: pete@ifound.one
						</p>

						<h3>Haftung für Inhalte</h3>
						<p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
						<p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
						<h3>Haftung für Links</h3>
						<p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.</p>
						<p>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
						<h3>Urheberrecht</h3>
						<p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
						<p>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>


						{/* <h1>Site Notice</h1>

						<h2>Information pursuant to Sect. 5 German Telemedia Act (TMG)</h2>
						<p>Peter Thoma<br />
						Böhlerweg 52<br />
						40549 Düsseldorf</p>

						<h2>Contact</h2>
						<p>Phone: ‭+49 151 51587143‬<br />
						E-mail: pete@ifound.one</p>

						<h3>Liability for Contents</h3> <p>As service providers, we are liable for own contents of these websites according to Paragraph 7, Sect. 1 German Telemedia Act (TMG). However, according to Paragraphs 8 to 10 German Telemedia Act (TMG), service providers are not obligated to permanently monitor submitted or stored information or to search for evidences that indicate illegal activities.</p> <p>Legal obligations to removing information or to blocking the use of information remain unchallenged. In this case, liability is only possible at the time of knowledge about a specific violation of law. Illegal contents will be removed immediately at the time we get knowledge of them.</p> <h3>Liability for Links</h3> <p>Our offer includes links to external third party websites. We have no influence on the contents of those websites, therefore we cannot guarantee for those contents. Providers or administrators of linked websites are always responsible for their own contents.</p> <p>The linked websites had been checked for possible violations of law at the time of the establishment of the link. Illegal contents were not detected at the time of the linking. A permanent monitoring of the contents of linked websites cannot be imposed without reasonable indications that there has been a violation of law. Illegal links will be removed immediately at the time we get knowledge of them.</p> <h3>Copyright</h3> <p>Contents and compilations published on these websites by the providers are subject to German copyright laws. Reproduction, editing, distribution as well as the use of any kind outside the scope of the copyright law require a written permission of the author or originator. Downloads and copies of these websites are permitted for private use only.<br /> The commercial use of our contents without permission of the originator is prohibited.</p> <p>Copyright laws of third parties are respected as long as the contents on these websites do not originate from the provider. Contributions of third parties on this site are indicated as such. However, if you notice any violations of copyright law, please inform us. Such contents will be removed immediately.</p> */}

					</div>

				</article>

				<article
					ref={priRef}
					id="privacyPolicy"
					className={`my-3 col-lg-8 offset-lg-2 rounded bg-primary bg-secondary text-white${(!priIsOpen) ? ' collapsed' : ''}`}
				>

					<h1
						onClick={() => openPri(!priIsOpen)}
						onKeyPress={(e) => (e.key === 'Enter' ? openPri(!priIsOpen) : null)}
					>
						Daten&shy;schutz&shy;erklärung

					</h1>

					<div>

						<h2>1. Datenschutz auf einen Blick</h2>
						<h3>Allgemeine Hinweise</h3>
						<p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.</p>
						<h3>Datenerfassung auf dieser Website</h3>
						<p><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
						<p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>
						<p><strong>Wie erfassen wir Ihre Daten?</strong></p>
						<p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.</p>
						<p>Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.</p>
						<p><strong>Wofür nutzen wir Ihre Daten?</strong></p>
						<p>Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.</p>
						<p><strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong></p>
						<p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.</p>
						<p>Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.</p>
						<h2>2. Hosting und Content Delivery Networks (CDN)</h2>
						<h3>Externes Hosting</h3>
						<p>Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Webseitenzugriffe und sonstige Daten, die über eine Website generiert werden, handeln.</p>
						<p>Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).</p>
						<p>Unser Hoster wird Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung seiner Leistungspflichten erforderlich ist und unsere Weisungen in Bezug auf diese Daten befolgen.</p>
						<p><strong>Abschluss eines Vertrages über Auftragsverarbeitung</strong></p>
						<p>Um die datenschutzkonforme Verarbeitung zu gewährleisten, haben wir einen Vertrag über Auftragsverarbeitung mit unserem Hoster geschlossen.</p>
						<h3>Cloudflare</h3>
						<p>Wir nutzen den Service „Cloudflare“. Anbieter ist die Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, USA (im Folgenden „Cloudflare”).</p>
						<p>Cloudflare bietet ein weltweit verteiltes Content Delivery Network mit DNS an. Dabei wird technisch der Informationstransfer zwischen Ihrem Browser und unserer Webseite über das Netzwerk von Cloudflare geleitet. Das versetzt Cloudflare in die Lage, den Datenverkehr zwischen Ihrem Browser und unserer Webseite zu analysieren und als Filter zwischen unseren Servern und potenziell bösartigem Datenverkehr aus dem Internet zu dienen. Hierbei kann Cloudflare auch Cookies einsetzen, die jedoch allein zum hier beschriebenen Zweck eingesetzt werden.</p>
						<p>Wir haben mit Cloudflare einen Vertrag über Auftragsverarbeitung abgeschlossen. Cloudflare ist zudem zertifizierter Teilnehmer des „EU-US Privacy Shield Frameworks“. Cloudflare hat sich dazu verpflichtet, sämtliche aus den Mitgliedstaaten der Europäischen Union (EU) erhaltenen personenbezogenen Daten gemäß dem „Privacy Shield Framework“ zu handhaben.</p>
						<p>Der Einsatz von Cloudflare beruht auf unserem berechtigten Interesse an einer möglichst fehlerfreien und sicheren Bereitstellung unseres Webangebotes (Art. 6 Abs. 1 lit. f DSGVO).</p>
						<p>
							Weitere Informationen zum Thema Sicherheit und Datenschutz bei Cloudflare finden Sie hier:
							{' '}
							<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">https://www.cloudflare.com/privacypolicy/</a>
							.
						</p>
						<h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
						<h3>Datenschutz</h3>
						<p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
						<p>Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.</p>
						<p>Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.</p>
						<h3>Hinweis zur verantwortlichen Stelle</h3>
						<p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
						<p>
							Peter Thoma
							<br />
							Böhlerweg 52
							<br />
							40549 Düsseldorf
						</p>

						<p>
							Telefon: ‭+49 151 51587143‬
							<br />
							E-Mail: pete@ifound.one
						</p>
						<p>Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.</p>
						<h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
						<p>Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.</p>
						<h3>Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3>
						<p>WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).</p>
						<p>WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).</p>
						<h3>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
						<p>Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.</p>
						<h3>Recht auf Datenübertragbarkeit</h3>
						<p>Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.</p>
						<h3>SSL- bzw. TLS-Verschlüsselung</h3>
						<p>Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>
						<p>Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.</p>
						<h3>Auskunft, Löschung und Berichtigung</h3>
						<p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.</p>
						<h3>Recht auf Einschränkung der Verarbeitung</h3>
						<p>Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:</p>
						<ul>
							<li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
							<li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.</li>
							<li>Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
							<li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
						</ul>
						<p>Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.</p>
						<h2>4. Datenerfassung auf dieser Website</h2>
						<h3>Cookies</h3>
						<p>Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.</p>
						<p>Teilweise können auch Cookies von Drittunternehmen auf Ihrem Endgerät gespeichert werden, wenn Sie unsere Seite betreten (Third-Party-Cookies). Diese ermöglichen uns oder Ihnen die Nutzung bestimmter Dienstleistungen des Drittunternehmens (z.B. Cookies zur Abwicklung von Zahlungsdienstleistungen).</p>
						<p>Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch notwendig, da bestimmte Webseitenfunktionen ohne diese nicht funktionieren würden (z.B. die Warenkorbfunktion oder die Anzeige von Videos). Andere Cookies dienen dazu, das Nutzerverhalten auszuwerten oder Werbung anzuzeigen.</p>
						<p>Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs (notwendige Cookies) oder zur Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (funktionale Cookies, z. B. für die Warenkorbfunktion) oder zur Optimierung der Webseite (z.B. Cookies zur Messung des Webpublikums) erforderlich sind, werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Sofern eine Einwilligung zur Speicherung von Cookies abgefragt wurde, erfolgt die Speicherung der betreffenden Cookies ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO); die Einwilligung ist jederzeit widerrufbar.</p>
						<p>Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.</p>
						<p>Soweit Cookies von Drittunternehmen oder zu Analysezwecken eingesetzt werden, werden wir Sie hierüber im Rahmen dieser Datenschutzerklärung gesondert informieren und ggf. eine Einwilligung abfragen.</p>
						<h3>Server-Log-Dateien</h3>
						<p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:</p>
						<ul>
							<li>Browsertyp und Browserversion</li>
							<li>verwendetes Betriebssystem</li>
							<li>Referrer URL</li>
							<li>Hostname des zugreifenden Rechners</li>
							<li>Uhrzeit der Serveranfrage</li>
							<li>IP-Adresse</li>
						</ul>
						<p>Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.</p>
						<p>Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.</p>
						<h2>5. Plugins und Tools</h2>
						<h3>OpenStreetMap</h3>
						<p>Wir nutzen den Kartendienst von OpenStreetMap (OSM). Anbieterin ist die Open-Street-Map Foundation (OSMF), 132 Maney Hill Road, Sutton Coldfield, West Midlands, B72 1JU, United Kingdom.</p>
						<p>Wenn Sie eine Website besuchen, auf der OpenStreetMap eingebunden ist, werden u. a. Ihre IP-Adresse und weitere Informationen über Ihr Verhalten auf dieser Website an die OSMF weitergeleitet. OpenStreetMap speichert hierzu unter Umständen Cookies in Ihrem Browser. Das sind Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich werden nutzen können.</p>
						<p>
							Ferner kann Ihr Standort erfasst werden, wenn Sie dies in Ihren Geräteeinstellungen – z. B. auf Ihrem Handy – zugelassen haben. Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung. Details entnehmen Sie der Datenschutzerklärung von OpenStreetMap unter folgendem Link:
							{' '}
							<a href="https://wiki.osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener noreferrer">https://wiki.osmfoundation.org/wiki/Privacy_Policy</a>
							.
						</p>
						<p>Die Nutzung von OpenStreetMap erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Sofern eine entsprechende Einwilligung abgefragt wurde (z. B. eine Einwilligung zur Speicherung von Cookies), erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.</p>


						{/* <h1>Privacy Policy</h1>
						<h2>1. An overview of data protection</h2>
						<h3>General information</h3> <p>The following information will provide you with an easy to navigate overview of what will happen with your personal data when you visit this website. The term “personal data” comprises all data that can be used to personally identify you. For detailed information about the subject matter of data protection, please consult our Data Protection Declaration, which we have included beneath this copy.</p>
						<h3>Data recording on this website</h3> <p><strong>Who is the responsible party for the recording of data on this website (i.e. the “controller”)?</strong></p> <p>The data on this website is processed by the operator of the website, whose contact information is available under section “Information Required by Law” on this website.</p> <p><strong>How do we record your data?</strong></p> <p>We collect your data as a result of your sharing of your data with us. This may, for instance be information you enter into our contact form.</p> <p>Other data shall be recorded by our IT systems automatically or after you consent to its recording during your website visit. This data comprises primarily technical information (e.g. web browser, operating system or time the site was accessed). This information is recorded automatically when you access this website.</p> <p><strong>What are the purposes we use your data for?</strong></p> <p>A portion of the information is generated to guarantee the error free provision of the website. Other data may be used to analyse your user patterns.</p> <p><strong>What rights do you have as far as your information is concerned?</strong></p> <p>You have the right to receive information about the source, recipients and purposes of your archived personal data at any time without having to pay a fee for such disclosures. You also have the right to demand that your data are rectified or eradicated. If you have consented to data processing, you have the option to revoke this consent at any time, which shall affect all future data processing. Moreover, you have the right to demand that the processing of your data be restricted under certain circumstances. Furthermore, you have the right to log a complaint with the competent supervising agency.</p> <p>Please do not hesitate to contact us at any time under the address disclosed in section “Information Required by Law” on this website if you have questions about this or any other data protection related issues.</p>
						<h2>2. Hosting and Content Delivery Networks (CDN)</h2>
						<h3>External Hosting</h3> <p>This website is hosted by an external service provider (host). Personal data collected on this website are stored on the servers of the host. These may include, but are not limited to, IP addresses, contact requests, metadata and communications, contract information, contact information, names, web page access, and other data generated through a web site.</p> <p>The host is used for the purpose of fulfilling the contract with our potential and existing customers (Art. 6 para. 1 lit. b GDPR) and in the interest of secure, fast and efficient provision of our online services by a professional provider (Art. 6 para. 1 lit. f GDPR).</p> <p>Our host will only process your data to the extent necessary to fulfil its performance obligations and to follow our instructions with respect to such data.</p>
						<p><strong>Execution of a contract data processing agreement</strong></p> <p>In order to guarantee processing in compliance with data protection regulations, we have concluded an order processing contract with our host.</p>
						<h3>Cloudflare</h3> <p>We use the “Cloudflare” service provided by Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, USA. (hereinafter referred to as “Cloudflare”).</p> <p>Cloudflare offers a content delivery network with DNS that is available worldwide. As a result, the information transfer that occurs between your browser and our website is technically routed via Cloudflare’s network. This enables Cloudflare to analyze data transactions between your browser and our website and to work as a filter between our servers and potentially malicious data traffic from the Internet. In conjunction with this, Cloudflare may also use cookies. However, these cookies will only be used for the purpose described herein. </p> <p>We have executed a contract processing agreement with Cloudflare. Cloudflare is also a certified participant of the “EU-US Privacy Shield Framework.” Cloudflare has undertaken to handle all personal data originating from the member states of the European Union (EU) in compliance with the “Privacy Shield Framework.”</p> <p>The use of Cloudflare is based on our legitimate interest in a provision of our website offerings that is as error free and secure as possible (Art. 6 Sect. 1 lit. f GDPR).</p> <p>For more information on Cloudflare’s security precautions and data privacy policies, please follow this link: <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">https://www.cloudflare.com/privacypolicy/</a>.</p>
						<h2>3. General information and mandatory information</h2>
						<h3>Data protection</h3> <p>The operators of this website and its pages take the protection of your personal data very seriously. Hence, we handle your personal data as confidential information and in compliance with the statutory data protection regulations and this Data Protection Declaration.</p> <p>Whenever you use this website, a variety of personal information will be collected. Personal data comprises data that can be used to personally identify you. This Data Protection Declaration explains which data we collect as well as the purposes we use this data for. It also explains how, and for which purpose the information is collected.</p> <p>We herewith advise you that the transmission of data via the Internet (i.e. through e-mail communications) may be prone to security gaps. It is not possible to completely protect data against third party access.</p>
						<h3>Information about the responsible party (referred to as the “controller” in the GDPR)</h3> <p>The data processing controller on this website is:</p> <p>Peter Thoma<br />
Böhlerweg 52<br />
40549 Düsseldorf</p>

						<p>Phone: ‭+49 151 51587143‬<br />
E-mail: pete@ifound.one</p>
						<p>The controller is the natural person or legal entity that single-handedly or jointly with others makes decisions as to the purposes of and resources for the processing of personal data (e.g. names, e-mail addresses, etc.).</p>
						<h3>Revocation of your consent to the processing of data</h3> <p>A wide range of data processing transactions are possible only subject to your express consent. You can also revoke at any time any consent you have already given us. To do so, all you are required to do is sent us an informal notification via e-mail. This shall be without prejudice to the lawfulness of any data collection that occurred prior to your revocation.</p>
						<h3>Right to object to the collection of data in special cases; right to object to direct advertising (Art. 21 GDPR)</h3> <p>IN THE EVENT THAT DATA ARE PROCESSED ON THE BASIS OF ART. 6 SECT. 1 LIT. E OR F GDPR, YOU HAVE THE RIGHT TO AT ANY TIME OBJECT TO THE PROCESSING OF YOUR PERSONAL DATA BASED ON GROUNDS ARISING FROM YOUR UNIQUE SITUATION. THIS ALSO APPLIES TO ANY PROFILING BASED ON THESE PROVISIONS. TO DETERMINE THE LEGAL BASIS, ON WHICH ANY PROCESSING OF DATA IS BASED, PLEASE CONSULT THIS DATA PROTECTION DECLARATION. IF YOU LOG AN OBJECTION, WE WILL NO LONGER PROCESS YOUR AFFECTED PERSONAL DATA, UNLESS WE ARE IN A POSITION TO PRESENT COMPELLING PROTECTION WORTHY GROUNDS FOR THE PROCESSING OF YOUR DATA, THAT OUTWEIGH YOUR INTERESTS, RIGHTS AND FREEDOMS OR IF THE PURPOSE OF THE PROCESSING IS THE CLAIMING, EXERCISING OR DEFENCE OF LEGAL ENTITLEMENTS (OBJECTION PURSUANT TO ART. 21 SECT. 1 GDPR).</p> <p>IF YOUR PERSONAL DATA IS BEING PROCESSED IN ORDER TO ENGAGE IN DIRECT ADVERTISING, YOU HAVE THE RIGHT TO AT ANY TIME OBJECT TO THE PROCESSING OF YOUR AFFECTED PERSONAL DATA FOR THE PURPOSES OF SUCH ADVERTISING. THIS ALSO APPLIES TO PROFILING TO THE EXTENT THAT IT IS AFFILIATED WITH SUCH DIRECT ADVERTISING. IF YOU OBJECT, YOUR PERSONAL DATA WILL SUBSEQUENTLY NO LONGER BE USED FOR DIRECT ADVERTISING PURPOSES (OBJECTION PURSUANT TO ART. 21 SECT. 2 GDPR).</p>
						<h3>Right to log a complaint with the competent supervisory agency</h3> <p>In the event of violations of the GDPR, data subjects are entitled to log a complaint with a supervisory agency, in particular in the member state where they usually maintain their domicile, place of work or at the place where the alleged violation occurred. The right to log a complaint is in effect regardless of any other administrative or court proceedings available as legal recourses.</p>
						<h3>Right to data portability</h3> <p>You have the right to demand that we hand over any data we automatically process on the basis of your consent or in order to fulfil a contract be handed over to you or a third party in a commonly used, machine readable format. If you should demand the direct transfer of the data to another controller, this will be done only if it is technically feasible.</p>
						<h3>SSL and/or TLS encryption</h3> <p>For security reasons and to protect the transmission of confidential content, such as purchase orders or inquiries you submit to us as the website operator, this website uses either an SSL or a TLS encryption programme. You can recognise an encrypted connection by checking whether the address line of the browser switches from “http://” to “https://” and also by the appearance of the lock icon in the browser line.</p> <p>If the SSL or TLS encryption is activated, data you transmit to us cannot be read by third parties.</p>
						<h3>Information about, rectification and eradication of data</h3> <p>Within the scope of the applicable statutory provisions, you have the right to at any time demand information about your archived personal data, their source and recipients as well as the purpose of the processing of your data. You may also have a right to have your data rectified or eradicated. If you have questions about this subject matter or any other questions about personal data, please do not hesitate to contact us at any time at the address provided in section “Information Required by Law.”</p>
						<h3>Right to demand processing restrictions</h3> <p>You have the right to demand the imposition of restrictions as far as the processing of your personal data is concerned. To do so, you may contact us at any time at the address provided in section “Information Required by Law.” The right to demand restriction of processing applies in the following cases:</p> <ul> <li>In the event that you should dispute the correctness of your data archived by us, we will usually need some time to verify this claim. During the time that this investigation is ongoing, you have the right to demand that we restrict the processing of your personal data.</li> <li>If the processing of your personal data was/is conducted in an unlawful manner, you have the option to demand the restriction of the processing of your data in lieu of demanding the eradication of this data.</li> <li>If we do not need your personal data any longer and you need it to exercise, defend or claim legal entitlements, you have the right to demand the restriction of the processing of your personal data instead of its eradication.</li> <li>If you have raised an objection pursuant to Art. 21 Sect. 1 GDPR, your rights and our rights will have to be weighed against each other. As long as it has not been determined whose interests prevail, you have the right to demand a restriction of the processing of your personal data.</li> </ul> <p>If you have restricted the processing of your personal data, these data – with the exception of their archiving – may be processed only subject to your consent or to claim, exercise or defend legal entitlements or to protect the rights of other natural persons or legal entities or for important public interest reasons cited by the European Union or a member state of the EU.</p>
						<h2>4. Recording of data on this website</h2>
						<h3>Cookies</h3> <p>Our websites and pages use what the industry refers to as “cookies.” Cookies are small text files that do not cause any damage to your device. They are either stored temporarily for the duration of a session (session cookies) or they are permanently archived on your device (permanent cookies). Session cookies are automatically deleted once you terminate your visit. Permanent cookies remain archived on your device until you actively delete them or they are automatically eradicated by your web browser.</p> <p>In some cases it is possible that third party cookies are stored on your device once you enter our site (third party cookies). These cookies enable you or us to take advantage of certain services offered by the third party (e.g. cookies for the processing of payment services).</p> <p>Cookies have a variety of functions. Many cookies are technically essential since certain website functions would not work in the absence of the cookies (e.g. the shopping cart function or the display of videos). The purpose of other cookies may be the analysis of user patterns or the display of promotional messages.</p> <p>Cookies, which are required for the performance of electronic communication transactions (required cookies) or for the provision of certain functions you want to use (functional cookies, e.g. for the shopping cart function) or those that are necessary for the optimization of the website (e.g. cookies that provide measurable insights into the web audience), shall be stored on the basis of Art. 6 Sect. 1 lit. f GDPR, unless a different legal basis is cited. The operator of the website has a legitimate interest in the storage of cookies to ensure the technically error free and optimized provision of the operator’s services. If your consent to the storage of the cookies has been requested, the respective cookies are stored exclusively on the basis of the consent obtained (Art. 6 Sect. 1 lit. a GDPR); this consent may be revoked at any time.</p> <p>You have the option to set up your browser in such a manner that you will be notified any time cookies are placed and to permit the acceptance of cookies only in specific cases. You may also exclude the acceptance of cookies in certain cases or in general or activate the delete function for the automatic eradication of cookies when the browser closes. If cookies are deactivated, the functions of this website may be limited.</p> <p>In the event that third party cookies are used or if cookies are used for analytical purposes, we will separately notify you in conjunction with this Data Protection Policy and, if applicable, ask for your consent.</p>
						<h3>Server log files</h3> <p>The provider of this website and its pages automatically collects and stores information in so-called server log files, which your browser communicates to us automatically. The information comprises:</p> <ul> <li>The type and version of browser used</li> <li>The used operating system</li> <li>Referrer URL</li> <li>The hostname of the accessing computer</li> <li>The time of the server inquiry</li> <li>The IP address</li> </ul> <p>This data is not merged with other data sources.</p> <p>This data is recorded on the basis of Art. 6 Sect. 1 lit. f GDPR. The operator of the website has a legitimate interest in the technically error free depiction and the optimization of the operator’s website. In order to achieve this, server log files must be recorded.</p>
						<h2>5. Plug-ins and Tools</h2>
						<h3>OpenStreetMap</h3> <p>We are using the mapping service provided by OpenStreetMap (OSM). The provider of this service is the Open-Street-Map Foundation (OSMF), 132 Maney Hill Road, Sutton Coldfield, West Midlands, B72 1JU, United Kingdom.</p> <p>When you visit any website, into which OpenStreetMap has been embedded, your IP address and other information concerning your behavior patterns on this website will be transferred to the OSMF. Under certain circumstances, OpenStreetMap will save cookies in your browser. Cookies are text files that are stored on your computer and that make it possible to conduct an analysis of your website use. You have the option to prevent the storage of cookies by making pertinent changes to the settings of your browser software. However, we have to point out that doing so may make it impossible for you to use all of the functions of this website to their fullest extent.</p> <p>Furthermore, your location may be recorded if you have permitted this in your device settings, for instance on your cell phone. The provider of this website has no control over this type of data transfer. For details, please consult the Data Privacy Policy of OpenStreetMap under the following link: <a href="https://wiki.osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener noreferrer">https://wiki.osmfoundation.org/wiki/Privacy_Policy</a>.</p> <p>We use OpenStreetMap with the objective of ensuring the attractive presentation of our online offers and to make it easy for visitors to find the locations we specify on our website. This establishes legitimate grounds as defined in Art. 6 Sect. 1 lit. f GDPR. If a corresponding agreement has been requested (e.g. an agreement to the storage of cookies), the processing takes place exclusively on the basis of Art. 6 para. 1 lit. a GDPR; the agreement can be revoked at any time.</p> */}

					</div>

				</article>

				<article id="credits" className="mt-4 mb-3 col-lg-8 offset-lg-2 text-center">
					Clover (marker) icon made by
					{' '}
					<a href="https://www.flaticon.com/authors/freepik" title="Freepik" rel="noopener noreferrer">Freepik</a>
					{' '}
					from
					{' '}
					<a href="https://www.flaticon.com/free-icon/clover_1530866" title="Flaticon" rel="noopener noreferrer">www.flaticon.com</a>
					<br />
					<br />
					non-profit driven & open-source powered
				</article>

			</section>
		</>
	)
}


export default ImprintHTML
