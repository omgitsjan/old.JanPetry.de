---
title: '[DE] Einführung in das .NET Testing: Ein kleiner Überblick'
description: Ein kleiner Blogartikel darüber, was .NET Testing ist und wie es funktioniert, mit besonderem Schwerpunkt auf NUnit.
publishedAt: '2023-06-01'
aside: false
excerpt: Ein kleiner Blogartikel darüber, was .NET Testing ist und wie es funktioniert, mit besonderem Schwerpunkt auf NUnit.
tags:
  - testing
  - dotnet
newsletter: false
---

Mit diesem Beitrag will ich euch das Thema .NET Testing etwas näher bringen. Da die Softwareentwicklung ein fortlaufender Prozess der Verbesserung und Optimierung ist, spielt das Testing dabei eine entscheidende Rolle. Das Testen hilft uns, unser Vertrauen in den Code zu stärken, den wir schreiben, und natürlich Probleme frühzeitig zu identifizieren. Wir werden uns in diesem Beitrag auf das NUnit-Framework konzentrieren, allerdings existieren zahlreiche weitere Testing-Frameworks in .NET, welche vergleichbare Ansätze verfolgen.

## .NET Testing Frameworks: NUnit und mehr

Das NUnit-Framework ist ein weit verbreitetes Tool in der .NET Welt und dient zur Erstellung von Unit-Tests. Ursprünglich inspiriert von JUnit, hat NUnit sich weiterentwickelt und bietet nun eine umfangreiche Palette an Features, die das Testen deutlich erleichtern und effizienter machen.

Andere verbreitete .NET Testframeworks sind z. B. xUnit und MSTest. Alle drei haben ihre Stärken und Schwächen und die Wahl hängt oft von den Anforderungen und des Projekts und der eigenen Erfahrung mit den Frameworks ab. Heute wollen wir uns aber, wie schon erwähnt, nur auf NUnit als Framework konzentriert.

In NUnit verwenden wir Attribute, um Testmethoden zu kennzeichnen und ihren Ablauf zu steuern. Schauen wir uns zunächst an, was Attributen überhaupt sind. In .NET vereinfachen sie nicht nur, sondern helfen aktiv besseren Code zu schreiben. Sie annotieren den Code und können zur Laufzeit Verhalten beeinflussen.

## Was sind also jetzt genau Attribute?

In .NET können Attribute dazu verwendet werden, zusätzliche Informationen zu Codeelementen wie Klassen, Methoden oder Eigenschaften zu liefern. Sie können als eine Form der Metadaten betrachtet werden, die während der Laufzeit über Reflexion abgerufen werden können.

In .NET wird das Konzept der Attribute durch den Einsatz von eckigen Klammern dargestellt. Ein Attribut kann Parameter haben und kann auf verschiedene Codeelemente angewendet werden. Beispielsweise kann das `[Required]` Attribut dazu verwendet werden, anzugeben, dass eine Eigenschaft für das Model in einer Form erforderlich ist.

## Der Einsatz von Attributen im Testing

- `[Test]`: Dieses Attribut wird genutzt, um eine Methode als Testmethode zu markieren.

```csharp
[Test]
public void Sollte_Wahr_Sein()
{
    Assert.IsTrue(true);
}
```

- `[SetUp]` und `[TearDown]`: Diese Attribute werden verwendet, um Methoden zu kennzeichnen, die jeweils vor und nach jedem Test ausgeführt werden sollen. Sie sind besonders nützlich für die Initialisierung und Bereinigung von Testdaten.

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

- `[TestCase(...)]`: Dieses Attribut ist sehr hilfreich und ermöglicht es, mehrere Testfälle für die gleiche Methode zu definieren. Es erlaubt uns, verschiedene Eingabewerte und erwartete Ausgabewerte anzugeben, was die Wiederverwendung von Testcode erleichtert.

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

### Arrange (Vorbereiten)

Dieser Teil beinhaltet die Einrichtung der Bedingungen für den Test. Hier erstellen Sie die nötigen Objekte, setzen die richtigen Werte und bereiten alle Ressourcen vor, die für den Test benötigt werden. Es ist der Ort, an dem Sie das Szenario für den Test „arrangieren“.

Beispiel:

```csharp
var controller = new HomeController(); var expectedViewName = "Index";
```

### Act (Handeln)

Der "Act"-Abschnitt des Tests führt die Aktion aus, die getestet werden soll. Im Allgemeinen handelt es sich hierbei um den Aufruf einer Methode oder Funktion mit den im "Arrange"-Abschnitt erstellten Objekten.

Beispiel:

```csharp
var result = controller.Index() as ViewResult;
```

### Assert (Prüfen)

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

Das ist also jetzt unser Test. Test sollen in der Regel einfach gelesen werden. Hier kann man also gut sehen, dass wir zuerst alles vorbereiten. Den AppInfoService initialisieren und danach überprüfen, ob das, was wir hereingeben, auch so herauskommt, dass es für uns passt. Wenn ich nun extra einen Fehler einbaue und der Test fehlschlägt, erscheint es Rot.

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
