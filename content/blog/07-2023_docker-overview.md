---
title: "[DE] Docker: Ein Einblick in die Container Revolution"
description: "Ein detaillierter Blogartikel, der erklärt, was Docker ist, warum es bei Entwicklern so beliebt ist und wie es funktioniert."
publishedAt: "2023-07-01"
aside: false
excerpt: "Ein detaillierter Blogartikel, der erklärt, was Docker ist, warum es bei Entwicklern so beliebt ist und wie es funktioniert."
tags:
  - container
  - docker
newsletter: false
---

Docker sollte jedem Entwickler kein unbekannter Name sein. Es ist ein Name, der in Tech-Blogs zitiert, auf Konferenzen diskutiert und in Foren lebhaft debattiert wird. Aber was genau ist Docker? Warum erzeugt es so viel Aufsehen in der Entwicklergemeinschaft und warum scheint es, als ob jeder über Docker spricht? Um diese Fragen zu beantworten, müssen wir zuerst verstehen, was Docker ist und was es tut.

## Was ist Docker?

Docker ist im Grunde ein Open-Source-Projekt, das es Entwicklern und Systemadministratoren ermöglicht, Anwendungen in Containern zu verpacken. Diese Container sind standardisierte Einheiten, die alles enthalten, was eine Anwendung zum Laufen braucht: Code, Laufzeitumgebung, Systembibliotheken und Systemwerkzeuge. Dies bedeutet, dass eine Anwendung in einem Docker-Container auf jeder Maschine laufen kann, die Docker installiert hat, unabhängig vom Betriebssystem und den spezifischen Systemkonfigurationen dieser Maschine.

## Warum ist Docker so beliebt?

Aber warum ist Docker so populär geworden, besonders unter Entwicklern? Die Antwort liegt in den Vorteilen, die Docker bietet und die lässt sich auf einige Punkte zurückführen:

### Effizienz und Konsistenz

Docker-Container machen das Ausrollen von Software effizienter. Da sie alles haben, was eine Anwendung zum Laufen braucht, kann man sicher sein, dass die Anwendung überall gleich funktioniert – egal ob auf dem eigenen Rechner oder auf einem Server in der Cloud. Das bedeutet, es gibt keine Ausreden mehr wie "bei mir läuft's"!

### Isolation und Sicherheit

Jeder Docker-Container läuft für sich und stört andere nicht. Das ist gut für die Sicherheit, denn wenn eine Anwendung Probleme hat, bleiben die anderen unberührt.

### Portabilität

Docker-Container können auf jedem Rechner laufen, auf dem Docker installiert ist, egal welches Betriebssystem darunter läuft. Das ist super praktisch, wenn man Anwendungen zwischen verschiedenen Umgebungen hin- und herbewegen muss, wie zum Beispiel zwischen Entwicklung, Test und Produktion.

### Skalierbarkeit

Mit Docker ist es einfach, Anwendungen je nach Bedarf hoch- und runterzufahren. Braucht man mehr Leistung, kann man einfach weitere Container starten und genauso einfach wieder stoppen, wenn sie nicht mehr gebraucht werden.

## Wie funktioniert Docker?

Docker nutzt Funktionen des Linux-Kernels, um jedem Container seinen eigenen Platz zum Laufen zu geben. Aber das Schöne an Docker ist, dass es für den Benutzer super einfach zu bedienen ist.

### Docker Images und Container

In Docker gibt es Images und Container. Ein Image ist ein Paket, das alles hat, was eine Software zum Laufen braucht. Ein Container ist quasi eine laufende Kopie dieses Images. Man kann sich ein Image als das Rezept und einen Container als das fertige Gericht vorstellen. Images kann man nicht verändern, während man Container starten, stoppen, bewegen und löschen kann.

### Dockerfile

Um ein Docker-Image zu erstellen, schreibt man ein Dockerfile. In diesem Textdokument stehen Anweisungen, die Docker folgt, um das Image zu erstellen. Ein Dockerfile könnte zum Beispiel sagen, welches Basis-Image man verwenden will (wie eine Python- oder Node.js-Umgebung), welchen Anwendungscode man einfügen will und welche Befehle ausgeführt werden sollen, wenn der Container startet.

### Docker-Befehle

Docker hat eine Befehlszeilenschnittstelle, mit der man Images und Container verwalten kann. Mit `docker build` erstellt man ein Image aus einem Dockerfile. Mit `docker run` startet man einen Container aus einem Image

### Docker Beispiele als Code Snippets

#### Beispiel für ein .dockerfile\*\*

```bash
    # Schritt 1: Verwende ein Basis-Image mit .NET Core SDK
    FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
    WORKDIR /app

    # Schritt 2: Kopiere den Projektcode in das Docker-Image
    COPY . ./

    # Schritt 3: Stelle die Anwendung zusammen
    RUN dotnet publish -c Release -o out

    # Schritt 4: Erstelle ein Runtime-Image
    FROM mcr.microsoft.com/dotnet/aspnet:7.0
    WORKDIR /app
    COPY --from=build-env /app/out .

    # Schritt 5: Starte die Anwendung beim Starten des Containers
    ENTRYPOINT ["dotnet", "MyApp.dll"]
```

#### Beispiel Docker-Befehle

Erstellen Sie ein Image aus dem Dockerfile (build):

```bash
    docker build -t mein-app-name .
```

Starten Sie einen Container aus dem Image (run):

```bash
    docker run -p 8080:8080 mein-app-name
```

In diesen Beispielen steht `-t mein-app-name` für das Tagging des Images mit dem Namen "mein-app-name", und `-p 8080:8080` für das Weiterleiten des Ports 8080 vom Host zum Container. Der Punkt am Ende des `docker build` Befehls sagt Docker, dass es das Dockerfile im aktuellen Verzeichnis verwenden soll.

## Schlussfolgerung

Docker hat die Art und Weise, wie Anwendungen erstellt, ausgerollt und ausgeführt werden, revolutioniert. Durch die Lösung des Problems "bei mir läuft's" hat Docker die Softwareentwicklung, das Testen und das Ausrollen einfacher und effizienter gemacht. Für diejenigen, die sich noch nicht in die Welt von Docker gewagt haben, gibt es keinen besseren Zeitpunkt, um zu starten.

In zukünftigen Beiträgen werden tiefer in Docker eingetaucht, fortgeschrittenere Themen wie Docker Compose und wie Docker in eine CI/CD-Pipeline integriert werden kann, erforscht. Bleibt dran!

In der Zwischenzeit schau doch gerne mal meinen [Discord Bot](https://github.com/omgitsjan/DiscordBotAI) an, dieser hat ebenfalls sein eigenes [Docker Image](https://hub.docker.com/r/omgitsjan/discordbotai).

Weitere Quellen:

[Docker Webseite](https://www.docker.com/)

[Docker Dokumentation](https://docs.docker.com/get-started/overview/)
