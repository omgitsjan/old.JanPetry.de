---
<<<<<<< HEAD
title: '[DE] Einführung in das .NET Testing: Ein kleiner Überblick'
description: 'Ein kleiner Blogartikel darüber, was .NET Testing ist und wie es funktioniert, mit besonderem Schwerpunkt auf NUnit.'
publishedAt: '2023-06-01'
publishOn: '2023-06-14'
status: public
aside: false
excerpt: 'Ein kleiner Blogartikel darüber, was .NET Testing ist und wie es funktioniert, mit besonderem Schwerpunkt auf NUnit.'
tags:
    - newsletter
    - testing
    - dotnet
---
  
Mit diesem Beitrag will ich euch das Thema .NET Testing etwas näher bringen. Da die Softwareentwicklung ein fortlaufender Prozess der Verbesserung und Optimierung ist, spielt das Testing dabei eine entscheidende Rolle. Das Testen hilft uns, unser Vertrauen in den Code zu stärken, den wir schreiben, und natürlich Probleme frühzeitig zu identifizieren. Wir werden uns in diesem Beitrag auf das NUnit-Framework konzentrieren, allerdings existieren zahlreiche weitere Testing-Frameworks in .NET, welche vergleichbare Ansätze verfolgen.

## .NET Testing Frameworks: NUnit und mehr

Das NUnit-Framework ist ein weit verbreitetes Tool in der .NET Welt und dient zur Erstellung von Unit-Tests. Ursprünglich inspiriert von JUnit, hat NUnit sich weiterentwickelt und bietet nun eine umfangreiche Palette an Features, die das Testen deutlich erleichtern und effizienter machen.

Andere verbreitete .NET Testframeworks sind z. B. xUnit und MSTest. Alle drei haben ihre Stärken und Schwächen und die Wahl hängt oft von den Anforderungen und des Projekts und der eigenen Erfahrung mit den Frameworks ab. Heute wollen wir uns aber, wie schon erwähnt, nur auf NUnit als Framework konzentriert.

In NUnit verwenden wir Attribute, um Testmethoden zu kennzeichnen und ihren Ablauf zu steuern. Schauen wir uns zunächst an, was Attributen überhaupt sind. In .NET vereinfachen sie nicht nur, sondern helfen aktiv besseren Code zu schreiben. Sie annotieren den Code und können zur Laufzeit Verhalten beeinflussen.

## Was sind also jetzt genau Attribute?

In .NET können Attribute dazu verwendet werden, zusätzliche Informationen zu Codeelementen wie Klassen, Methoden oder Eigenschaften zu liefern. Sie können als eine Form der Metadaten betrachtet werden, die während der Laufzeit über Reflexion abgerufen werden können.

In .NET wird das Konzept der Attribute durch den Einsatz von eckigen Klammern dargestellt. Ein Attribut kann Parameter haben und kann auf verschiedene Codeelemente angewendet werden. Beispielsweise kann das `[Required]` Attribut dazu verwendet werden, anzugeben, dass eine Eigenschaft für das Model in einer Form erforderlich ist.

Hier ein kleines Beispiel:
*INSERT PICTURE*

  

## Der Einsatz von Attributen im Testing

-   `[Test]`: Dieses Attribut wird genutzt, um eine Methode als Testmethode zu markieren.
```csharp
[Test]
public void Sollte_Wahr_Sein()
{
    Assert.IsTrue(true);
}
```
-   `[SetUp]` und `[TearDown]`: Diese Attribute werden verwendet, um Methoden zu kennzeichnen, die jeweils vor und nach jedem Test ausgeführt werden sollen. Sie sind besonders nützlich für die Initialisierung und Bereinigung von Testdaten.


```csharp
[SetUp] 
public void SetUp() 
{ 
	// Initialisierungscode hier... 
} 

[TearDown] 
public void TearDown() { 
	// Bereinigungscode hier... 
} 
```

