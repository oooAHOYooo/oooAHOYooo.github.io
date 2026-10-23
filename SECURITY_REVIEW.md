# Security maintenance — October 23, 2026

Updated Electron, electron-builder, Cordova platform packages, Flask, and
Flask-CORS. Both Node project roots pin Node 24.22.1. Electron's window now
disables Node integration and enables context isolation and sandboxing. The
desktop package now points to the existing main.js instead of missing Cordova
Electron entry files. The tracker development server binds to loopback with
debugging disabled; production should use a WSGI server.

## Validation and remaining work

- Root npm lockfile audit: zero reported vulnerabilities.
- Legacy ahoyApp lockfile audit: 10 affected packages (8 high, 2 moderate),
  through Cordova's braces/micromatch/fast-glob and xcode/uuid dependencies.
  Current platform releases still retain these findings. npm's force fixes
  propose platform downgrades and were not applied. Native builds need testing
  before redistributing the upgraded app.
- Desktop packaging and GUI behavior have not been verified. Installing a
  newer Node on the host is required; the existing local Node is 20.20.2.
- The tracker accepts unauthenticated tracking events with permissive CORS.
  Before public use, review rate limits, accepted origins, payload limits,
  retention, and persistent log storage. It currently writes local CSV files.

## Render follow-up

No Render configuration, PHP source, or Dockerfile was found in this repository.
This review does not establish which services are currently deployed.

For any Render service using this repository, check the dashboard NODE_VERSION
override (it takes precedence over .node-version), set 24.22.1 or a later
patched 24.x version, and rebuild. A new native-runtime build refreshes the
system certificate store. Update Docker base images and CA stores separately
where applicable. This tracker does not use Requests/HTTPX/Certifi; other
Python services using Certifi need version 2026.10.19 or later. Updating this
repository does not update other applications or already distributed binaries.

Guidance: https://render.com/docs/advisory-emudhra and
https://render.com/docs/advisory-php2shell.
