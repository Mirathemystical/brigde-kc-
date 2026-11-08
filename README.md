# BRIDGE KC
Kansas City workforce and community resource navigator. Static HTML/CSS/JavaScript, deployed with GitHub Pages.

## Run and check
`npm start` serves http://localhost:8000. `npm test` runs data, matching and page-integrity checks. `npm run build:data` regenerates resources.js after editing resources.json.

## Files
- resources.json: canonical resource records, sources, review status and matching metadata
- resources.js: generated browser data; no network fetch needed for directory loading
- resource-tools.js: safe card rendering and transparent quiz matching
- app.js: navigation, search, saved plans and email forms
- all-resources.html: searchable directory
- about.html, offer-help.html and category pages: focused visitor journeys

## Verification policy
A retrieved source is not a guarantee of current admission, funding, or eligibility. `reviewed` means the listed program facts were reviewed against provider sources on lastChecked. `source-located` means the page was located but all listing details still need confirmation. `needs-confirmation` identifies inaccessible or insufficient sources. Never assign a review date merely because a URL returns 200. Recheck temporary funding and waiting-list information before advising a visitor. Corrections use a prefilled email the visitor reviews and sends.

## Privacy and delivery
No accounts or server-side form storage. Plans stay in browser localStorage. Feedback and offers open mail drafts; the visitor must send them.

## Deployment
Only .github/workflows/pages.yml deploys. It runs local checks before uploading static files. Browser and provider-source checks complement these tests; passing CI does not certify every external service.
