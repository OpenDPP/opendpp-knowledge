---
type: Schema
title: Error
description: Standard error body.
resource: https://opendpp-node.eu/openapi.json#/components/schemas/Error
tags:
  - schema
timestamp: 2026-06-18T00:00:00Z
---

Standard error body. Authenticated-API errors include `success: false`; some endpoints (and all public resolution errors) omit `success` and return only `error` + `message`.

## Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `success` | boolean | no | Always false when present. |
| `error` | string | yes | Short error title (usually the HTTP reason phrase). |
| `message` | string | yes | Human-readable explanation. |

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
    }
  }
}
```

## Used by

- [whoami](/operations/whoami.md) (`GET /api/v1/whoami`)
- [serializeBatteryUnits](/operations/serializeBatteryUnits.md) (`POST /api/v1/passports/{passportId}/units`)
- [recordBatteryUnitEvent](/operations/recordBatteryUnitEvent.md) (`POST /api/v1/units/{id}/events`)
- [createFacility](/operations/createFacility.md) (`POST /api/v1/facilities`)
- [getFacility](/operations/getFacility.md) (`GET /api/v1/facilities/{id}`)
- [updateFacility](/operations/updateFacility.md) (`PUT /api/v1/facilities/{id}`)
- [deleteFacility](/operations/deleteFacility.md) (`DELETE /api/v1/facilities/{id}`)
- [revokeGrant](/operations/revokeGrant.md) (`DELETE /api/v1/grants/{id}`)
- [registerOperator](/operations/registerOperator.md) (`POST /api/v1/operators`)
- [updateOperator](/operations/updateOperator.md) (`PATCH /api/v1/operators/{id}`)
- [deleteOperator](/operations/deleteOperator.md) (`DELETE /api/v1/operators/{id}`)
- [restoreOperator](/operations/restoreOperator.md) (`POST /api/v1/operators/{id}/restore`)
- [rotateTenantKeys](/operations/rotateTenantKeys.md) (`POST /api/v1/tenants/rotate-keys`)
- [createPassport](/operations/createPassport.md) (`POST /api/v1/passports`)
- [ingestPassportFromAas](/operations/ingestPassportFromAas.md) (`POST /api/v1/passports/aas/ingest`)
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
- [getPassportQrCode](/operations/getPassportQrCode.md) (`GET /api/v1/passports/{id}/qr`)
- [getBatteryUnitQrCode](/operations/getBatteryUnitQrCode.md) (`GET /api/v1/units/{id}/qr`)
- [registerTraceabilityEvent](/operations/registerTraceabilityEvent.md) (`POST /api/v1/events`)
- [getEventLineage](/operations/getEventLineage.md) (`GET /api/v1/events/{id}/lineage`)
- [auditEventLineage](/operations/auditEventLineage.md) (`POST /api/v1/events/{id}/audit`)
- [listWebhookSubscriptions](/operations/listWebhookSubscriptions.md) (`GET /api/v1/webhooks/subscriptions`)
- [createWebhookSubscription](/operations/createWebhookSubscription.md) (`POST /api/v1/webhooks/subscriptions`)
- [updateWebhookSubscription](/operations/updateWebhookSubscription.md) (`PATCH /api/v1/webhooks/subscriptions/{id}`)
- [deleteWebhookSubscription](/operations/deleteWebhookSubscription.md) (`DELETE /api/v1/webhooks/subscriptions/{id}`)
- the shared error responses