-   `[TestCase(...)]`: Dieses Attribut ist sehr hilfreich und ermöglicht es, mehrere Testfälle für die gleiche Methode zu definieren. Es erlaubt uns, verschiedene Eingabewerte und erwartete Ausgabewerte anzugeben, was die Wiederverwendung von Testcode erleichtert.
```csharp
[TestCase(5, 10, 15)]
[TestCase(7, 3, 10)]
public void Sollte_Summe_Berechnen(int a, int b, int erwarteteSumme)
{
    int tatsaechlicheSumme = a + b;
    Assert.AreEqual(erwarteteSumme, tatsaechlicheSumme);
}
```
In diesem Fall führen wir denselben Test mit verschiedenen Eingabewerten aus und erwarten verschiedene Ergebnisse.

## Wie sieht so ein Test aus?

Bevor wir uns ein Test anschauen können, müssen wir verstehen wie Tests aufgebaut sind. Dazu nutzen wir das AAA-Modell (Arrange, Act, Assert), es ist eine übersichtliche und effektive Methode zur Strukturierung von Unit-Tests, die weit verbreitet ist, nicht nur in .NET, sondern in der gesamten Softwareentwicklung ist dies überall zu finden.

  

**Arrange (Vorbereiten)**

Dieser Teil beinhaltet die Einrichtung der Bedingungen für den Test. Hier erstellen Sie die nötigen Objekte, setzen die richtigen Werte und bereiten alle Ressourcen vor, die für den Test benötigt werden. Es ist der Ort, an dem Sie das Szenario für den Test „arrangieren“.

Beispiel:
```csharp
var controller = new HomeController(); var expectedViewName = "Index";
```
  

**Act (Handeln)**

Der "Act"-Abschnitt des Tests führt die Aktion aus, die getestet werden soll. Im Allgemeinen handelt es sich hierbei um den Aufruf einer Methode oder Funktion mit den im "Arrange"-Abschnitt erstellten Objekten.

Beispiel:
```csharp
var result = controller.Index() as ViewResult;
```
  

**Assert (Prüfen)**

Der letzte Abschnitt, "Assert", überprüft, ob das Ergebnis der "Act"-Phase mit den erwarteten Ausgaben übereinstimmt. Hier kommen die Assert-Methoden der Testbibliothek zum Einsatz, die in .NET durch das NUnit bereitgestellt werden.

Beispiel:
```csharp
Assert.IsNotNull(result); Assert.AreEqual(expectedViewName, result.ViewName);
```
## Test im echten Code als Beispiel

Hier handelt es sich um einen einfachen Test, der für eine bestimme, Anwendung die Assembly Version nimmt und diesen im Frontend anzeigt. Das ganze läuft über einen selbstgeschrieben Service. Wie man gleich im Code sehen kann, hat dieser Service auch schon einen Fall back.
```csharp
public string GetAssemblyVersion()
{
	var assembly = Assembly.GetExecutingAssembly();
	var fileVersionInfo = FileVersionInfo.GetVersionInfo(assembly.Location);
	var version = fileVersionInfo.FileVersion;

	return version ?? "Unbekannte Version";
}
```
  

Jetzt wissen wir natürlich nicht, ob das ganze auch nach etlichen Änderungen am Code oder vielleicht sogar am Assembly selbst, immer noch funktioniert. Und da kommen nun diese Tests hier ins Spiel. Der Assembly ist natürlich eine etwas schwieriger zu testende Komponente und wir mussten mit DI einen Provider über unseren Service legen, das soll uns aber erstmal nicht weiter stören, da wir uns ja nur auf die Tests an sich konzentrieren möchten.
```csharp
    [TestFixture]
    public class AppInfoServiceTests
    {
        private Mock<IVersionInfoProvider> _versionInfoProviderMock;
        private AppInfoService _appInfoService;

        [SetUp]
        public void Setup()
        {
            _versionInfoProviderMock = new Mock<IVersionInfoProvider>();
        }

        [Test]
        public void Constructor_Initializes_AssemblyVersion()
        {
            // Arrange
            var expectedVersion = "1.0.0";
            _versionInfoProviderMock.Setup(v => v.GetAssemblyVersion()).Returns(expectedVersion);

            // Act
            _appInfoService = new AppInfoService(_versionInfoProviderMock.Object);
            var actualVersion = _appInfoService.AssemblyVersion;

            // Assert
            Assert.That(actualVersion, Is.EqualTo(expectedVersion));
        }
    }
```
  

