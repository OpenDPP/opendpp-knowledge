# Schemas

* [AasEnvironment](AasEnvironment.md) - An Asset Administration Shell (AAS) v3.0 environment export of the passport, served as application/aas+json.
* [AasEnvironmentInput](AasEnvironmentInput.md) - An Asset Administration Shell (AAS) JSON Environment — the format produced by OpenDPP's AAS export of a passport.
* [AasIngestCreated](AasIngestCreated.md) - 201 envelope of POST /api/v1/passports/aas/ingest.
* [ApproveGrantRequest](ApproveGrantRequest.md) - Approval body — only the final expiry is supplied; everything else comes from the original request.
* [BatteryUnitCreateItem](BatteryUnitCreateItem.md) - One unit to serialise.
* [BatteryUnitCurrentState](BatteryUnitCurrentState.md) - Latest recorded measurement of the unit (owner/grant tiers only).
* [BatteryUnitDeleteResponse](BatteryUnitDeleteResponse.md)
* [BatteryUnitDynamicDataEvent](BatteryUnitDynamicDataEvent.md) - One telemetry event in the JSON-LD dynamicData history (privileged view only).
* [BatteryUnitEventListResponse](BatteryUnitEventListResponse.md)
* [BatteryUnitEventNode](BatteryUnitEventNode.md) - One append-only telemetry event (owner/grant tiers only).
* [BatteryUnitEventRow](BatteryUnitEventRow.md) - One immutable per-unit telemetry record (raw persisted row).
* [BatteryUnitEventType](BatteryUnitEventType.md) - Per-unit dynamic-data event category (Annex XIII / Art.
* [BatteryUnitJsonLd](BatteryUnitJsonLd.md) - JSON-LD document for one serialised battery unit, privileged tenant view (isPrivileged=true): includes currentState + dynamicData telemetry…
* [BatteryUnitLineageRef](BatteryUnitLineageRef.md) - Public lineage pointer between battery units (Art.
* [BatteryUnitListResponse](BatteryUnitListResponse.md)
* [BatteryUnitRestrictedDataNotice](BatteryUnitRestrictedDataNotice.md) - Marker replacing per-unit telemetry in anonymous (public-tier) responses, with a pointer for requesting legitimate-interest access (Reg.
* [BatteryUnitRow](BatteryUnitRow.md) - One physical serialised battery (raw persisted row — these routes declare no Fastify response schema, so all model fields are returned as-i…
* [BatteryUnitSerialisationFailedError](BatteryUnitSerialisationFailedError.md) - 400 body when every item in the serialisation batch failed.
* [BatteryUnitStatus](BatteryUnitStatus.md) - Annex XIII battery-status vocabulary (Battery Reg.
* [BatteryUnitTombstoneJsonLd](BatteryUnitTombstoneJsonLd.md) - Art.
* [CreateGrantRequest](CreateGrantRequest.md) - Direct-issuance body.
* [DeleteOperatorResponse](DeleteOperatorResponse.md)
* [DidWebDocument](DidWebDocument.md) - A tenant's did:web DID document (public-key material only).
* [DppJsonLdContextDocument](DppJsonLdContextDocument.md) - The fixed W3C JSON-LD context document served by GET /context/v1: maps DigitalProductPassport, economicOperator, metadata, digitalSeal, sig…
* [DppVocabContextDocument](DppVocabContextDocument.md) - The canonical resolvable JSON-LD context served by GET /contexts/dpp/v1 — the context every public passport and battery-unit document refer…
* [EconomicOperatorNode](EconomicOperatorNode.md) - Embedded economic-operator JSON-LD node (public in all tiers).
* [Error](Error.md) - Standard error body.
* [FacilityCreateRequest](FacilityCreateRequest.md)
* [FacilityCreatedEnvelope](FacilityCreatedEnvelope.md)
* [FacilityDeletedEnvelope](FacilityDeletedEnvelope.md)
* [FacilityEnvelope](FacilityEnvelope.md)
* [FacilityListEnvelope](FacilityListEnvelope.md)
* [FacilityRow](FacilityRow.md) - A facility (GS1 GLN) master-data row, exactly as stored.
* [FacilityUpdateRequest](FacilityUpdateRequest.md) - Partial update.
* [FastifyDefaultBadRequest](FastifyDefaultBadRequest.md) - Fastify's default 400 error body, returned when a syntactically malformed JSON request body is rejected by the framework before the handler…
* [GrantDecisionResponse](GrantDecisionResponse.md) - Returned by deny and revoke: the updated grant, no token.
* [GrantIssuedResponse](GrantIssuedResponse.md) - Returned by direct issuance (201) and request approval (200).
* [GrantListResponse](GrantListResponse.md) - List envelope for GET /api/v1/grants (paginated).
* [GrantRouteError](GrantRouteError.md) - Error body used by the grants endpoints' route-level errors (400/403/404/409).
* [GrantRow](GrantRow.md) - Tenant-facing projection of an access grant.
* [HealthStatus](HealthStatus.md) - Health-check body of GET /health.
* [MaterialVocabularyListResponse](MaterialVocabularyListResponse.md) - Envelope of GET /api/v1/materials.
* [MaterialVocabularyRow](MaterialVocabularyRow.md) - One entry of the platform-curated material vocabulary.
* [MerkleTreeAttestationProof](MerkleTreeAttestationProof.md) - OpenDPP's own proof type — an eIDAS ADVANCED electronic seal: an ECDSA prime256v1 signature over a SHA-256 Merkle root of the key-sorted me…
* [OperatorGetResponse](OperatorGetResponse.md)
* [OperatorListResponse](OperatorListResponse.md)
* [OperatorMinimalError](OperatorMinimalError.md) - Minimal error envelope used by the operator/key self-service handlers — note the standard error key is ABSENT (unlike the shared Error sche…
* [OperatorRow](OperatorRow.md) - An economic-operator record (EconomicOperator).
* [PassportAasEnvironment](PassportAasEnvironment.md) - IDTA Asset Administration Shell environment (returned when Accept contains application/aas+json), role-filtered for the caller's access tie…
* [PassportBulkFailure](PassportBulkFailure.md) - 400 body of POST /api/v1/passports/bulk when EVERY row failed.
* [PassportBulkRequest](PassportBulkRequest.md)
* [PassportBulkResult](PassportBulkResult.md) - 201 partial-success envelope of POST /api/v1/passports/bulk.
* [PassportBulkRow](PassportBulkRow.md) - One bulk-ingestion row.
* [PassportCreateRequest](PassportCreateRequest.md)
* [PassportEnrichmentInput](PassportEnrichmentInput.md) - Optional presentational (non-regulatory) marketing enrichment, stored OUTSIDE the ESPR-validated metadata and the Merkle seal; it never app…
* [PassportIngestCreated](PassportIngestCreated.md) - 201 envelope of POST /api/v1/passports.
* [PassportListItem](PassportListItem.md) - One JSON-LD passport document as it appears in GET /api/v1/passports list responses.
* [PassportListResponse](PassportListResponse.md) - Envelope of GET /api/v1/passports.
* [PassportMetadataInput](PassportMetadataInput.md) - The ESPR product metadata payload.
* [PassportSealResponse](PassportSealResponse.md) - 200 envelope of POST /api/v1/passports/{id}/seal.
* [PassportStatusUpdateRequest](PassportStatusUpdateRequest.md) - Body of PUT /api/v1/passports/{id}/status.
* [PassportStatusUpdateResponse](PassportStatusUpdateResponse.md) - 200 envelope of PUT /api/v1/passports/{id}/status.
* [PassportUpdateRequest](PassportUpdateRequest.md) - Body of PUT /api/v1/passports/{id}.
* [PassportUpdateResponse](PassportUpdateResponse.md) - 200 envelope of PUT /api/v1/passports/{id}.
* [PassportUpdateValidationError](PassportUpdateValidationError.md) - 400 ESPR validation failure body of PUT /api/v1/passports/{id}.
* [PassportValidateOnlyError](PassportValidateOnlyError.md) - 400 envelope of the validate-only endpoints.
* [PassportValidateOnlyRequest](PassportValidateOnlyRequest.md)
* [PassportValidateOnlyResult](PassportValidateOnlyResult.md) - 200 envelope of the validate-only endpoints (only the declared keys are emitted).
* [PublicBatteryUnitJsonLd](PublicBatteryUnitJsonLd.md) - Public JSON-LD document for one individual serialised battery unit (Reg.
* [PublicFacilityNode](PublicFacilityNode.md) - Embedded manufacturing-facility JSON-LD node — the GS1 GLN-backed Unique Facility Identifier (UFI, EN 18219).
* [PublicPassportJsonLd](PublicPassportJsonLd.md) - The public, redacted JSON-LD Digital Product Passport document (application/ld+json).
* [RecordBatteryUnitEventRequest](RecordBatteryUnitEventRequest.md) - One telemetry record.
* [RecordBatteryUnitEventResponse](RecordBatteryUnitEventResponse.md)
* [RegisterOperatorRequest](RegisterOperatorRequest.md)
* [RegisterOperatorResponse](RegisterOperatorResponse.md)
* [RestoreOperatorResponse](RestoreOperatorResponse.md)
* [RotateTenantKeysResponse](RotateTenantKeysResponse.md)
* [SealCertificateReport](SealCertificateReport.md) - Present only for x5c-carrying proofs AND only when verification proceeds past the key-registration and operator-binding gates (the two poli…
* [SealTimestampReport](SealTimestampReport.md) - Present only when payload.proof.rfc3161.token was supplied AND verification proceeds past the key-registration and operator-binding gates (…
* [SealVerifyRequest](SealVerifyRequest.md) - Verification request.
* [SealVerifyResponse](SealVerifyResponse.md) - Always HTTP 200 once the request is well-formed.
* [SectorJsonSchemaDocument](SectorJsonSchemaDocument.md) - A JSON Schema draft-07 document describing the ESPR metadata payload for one product category, served as application/schema+json.
* [SectorVocabularyContext](SectorVocabularyContext.md) - Per-category JSON-LD vocabulary context, returned by GET /api/v1/schemas/{category} when Accept contains application/ld+json.
* [SerializeBatteryUnitsRequest](SerializeBatteryUnitsRequest.md) - Either a single unit object, or a batch wrapper {units: [...]}.
* [SerializeBatteryUnitsResponse](SerializeBatteryUnitsResponse.md) - Returned (201) when at least one unit was created.
* [ServiceVersion](ServiceVersion.md) - Running API contract version and source build identity, returned by GET /api/v1/version.
* [TraceComplianceAuditResponse](TraceComplianceAuditResponse.md)
* [TraceComplianceCertificate](TraceComplianceCertificate.md)
* [TraceEventRegistered](TraceEventRegistered.md) - 201 envelope of POST /api/v1/events.
* [TraceLineageNode](TraceLineageNode.md) - One node of the recursive upstream lineage DAG.
* [TraceLineageResponse](TraceLineageResponse.md)
* [UntpEventCredential](UntpEventCredential.md) - A UNTP/EPCIS 2.0 traceability event wrapped as a VC-shaped credential (a vendor proof, not a conformant W3C VC).
* [UntpEventCredentialSubject](UntpEventCredentialSubject.md) - The EPCIS event payload.
* [UntpEventProof](UntpEventProof.md) - Credential proof.
* [UntpVerificationMethod](UntpVerificationMethod.md) - Embedded verification-method object.
* [UpdateOperatorRequest](UpdateOperatorRequest.md) - Both fields are optional.
* [UpdateOperatorResponse](UpdateOperatorResponse.md)
* [ValidationErrorItem](ValidationErrorItem.md) - One field-level finding from ESPR category validation.
* [WebhookDeliveriesResponse](WebhookDeliveriesResponse.md)
* [WebhookDeliveryRow](WebhookDeliveryRow.md) - One outbox delivery record (event-level).
* [WebhookEnvelope](WebhookEnvelope.md) - The signed body of every webhook delivery.
* [WebhookEventFilter](WebhookEventFilter.md) - Subscribable event filter values.
* [WebhookSecretRotateResponse](WebhookSecretRotateResponse.md)
* [WebhookSubscriptionCreateRequest](WebhookSubscriptionCreateRequest.md)
* [WebhookSubscriptionCreateResponse](WebhookSubscriptionCreateResponse.md)
* [WebhookSubscriptionDeleteResponse](WebhookSubscriptionDeleteResponse.md)
* [WebhookSubscriptionListResponse](WebhookSubscriptionListResponse.md)
* [WebhookSubscriptionRow](WebhookSubscriptionRow.md) - A webhook subscription row with the HMAC signing secret stripped (it is shown exactly once, in the 201 create response).
* [WebhookSubscriptionUpdateRequest](WebhookSubscriptionUpdateRequest.md) - All fields optional; include only what you want to change.
* [WebhookSubscriptionUpdateResponse](WebhookSubscriptionUpdateResponse.md)
* [WebhookSubscriptionWithSecret](WebhookSubscriptionWithSecret.md) - The full subscription row as returned ONLY by the 201 create response — includes the HMAC-SHA256 signing secret.
* [WebhookTestResult](WebhookTestResult.md)
* [WhoamiResponse](WhoamiResponse.md)
