---
type: Schema
title: Error
description: Standard error body.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/Error
tags:
  - schema
generated:
  by: process:emit-okf
  at: 2026-08-17T00:00:00Z
---
<!-- Copyright (c) Opendpp UAB. SPDX-License-Identifier: LicenseRef-OpenDPP-Proprietary -->

Standard error body. Authenticated-API errors include `success: false`; some endpoints (and all public resolution errors) omit `success` and return only `error` + `message`.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | no | Always false when present. |
| `error` | string | yes | Short error title (usually the HTTP reason phrase). |
| `message` | string | yes | Human-readable explanation. |
| `requestId` | string | no | Correlation id for this request, also returned as the X-Request-Id response header on EVERY response. |
| `code` | string | no | Optional MACHINE-STABLE error code for the developer-facing write/ingest surface (passport / operator / unit / resolver / facility / events / webhooks) — branc… |

## JSON Schema

```json
{
  "type": "object",
  "description": "Standard error body. Authenticated-API errors include `success: false`; some endpoints (and all public resolution errors) omit `success` and return only `error` + `message`.",
  "required": [
    "error",
    "message"
  ],
  "properties": {
    "success": {
      "type": "boolean",
      "description": "Always `false` when present. Omitted by public endpoints and some self-service endpoints."
    },
    "error": {
      "type": "string",
      "description": "Short error title (usually the HTTP reason phrase).",
      "examples": [
        "Bad Request",
        "Not Found",
        "Validation Failed"
      ]
    },
    "message": {
      "type": "string",
      "description": "Human-readable explanation."
    },
    "requestId": {
      "type": "string",
      "description": "Correlation id for this request, also returned as the `X-Request-Id` response header on EVERY response. Present in generic (server-error / framework) bodies; quote it to support to correlate with server logs. Adopts a well-formed inbound `X-Request-Id` if you send one."
    },
    "code": {
      "type": "string",
      "description": "Optional MACHINE-STABLE error code for the developer-facing write/ingest surface (passport / operator / unit / resolver / facility / events / webhooks) — branch on this instead of parsing `message`. Present on the errors it covers — the `code` enum below is the full set — and omitted otherwise.",
      "enum": [
        "OPERATOR_NOT_BOUND",
        "OPERATOR_AMBIGUOUS",
        "OPERATOR_SCOPE_FORBIDDEN",
        "GTIN_CHECK_DIGIT_INVALID",
        "GLN_CHECK_DIGIT_INVALID",
        "COMPRESSED_DIGITAL_LINK",
        "PASSPORT_DUPLICATE",
        "PASSPORT_SEALED_IMMUTABLE",
        "CATEGORY_IMMUTABLE",
        "FACILITY_NOT_FOUND",
        "FACILITY_DUPLICATE",
        "WEBHOOK_NOT_FOUND",
        "WEBHOOK_LIMIT_REACHED",
        "WEBHOOK_URL_REJECTED"
      ]
    }
  }
}
```

## Used by