Das ist also jetzt unser Test. Test sollen in der Regel einfach gelesen werden. Hier kann man also gut sehen, dass wir zuerst alles vorbereiten. Den AppInfoService initialisieren und danach überprüfen, ob das, was wir hereingeben, auch so herauskommt, dass es für uns passt. In der Oberfläche von Visual Studio sieht das ganze dann so aus:
*INSERT PICTURE*


Wenn ich nun extra einen Fehler einbaue und der Test fehlschlägt, sieht das ganze wie folgt aus:
*INSERT PICTURE*

## Der Wert des Testings

Mit Testen stellen wir sicher, dass unser Code die erwartete Funktionalität liefert. Durch das Implementieren von Tests können wir sowohl die Korrektheit des Codes überprüfen als auch, dessen Qualität verbessern. Ein gut strukturierter und durchdachter Testplan hilft dabei, Fehler frühzeitig zu erkennen, was letztendlich zu robusterem und zuverlässigerem Code führt.

## Testen in Theorie vs. Praxis

Softwaretests sind in der Theorie ein strukturierter, klarer Prozess, unterstützt durch Tools wie NUnit und diverse Testarten. Zudem möchte man natürlich eine hohe, wenn nicht 100 % Abdeckung von seinem Code. In der Praxis jedoch werden wir mit komplexen Abhängigkeiten, Wartungsaufwand und Zeitdruck konfrontiert. Trotz dieser Herausforderungen ist das Praxistesten essenziell, um qualitativ hochwertige Software zu liefern. Selbst wenn es am Ende nur 30 % Abdeckung sind oder es aus Gründen nur wenige Tests sind, bringt uns jeder Test in der Praxis näher an das Ziel von allen: stabile und zuverlässige Software.

  

