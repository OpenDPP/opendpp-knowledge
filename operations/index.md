# Passports

* [GET /api/v1/passports](listPassports.md) - List passports in your workspace (paginated JSON-LD)
* [POST /api/v1/passports](createPassport.md) - Create (ingest) a Digital Product Passport
* [POST /api/v1/passports/validate-only](validatePassport.md) - Dry-run ESPR validation of passport metadata (nothing is stored)
* [POST /api/v1/passports/validate-only-public](validatePassportPublic.md) - Public dry-run ESPR metadata validation (strictly rate-limited)
* [POST /api/v1/passports/bulk](bulkIngestPassports.md) - Bulk-ingest up to 200 passports with per-row error reporting
* [POST /api/v1/passports/aas/ingest](ingestPassportFromAas.md) - Ingest a passport from an AAS JSON Environment (seal-verified)
* [GET /api/v1/passports/{id}](getPassport.md) - Fetch a single passport (content-negotiated JSON-LD / AAS / HTML)
* [PUT /api/v1/passports/{id}](updatePassport.md) - Update passport metadata (versioned to history)
* [DELETE /api/v1/passports/{id}](deleteDraftPassport.md) - Permanently delete a DRAFT passport
* [POST /api/v1/passports/{id}/seal](sealPassport.md) - Apply the tenant's eIDAS advanced electronic seal
* [PUT /api/v1/passports/{id}/status](updatePassportStatus.md) - Transition passport lifecycle status (recall / decommission / reactivate)

# Economic Operators

* [GET /api/v1/operators](listOperators.md) - List economic operators bound to your workspace
* [POST /api/v1/operators](registerOperator.md) - Register an economic operator and bind it to your workspace
* [GET /api/v1/operators/{id}](getOperator.md) - Fetch a single bound economic operator
* [PATCH /api/v1/operators/{id}](updateOperator.md) - Update an operator's name or role (regId is immutable)
* [DELETE /api/v1/operators/{id}](deleteOperator.md) - Remove an operator (archives if it has passports, else hard-deletes)
* [POST /api/v1/operators/{id}/restore](restoreOperator.md) - Restore an archived operator and its archived passports

# Battery Units

* [GET /api/v1/passports/{passportId}/units](listBatteryUnits.md) - List serialised battery units under a passport
* [POST /api/v1/passports/{passportId}/units](serializeBatteryUnits.md) - Serialise individual battery units under a passport (bulk, up to 200)
* [GET /api/v1/units/{id}](getBatteryUnit.md) - Get one battery unit as JSON-LD with its dynamic-data history
* [DELETE /api/v1/units/{id}](deleteBatteryUnit.md) - Permanently delete a battery unit and its telemetry
* [GET /api/v1/units/{id}/events](listBatteryUnitEvents.md) - List a battery unit's telemetry history (newest first, max 500)
* [POST /api/v1/units/{id}/events](recordBatteryUnitEvent.md) - Append an immutable telemetry event to a battery unit

# Facilities

* [GET /api/v1/facilities](listFacilities.md) - List facilities in the tenant workspace
* [POST /api/v1/facilities](createFacility.md) - Register a facility (GS1 GLN)
* [GET /api/v1/facilities/{id}](getFacility.md) - Get a single facility
* [PUT /api/v1/facilities/{id}](updateFacility.md) - Update facility master data (GLN is immutable)
* [DELETE /api/v1/facilities/{id}](deleteFacility.md) - Delete a facility (passports are unlinked, never deleted)

# Access Grants

* [GET /api/v1/grants](listGrants.md) - List access grants and pending access requests
* [POST /api/v1/grants](createGrant.md) - Issue a legitimate-interest access grant directly
* [POST /api/v1/grants/{id}/approve](approveGrantRequest.md) - Approve a pending access request and mint its token
* [POST /api/v1/grants/{id}/deny](denyGrantRequest.md) - Deny a pending access request
* [DELETE /api/v1/grants/{id}](revokeGrant.md) - Revoke an access grant (soft revocation)

# Webhooks