- [whoami](/operations/whoami.md) (`GET /api/v1/whoami`)
- [validateBatteryUnits](/operations/validateBatteryUnits.md) (`POST /api/v1/passports/{passportId}/units/validate`)
- [deleteBatteryUnit](/operations/deleteBatteryUnit.md) (`DELETE /api/v1/units/{id}`)
- [listBatteryUnitEvents](/operations/listBatteryUnitEvents.md) (`GET /api/v1/units/{id}/events`)
- [recordBatteryUnitEvent](/operations/recordBatteryUnitEvent.md) (`POST /api/v1/units/{id}/events`)
- [bulkRecordBatteryUnitEvents](/operations/bulkRecordBatteryUnitEvents.md) (`POST /api/v1/units/{id}/events/bulk`)
- [createFacility](/operations/createFacility.md) (`POST /api/v1/facilities`)
- [getFacility](/operations/getFacility.md) (`GET /api/v1/facilities/{id}`)
- [updateFacility](/operations/updateFacility.md) (`PUT /api/v1/facilities/{id}`)
- [deleteFacility](/operations/deleteFacility.md) (`DELETE /api/v1/facilities/{id}`)
- [updateOperator](/operations/updateOperator.md) (`PATCH /api/v1/operators/{id}`)
- [deleteOperator](/operations/deleteOperator.md) (`DELETE /api/v1/operators/{id}`)
- [restoreOperator](/operations/restoreOperator.md) (`POST /api/v1/operators/{id}/restore`)
- [createPassport](/operations/createPassport.md) (`POST /api/v1/passports`)
- [getPassport](/operations/getPassport.md) (`GET /api/v1/passports/{id}`)
- [updatePassport](/operations/updatePassport.md) (`PUT /api/v1/passports/{id}`)
- [deleteDraftPassport](/operations/deleteDraftPassport.md) (`DELETE /api/v1/passports/{id}`)
- [sealPassport](/operations/sealPassport.md) (`POST /api/v1/passports/{id}/seal`)
- [updatePassportStatus](/operations/updatePassportStatus.md) (`PUT /api/v1/passports/{id}/status`)
- [resolvePublicPassport](/operations/resolvePublicPassport.md) (`GET /passport/{id}`)
- [resolveGs1Gtin](/operations/resolveGs1Gtin.md) (`GET /01/{gtin14}`)
- [resolveGs1GtinSerial](/operations/resolveGs1GtinSerial.md) (`GET /01/{gtin14}/21/{serial}`)
- [resolveGs1Grai](/operations/resolveGs1Grai.md) (`GET /8003/{grai}`)
- [resolvePublicBatteryUnit](/operations/resolvePublicBatteryUnit.md) (`GET /unit/{id}`)
- [getSealCaCertificate](/operations/getSealCaCertificate.md) (`GET /.well-known/opendpp-seal-ca.pem`)
- [decodeGs1](/operations/decodeGs1.md) (`POST /api/v1/gs1/decode`)
- [decodeGs1Batch](/operations/decodeGs1Batch.md) (`POST /api/v1/gs1/decode/batch`)
- [getPassportQrCode](/operations/getPassportQrCode.md) (`GET /api/v1/passports/{id}/qr`)
- [bulkExportPassportLabels](/operations/bulkExportPassportLabels.md) (`POST /api/v1/passports/labels`)
- [getBatteryUnitQrCode](/operations/getBatteryUnitQrCode.md) (`GET /api/v1/units/{id}/qr`)
- [registerTraceabilityEvent](/operations/registerTraceabilityEvent.md) (`POST /api/v1/events`)
- [captureEpcisDocument](/operations/captureEpcisDocument.md) (`POST /api/v1/events/epcis`)
- [getEventLineage](/operations/getEventLineage.md) (`GET /api/v1/events/{id}/lineage`)
- [getTenantDidDocument](/operations/getTenantDidDocument.md) (`GET /tenants/{tenantId}/did.json`)
- [getTenantRevocationStatusList](/operations/getTenantRevocationStatusList.md) (`GET /tenants/{tenantId}/status/revocation`)
- [listWebhookSubscriptions](/operations/listWebhookSubscriptions.md) (`GET /api/v1/webhooks/subscriptions`)
- [createWebhookSubscription](/operations/createWebhookSubscription.md) (`POST /api/v1/webhooks/subscriptions`)
- [updateWebhookSubscription](/operations/updateWebhookSubscription.md) (`PATCH /api/v1/webhooks/subscriptions/{id}`)
- [deleteWebhookSubscription](/operations/deleteWebhookSubscription.md) (`DELETE /api/v1/webhooks/subscriptions/{id}`)
- schema [BatteryUnitSerialiseBadRequest](/schemas/BatteryUnitSerialiseBadRequest.md)
- schema [BatteryUnitEventBadRequest](/schemas/BatteryUnitEventBadRequest.md)
- schema [GrantRevokeForbidden](/schemas/GrantRevokeForbidden.md)
- schema [OperatorMinimalErrorResponse](/schemas/OperatorMinimalErrorResponse.md)
- schema [PassportCreateBadRequest](/schemas/PassportCreateBadRequest.md)
- schema [AasIngestBadRequest](/schemas/AasIngestBadRequest.md)
- schema [PassportGetNotFound](/schemas/PassportGetNotFound.md)
- schema [PassportUpdateBadRequest](/schemas/PassportUpdateBadRequest.md)
- the shared error responses