Wichtig zu erwähnen ist noch, dass wir oft hören, dass Code-Duplizierung vermieden werden sollte. Dieser Grundsatz, bekannt als DRY-Prinzip (Don't Repeat Yourself), ist ein Kernkonzept guter Programmierpraxis. Aber gilt das auch für unsere Tests? Interessanterweise nicht unbedingt. Beim Schreiben von Tests kann ein gewisses Maß an Duplizierung sogar von Vorteil sein. Tests sollen in erster Linie klar und leicht zu verstehen sein. Wenn das Verallgemeinern von Tests zu komplexem Code führt, der schwer zu lesen und zu verstehen ist, dann ist das kontraproduktiv. Schließlich möchten wir, dass jeder Test so einfach wie möglich ist, damit Fehler leicht identifiziert und behoben werden können. Zudem möchten wir, dass die Tests unabhängig voneinander sind, Methoden zu verallgemeiner bedeutet auch ggf. Abhängigkeiten einzubauen.

## Schlussfolgerung

Das war eine grundlegende Einführung in das .NET Testing, wobei der Schwerpunkt hier auf dem NUnit-Framework lag. Es ist wichtig zu betonen, dass das Erlernen und Anwenden von Testpraktiken ein fortlaufender Prozess ist und dass die bestehenden .NET Testframeworks viel mehr bieten als hier beschrieben wurde.

Es sollte unser Ziel sein, stets besseren und sichereren Code zu schreiben, und das Erlernen und Anwenden von Testing-Techniken ist ein wichtiger Schritt auf diesem Weg.

  

Weitere Quellen:

[NUnit Dokumentation](https://docs.nunit.org/)

[Testen in .NET - .NET | Microsoft Learn](https://learn.microsoft.com/de-de/dotnet/core/testing/)

[Unit Testing: Moq Framework | Microsoft Learn](https://learn.microsoft.com/en-us/shows/visual-studio-toolbox/unit-testing-moq-framework)

[Best practices for writing unit tests - .NET | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices)
=======
<<<<<<<< HEAD:content/blog/4.2023-may.md
title: "May 2023: South Korea Mountains and Unlighthouse Goes Viral"
description: "May was spent traveling to South Korea and Indonesia while working on Unlighthosue going viral."
publishedAt: '2023-06-01'
========
title: 'bUnit Testing: How can i Test Razor Views in Blazor'
description: 'What I got up to in April 2023, including traveling to Thailand and working through a bunch of bugs in my SEO modules.'
publishedAt: '2023-06-01'
publishOn: '2023-06-01'
# status: sponsors-only
>>>>>>>> 127c4e2 (More personalization):content/blog/06-2023_nunit-testing.md
aside: false
excerpt: 'May was spent traveling to South Korea and Indonesia while working on Unlighthosue going viral.'
ogImage:
  image: /may-seoul-exploring.png
tags:
  - newsletter
---

I'm traveling the world with my girlfriend, Alina, while working on open-source.

Catch up on what you might have missed:
- [March 2023: Planning a year of travel and moving out](/blog/2023-march)
- [April 2023: Thai New Year and Nuxt SEO Progress](/blog/2023-april)

## Personal Updates

### South Korea Travel

In May, we finished up our time in Thailand and traveled to South Korea for 2 weeks.

- Seoul - Amazing city with so much to do. The culture is very unique and the mountains surrounding the city are beautiful.
- Busan - Coastal city, kind of reminded me of the Gold Coast in Australia.
- Jeju - Island off the south coast of South Korea. Beautiful beaches and hiking.

We really loved the food, especially the Korean BBQ and bipimbap.

They had surprisingly good coffee, craft beer and pastries, which I partook in generously.

Hiking Bukhansan Mountain in Seoul and Hallasan Mountain in Jeju were definitely the highlights.

I would love to return one day and explore more of the country.

<Expand>
<div class="md:grid hidden grid-cols-2 gap-8 my-15">
<Image src="/may-jeju-coffee.png" alt="Open-source and coffee on Jeju"  no-margin />
<Image src="/may-black-pork.png" alt="Black pork and mungbean on Jeju"  no-margin />
<Image src="/may-bukhansan.png" alt="Top of Buhkansan Mountain" no-margin />
<Image src="/may-seoul-exploring.png" alt="Exploring Seoul At Night"  no-margin />
</div>
</Expand>

<div class="md:hidden block">
<Image src="/may-jeju-coffee.png" alt="Open-source and coffee on Jeju" />
<Image src="/may-black-pork.png" alt="Black pork and mungbean on Jeju" />
<Image src="/may-bukhansan.png" alt="Top of Buhkansan Mountain" />
<Image src="/may-seoul-exploring.png" alt="Exploring Seoul At Night" />
</div>

### Indonesia Travel

After South Korea, we flew to Jakarta, Indonesia with a quick stop over in Singapore.
We'll spend the next month here, until mid-June when we head back to Australia.

We're taking Indonesia pretty slow.
It's nice to have a bit of a break after the busy itinerary in South Korea and Thailand.

- Yogyakarta - University town, lots of culture, art and history. Hostels here have a really nice, social vibe.
- Bali - Ubud and Canggu.
  Canggu is very touristy, but the food is worth it.
  Melbourne Cafe tier.
  Ubud is quite touristy too, but you can see some
  amazing sights around like rice fields, temples and waterfalls.
- Gili Islands - Good snorkeling and chilling. (currently here)
- Flores - Planning lots of hikes for here. We're looking forward to Komodo National Park and Kelimutu volcano.

<Expand>
<div class="md:grid hidden grid-cols-2 gap-8 my-15">
<Image src="/may-indo-temple" alt="Borobudur temple in Yogyakarta" no-margin />
<Image src="/may-sate.png" alt="Top tier sate"  no-margin />
<Image src="/may-jungle.png" alt="Jungles around Sideman" no-margin />
<Image src="/may-cave.png" alt="Goa Gajah temple"  no-margin />
</div>
</Expand>

<div class="md:hidden block">
<Image src="/may-indo-temple" alt="Borobudur temple in Yogyakarta" />
<Image src="/may-sate.png" alt="Top tier sate" />
<Image src="/may-jungle.png" alt="Jungles around Sideman" />
<Image src="/may-cave.png" alt="Goa Gajah temple" />
</div>

## Work Updates

### Unlighthouse Goes Viral

Last month I had a DM from someone telling me that they had put Unlighthouse front of Jeff from Fireship.

I thought that was pretty cool in of itself, and I didn't think much more about it.

Next thing I knew, though, the Unlighthouse stars started going bananas.

<Image src="/may-unlighthouse-stars.png" alt="Unlighthouse stars going bananas" />

I did some quick research and found the culprit.

<iframe loading="lazy" class="max-w-full w-full" width="560" height="315" src="https://www.youtube.com/embed/0fONene3OIA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Very cool.

And with that, I had a massive influx of issues to deal with through GitHub and my Discord.

<Image src="/may-unlighthouse-issues.png" alt="Unlighthouse issues also going bananas" />

I started working through them, I would solve one, and two more would appear.
It took me the rest of my May to get control of them.

It wasn't a bad problem to have though.
I'm grateful to have Unlighthouse being used by so many people, and I'm glad it's helping people improve their sites.

It's given me a lot of ideas for how to improve it, and I'm excited to work on it more in the future.

## Numbers / Financials

- ⭐ 5407 GitHub stars (+1628)

<Image src="/may-wakatime.png" alt="My WakaTime numbers for May 2023" />

<Image src="/may-fathom.png" alt="My May 2023 Fathom Traffic" />

### Open-Source

- ⌛ 84 hrs (+13.25 hrs)
- 💸 $744 AUD (-$269) - Payout from Windi CSS the month before.
- $8.85 AUD / hour (-$5.46 / hour)

**Main projects**

- **27 hours [Unlighthouse](https://github.com/harlan-zw/unlighthouse)**

Some important improvements around reporting, authentication, how the chrome binary is used and Docker.

- **23 hours [nuxt-seo-kit](https://github.com/nuxt/nuxt)**

Extracting the breadcrumbs and site config logic into separate modules in preparation of v2. These will be released soon.

- **8 hours [nuxt-og-image](https://github.com/harlan-zw/nuxt-og-image)**

Getting the final issues solved so the v2 release can happen.

- **7.5 hours [nuxt-simple-sitemap](https://github.com/harlan-zw/nuxt-simple-sitemap)**

Some outstanding issues around runtime sitemaps and i18n.

### Freelancing

- ⌛ 8.25 hrs (+0.75 hrs)
- 💸 $1,025 AUD (+$800)
- $124.24 AUD / hour (+24.24 / hour)

I started some SEO work for a new client.

The work was to fix site-wide technical issues from Google Lighthouse.
This is exactly why I originally built Unlighthouse,
so it was perfect.

## June plans

I'll be landing back in Australia toward the middle of June.

I look forward to having a few weeks of routine.
I'll use this time to focus on getting Nuxt SEO Kit v2 released.

## Final thoughts

I'm really grateful to see the growth in Unlighthouse this month,
and I'm excited to finally release what I've been working on the for the last few months.

Thanks as always to my amazing sponsors.
See you next month.
.
>>>>>>> 229ed77 (More personalization)
