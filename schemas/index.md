# Schemas

* [AasEnvironment](AasEnvironment.md) - An Asset Administration Shell (AAS) v3.0 environment export of the passport, served as application/aas+json.
* [AasEnvironmentInput](AasEnvironmentInput.md) - An Asset Administration Shell (AAS) JSON Environment — the format produced by OpenDPP's AAS export of a passport.
* [AasIngestCreated](AasIngestCreated.md) - 201 envelope of POST /api/v1/passports/aas/ingest.
* [AdvisoryItem](AdvisoryItem.md) - One non-blocking advisory on a response's warnings[] (a heads-up — the request still succeeded) or notices[] (informational — something hel…
* [ApproveGrantRequest](ApproveGrantRequest.md) - Approval body — only the final expiry is supplied; everything else comes from the original request.
* [BatteryUnitCreateItem](BatteryUnitCreateItem.md) - One unit to serialise.
* [BatteryUnitCurrentState](BatteryUnitCurrentState.md) - Latest recorded measurement of the unit (owner/grant tiers only).
* [BatteryUnitDynamicDataEvent](BatteryUnitDynamicDataEvent.md) - One telemetry event in the JSON-LD dynamicData history (privileged view only).
* [BatteryUnitEventListResponse](BatteryUnitEventListResponse.md) - One page of a battery unit's append-only dynamic-data history, newest first.
* [BatteryUnitEventNode](BatteryUnitEventNode.md) - One append-only telemetry event (owner/grant tiers only).
* [BatteryUnitEventRow](BatteryUnitEventRow.md) - One immutable per-unit telemetry record — the reads return exactly the fields documented here.
* [BatteryUnitEventType](BatteryUnitEventType.md) - Per-unit dynamic-data event category (Annex XIII / Art. 77 telemetry).
* [BatteryUnitJsonLd](BatteryUnitJsonLd.md) - JSON-LD document for one serialised battery unit, privileged tenant view (isPrivileged=true): includes currentState + dynamicData telemetry…
* [BatteryUnitLineageRef](BatteryUnitLineageRef.md) - Public lineage pointer between battery units.
* [BatteryUnitListResponse](BatteryUnitListResponse.md) - A page of the serialised battery units recorded under one passport, with the paging envelope.
* [BatteryUnitRestrictedDataNotice](BatteryUnitRestrictedDataNotice.md) - Marker replacing per-unit telemetry in anonymous (public-tier) responses, with a pointer for requesting legitimate-interest access (Annex X…
* [BatteryUnitRow](BatteryUnitRow.md) - One physical serialised battery — the reads return exactly the fields documented here.
* [BatteryUnitSerialisationFailedError](BatteryUnitSerialisationFailedError.md) - 400 body when every item in the serialisation batch failed.
* [BatteryUnitStatus](BatteryUnitStatus.md) - Annex XIII battery-status vocabulary (EU Battery Regulation).
* [BatteryUnitTombstoneJsonLd](BatteryUnitTombstoneJsonLd.md) - Tombstone (HTTP 410): once a battery is recycled its passport has ceased to exist.
* [BulkBatteryUnitEventsRequest](BulkBatteryUnitEventsRequest.md) - A batch of telemetry records for one unit.
* [BulkBatteryUnitEventsResponse](BulkBatteryUnitEventsResponse.md) - The partial-success report of a bulk telemetry ingest.
* [CreateGrantRequest](CreateGrantRequest.md) - Direct-issuance body.
* [DeleteOperatorResponse](DeleteOperatorResponse.md) - Outcome of removing an economic operator: whether it was archived rather than deleted, and how many of its passports were archived with it.
* [DidWebDocument](DidWebDocument.md) - A tenant's did:web DID document (public-key material only).
* [DppJsonLdContextDocument](DppJsonLdContextDocument.md) - The fixed W3C JSON-LD context document served by GET /context/v1: maps DigitalProductPassport, economicOperator, metadata, digitalSeal, sig…
* [DppVocabContextDocument](DppVocabContextDocument.md) - The canonical resolvable JSON-LD context served by GET /contexts/dpp/v1 — the context every public passport and battery-unit document refer…
* [EconomicOperatorNode](EconomicOperatorNode.md) - Embedded economic-operator JSON-LD node (public in all tiers).
* [EpcisCaptureResponse](EpcisCaptureResponse.md) - Per-event outcome of capturing an EPCIS 2.0 document, with partial-success semantics: some events may be stored while others fail.
* [EpcisDocument](EpcisDocument.md) - A GS1 EPCIS 2.0 document (JSON/JSON-LD).
* [Error](Error.md) - Standard error body.
* [FacilityCreateRequest](FacilityCreateRequest.md) - A facility to register: its GS1 GLN-13, name and country, plus optional activity and street address.
* [FacilityCreatedEnvelope](FacilityCreatedEnvelope.md) - Confirmation that a facility was registered, carrying the stored record.
* [FacilityDeletedEnvelope](FacilityDeletedEnvelope.md) - Confirmation that a facility was deleted.
* [FacilityEnvelope](FacilityEnvelope.md) - A single facility record.
* [FacilityListEnvelope](FacilityListEnvelope.md) - A page of the workspace's facilities, with the paging envelope.
* [FacilityRow](FacilityRow.md) - A facility (GS1 GLN) master-data row, exactly as stored.
* [FacilityUpdateRequest](FacilityUpdateRequest.md) - Partial update.
* [FastifyDefaultBadRequest](FastifyDefaultBadRequest.md) - The framework's default 400 error body, returned when a syntactically malformed JSON request body is rejected by the framework before the h…
* [GrantDecisionResponse](GrantDecisionResponse.md) - Returned by deny and revoke: the updated grant, no token.
* [GrantIssuedResponse](GrantIssuedResponse.md) - Returned by direct issuance (201) and request approval (200).
* [GrantListResponse](GrantListResponse.md) - List envelope for GET /api/v1/grants (paginated).
* [GrantRouteError](GrantRouteError.md) - Error body used by the grants endpoints' route-level errors (400/403/404/409).
* [GrantRow](GrantRow.md) - Tenant-facing projection of an access grant.
* [HealthStatus](HealthStatus.md) - Health-check body of GET /health.
* [MaterialVocabularyListResponse](MaterialVocabularyListResponse.md) - Envelope of GET /api/v1/materials.
* [MaterialVocabularyRow](MaterialVocabularyRow.md) - One entry of the platform-curated material vocabulary.
* [MerkleTreeAttestationProof](MerkleTreeAttestationProof.md) - OpenDPP's own proof type — an ADVANCED electronic seal: an ECDSA prime256v1 signature over a SHA-256 Merkle root of the key-sorted metadata…
* [OperatorGetResponse](OperatorGetResponse.md) - A single economic operator record.
* [OperatorListResponse](OperatorListResponse.md) - The economic operators bound to the calling workspace.
* [OperatorMinimalError](OperatorMinimalError.md) - Minimal error envelope used by the operator/key self-service handlers — note the standard error key is ABSENT (unlike the shared Error sche…
* [OperatorRow](OperatorRow.md) - An economic-operator record (EconomicOperator).
* [PassportAasEnvironment](PassportAasEnvironment.md) - IDTA Asset Administration Shell environment (returned when Accept contains application/aas+json), role-filtered for the caller's access tie…
* [PassportBulkFailure](PassportBulkFailure.md) - 400 body of POST /api/v1/passports/bulk when EVERY row failed.
* [PassportBulkRequest](PassportBulkRequest.md) - A batch of passports to ingest, with optional dry-run preview and upsert-on-conflict behaviour.
* [PassportBulkResult](PassportBulkResult.md) - 201 partial-success envelope of POST /api/v1/passports/bulk.
* [PassportBulkRow](PassportBulkRow.md) - One bulk-ingestion row.
* [PassportCreateRequest](PassportCreateRequest.md) - A passport to create: its product identifier and ESPR category metadata, with optional operator and facility binding, a draft flag, and enr…
* [PassportEnrichmentInput](PassportEnrichmentInput.md) - Optional presentational (non-regulatory) marketing enrichment, stored OUTSIDE the ESPR-validated metadata and the Merkle seal; it never app…
* [PassportIngestCreated](PassportIngestCreated.md) - 201 envelope of POST /api/v1/passports.
* [PassportListItem](PassportListItem.md) - One JSON-LD passport document as it appears in GET /api/v1/passports list responses.
* [PassportListResponse](PassportListResponse.md) - Envelope of GET /api/v1/passports.
* [PassportMetadataInput](PassportMetadataInput.md) - The ESPR product metadata payload.
* [PassportQuotaError](PassportQuotaError.md) - 402 body for a write blocked by billing.
* [PassportSealResponse](PassportSealResponse.md) - 200 envelope of POST /api/v1/passports/{id}/seal.
* [PassportStatusUpdateRequest](PassportStatusUpdateRequest.md) - Body of PUT /api/v1/passports/{id}/status.
* [PassportStatusUpdateResponse](PassportStatusUpdateResponse.md) - 200 envelope of PUT /api/v1/passports/{id}/status.
* [PassportUpdateRequest](PassportUpdateRequest.md) - Body of PUT /api/v1/passports/{id}.
* [PassportUpdateResponse](PassportUpdateResponse.md) - 200 envelope of PUT /api/v1/passports/{id}.
* [PassportUpdateValidationError](PassportUpdateValidationError.md) - 400 ESPR validation failure body of PUT /api/v1/passports/{id}.
* [PassportValidateOnlyError](PassportValidateOnlyError.md) - 400 envelope of the validate-only endpoints.
* [PassportValidateOnlyRequest](PassportValidateOnlyRequest.md) - A metadata payload to validate against its ESPR category rules without persisting anything.
* [PassportValidateOnlyResult](PassportValidateOnlyResult.md) - 200 envelope of the validate-only endpoints (only the declared keys are emitted).
* [PublicBatteryUnitJsonLd](PublicBatteryUnitJsonLd.md) - Public JSON-LD document for one individual serialised battery unit (EU Battery Regulation).
* [PublicFacilityNode](PublicFacilityNode.md) - Embedded manufacturing-facility JSON-LD node — the GS1 GLN-backed Unique Facility Identifier (UFI, EN 18219).
* [PublicPassportJsonLd](PublicPassportJsonLd.md) - The public, redacted JSON-LD Digital Product Passport document (application/ld+json).
* [RecordBatteryUnitEventRequest](RecordBatteryUnitEventRequest.md) - One telemetry record.
* [RecordBatteryUnitEventResponse](RecordBatteryUnitEventResponse.md) - Confirmation that a dynamic-data record was appended to a battery unit, echoing the stored event.
* [RegisterOperatorRequest](RegisterOperatorRequest.md) - An economic operator to register: its legal name and registration identifier, with an optional identifier scheme and supply-chain role.
* [RegisterOperatorResponse](RegisterOperatorResponse.md) - Confirmation that an economic operator was registered, carrying the stored record and any non-blocking advisories.
* [RestoreOperatorResponse](RestoreOperatorResponse.md) - Outcome of restoring an archived economic operator, including how many of its passports were restored.
* [RotateTenantKeysResponse](RotateTenantKeysResponse.md) - Confirmation that the workspace's signing key was rotated, returning the new public key.
* [SealCertificateReport](SealCertificateReport.md) - Present only for x5c-carrying proofs on a verified: true outcome whose chain is TRUSTED — chainValid AND keyMatchesProof both true (the two…
* [SealTimestampReport](SealTimestampReport.md) - Present only when payload.proof.rfc3161.token was supplied AND verification proceeds past the key-registration and operator-binding gates (…
* [SealVerifyRequest](SealVerifyRequest.md) - Verification request.
* [SealVerifyResponse](SealVerifyResponse.md) - Always HTTP 200 once the request is well-formed.
* [SectorJsonSchemaDocument](SectorJsonSchemaDocument.md) - A JSON Schema draft-07 document describing the ESPR metadata payload for one product category, served as application/schema+json.
* [SectorVocabularyContext](SectorVocabularyContext.md) - Per-category JSON-LD vocabulary context, returned by GET /api/v1/schemas/{category} when Accept contains application/ld+json.
* [SerializeBatteryUnitsRequest](SerializeBatteryUnitsRequest.md) - Either a single unit object, or a batch wrapper {units: [...]}.
* [SerializeBatteryUnitsResponse](SerializeBatteryUnitsResponse.md) - Returned (201) when at least one unit was created.
* [ServiceVersion](ServiceVersion.md) - Running API contract version and source build identity, returned by GET /api/v1/version.
* [TraceEventRegistered](TraceEventRegistered.md) - 201 envelope of POST /api/v1/events.
* [TraceLineageNode](TraceLineageNode.md) - One node of the recursive upstream lineage DAG.
* [TraceLineageResponse](TraceLineageResponse.md) - The upstream pedigree of a traceability event, as a recursive graph of the events it derives from.
* [UntpEventCredential](UntpEventCredential.md) - A UNTP/EPCIS 2.0 traceability event wrapped as a VC-shaped credential.
* [UntpEventCredentialSubject](UntpEventCredentialSubject.md) - The EPCIS event payload.
* [UntpEventProof](UntpEventProof.md) - Credential proof.
* [UntpVerificationMethod](UntpVerificationMethod.md) - Embedded verification-method object.
* [UpdateOperatorRequest](UpdateOperatorRequest.md) - Both fields are optional.
* [UpdateOperatorResponse](UpdateOperatorResponse.md) - The economic operator as stored after the update.
* [ValidationErrorItem](ValidationErrorItem.md) - One field-level finding from ESPR category validation.
* [WebhookDeliveriesResponse](WebhookDeliveriesResponse.md) - Recent webhook delivery attempts for a subscription, newest first, for debugging endpoint failures.
* [WebhookDeliveryRow](WebhookDeliveryRow.md) - One outbox delivery record (event-level).
* [WebhookEnvelope](WebhookEnvelope.md) - The signed body of every webhook delivery.
* [WebhookEventFilter](WebhookEventFilter.md) - Subscribable event filter values.
* [WebhookSecretRotateResponse](WebhookSecretRotateResponse.md) - Confirmation that a subscription's HMAC signing secret was rotated; the new secret is returned once and cannot be retrieved again.
* [WebhookSubscriptionCreateRequest](WebhookSubscriptionCreateRequest.md) - An endpoint to receive webhook deliveries, and the event types it subscribes to.
* [WebhookSubscriptionCreateResponse](WebhookSubscriptionCreateResponse.md) - Confirmation that a webhook subscription was created, carrying the stored subscription.
* [WebhookSubscriptionDeleteResponse](WebhookSubscriptionDeleteResponse.md) - Confirmation that a webhook subscription was deleted.
* [WebhookSubscriptionListResponse](WebhookSubscriptionListResponse.md) - The calling workspace's webhook subscriptions.
* [WebhookSubscriptionRow](WebhookSubscriptionRow.md) - A webhook subscription row with the HMAC signing secret stripped (it is shown exactly once, in the 201 create response).
* [WebhookSubscriptionUpdateRequest](WebhookSubscriptionUpdateRequest.md) - All fields optional; include only what you want to change.
* [WebhookSubscriptionUpdateResponse](WebhookSubscriptionUpdateResponse.md) - The webhook subscription as stored after the update.
* [WebhookSubscriptionWithSecret](WebhookSubscriptionWithSecret.md) - The full subscription row as returned ONLY by the 201 create response — includes the HMAC-SHA256 signing secret.
* [WebhookTestResult](WebhookTestResult.md) - The outcome of delivering a signed sample event to a subscription's endpoint right now.
* [WhoamiResponse](WhoamiResponse.md) - The calling credential's identity: its workspace, the resolved auth principal and permissions, and active-passport usage against the plan q…