* [GET /api/v1/webhooks/subscriptions](listWebhookSubscriptions.md) - List webhook subscriptions (signing secrets stripped)
* [POST /api/v1/webhooks/subscriptions](createWebhookSubscription.md) - Register a webhook subscription (signing secret returned once)
* [PATCH /api/v1/webhooks/subscriptions/{id}](updateWebhookSubscription.md) - Update a webhook subscription (url / events / active)
* [DELETE /api/v1/webhooks/subscriptions/{id}](deleteWebhookSubscription.md) - Delete a webhook subscription
* [POST /api/v1/webhooks/subscriptions/{id}/rotate-secret](rotateWebhookSecret.md) - Rotate a webhook subscription's signing secret
* [GET /api/v1/webhooks/deliveries](listWebhookDeliveries.md) - List recent webhook delivery attempts (the outbox)
* [POST /api/v1/webhooks/subscriptions/{id}/test](testWebhookSubscription.md) - Send a signed test event to a subscription

# Traceability & Audit

* [POST /api/v1/events](registerTraceabilityEvent.md) - Register a UNTP/EPCIS 2.0 traceability event (VC-shaped)
* [GET /api/v1/events/{id}/lineage](getEventLineage.md) - Retrieve the upstream pedigree of an event as a recursive lineage DAG
* [POST /api/v1/events/{id}/audit](auditEventLineage.md) - Run heuristic UFLPA/EUDR compliance screening over an event's lineage
* [POST /api/v1/audit/verify](verifyPassportSeal.md) - Publicly verify a passport's eIDAS seal, certificate chain and timestamp

# Public Resolution

* [GET /passport/{id}](resolvePublicPassport.md) - Resolve a passport by UUID (JSON-LD / AAS / HTML)
* [GET /01/{gtin14}](resolveGs1Gtin.md) - GS1 Digital Link resolution by GTIN-14 (AI 01)
* [GET /01/{gtin14}/21/{serial}](resolveGs1GtinSerial.md) - GS1 Digital Link serialised-item redirect (AI 01 + AI 21)
* [GET /8003/{grai}](resolveGs1Grai.md) - GS1 Digital Link resolution by GRAI (AI 8003)
* [GET /unit/{id}](resolvePublicBatteryUnit.md) - Resolve an individual serialised battery unit
* [POST /api/v1/gs1/decode](decodeGs1.md) - Decode GS1 scan data / element string / Digital Link into structured AIs + HRI

# Verifiable Credentials

* [GET /tenants/{tenantId}/did.json](getTenantDidDocument.md) - Resolve a tenant's did:web DID document
* [GET /tenants/{tenantId}/status/revocation](getTenantRevocationStatusList.md) - Tenant revocation status list (W3C Bitstring Status List)

# Schemas & Vocabulary

* [GET /api/v1/schemas/{category}](getSectorSchema.md) - Get the ESPR metadata schema for a product category
* [GET /contexts/dpp/v1](getDppJsonLdContext.md) - Canonical resolvable JSON-LD context for passport & unit documents
* [GET /context/v1](getJsonLdContext.md) - W3C JSON-LD context document for passport terms (secondary, fixed term list)
* [GET /api/v1/materials](listMaterials.md) - List the platform-curated material vocabulary

# QR Codes

* [GET /api/v1/passports/{id}/qr](getPassportQrCode.md) - Export a print-grade GS1 Digital Link QR code for a passport
* [GET /api/v1/units/{id}/qr](getBatteryUnitQrCode.md) - Export a print-grade QR code for an individual battery unit

# eIDAS Keys

* [POST /api/v1/tenants/rotate-keys](rotateTenantKeys.md) - Rotate the tenant's eIDAS ECDSA signing key pair
* [GET /.well-known/opendpp-seal-ca.pem](getSealCaCertificate.md) - Download the platform seal-CA certificate (PEM)

# Account

* [GET /api/v1/whoami](whoami.md) - Identity of the authenticated key / session

# Service

* [GET /health](getHealth.md) - Service health check
* [GET /api/v1/version](getApiVersion.md) - Running API contract version & build identity
