# Policy Inquiry API — Steps 1 & 2

## Overview

The Policy Inquiry is the first exchange in the BD Change Process for producer changes on existing annuities. The **Receiving Broker/Dealer** submits a request through DTCC to the **Delivering Broker/Dealer**, asking for details on specific contracts held by a client. This is a single-client-per-request operation.

The Receiving Firm provides minimal identifying information — client name, SSN, and contract numbers — and receives back enriched policy details for each contract.

---

## Step 1 — Policy Inquiry Request

Submitted by the Receiving Broker/Dealer to DTCC.

**DTCC Status:** `MANIFEST_REQUESTED`

### Payload

```json
{
  "policy-inquiry-request": {
    "requesting-firm": {
      "firm-name": null,
      "firm-id": null,
      "servicing-agent": {
        "agent-name": null,
        "npn": null
      }
    },
    "client": {
      "client-name": null,
      "ssn": null,
      "contract-numbers": []
    }
  }
}
```

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| `requesting-firm.firm-name` | string | Name of the receiving broker/dealer |
| `requesting-firm.firm-id` | string | DTCC firm identifier |
| `requesting-firm.servicing-agent.agent-name` | string | Name of the new servicing agent |
| `requesting-firm.servicing-agent.npn` | string | National Producer Number of the new agent |
| `client.client-name` | string | Full name of the client |
| `client.ssn` | string | Client's Social Security Number |
| `client.contract-numbers` | string[] | List of contract numbers to inquire about |

### Notes

- This is a **one client at a time** request.
- The delivering firm is not specified in the request — DTCC routes based on the contract numbers provided.
- The servicing agent information is included so the delivering firm and carrier are aware of the intended new agent from the outset.

---

## Step 2 — Policy Inquiry Response

Returned by the Delivering Broker/Dealer through DTCC to the Receiving Firm.

**DTCC Status:** `MANIFEST_RECEIVED`

### Payload

```json
{
  "policy-inquiry-response": {
    "client": {
      "client-name": null,
      "ssn-last-4": null,
      "policies": {
        "<contract-number>": {
          "carrier-name": null,
          "account-type": null,
          "plan-type": null,
          "ownership": null,
          "product-name": null,
          "cusip": null,
          "trailing-commission": false,
          "contract-status": null,
          "withdrawal-structure": {
            "systematic-in-place": false
          },
          "errors": []
        }
      }
    },
    "enums": {
      "account-type": [
        "individual",
        "joint",
        "trust",
        "custodial",
        "entity"
      ],
      "plan-type": [
        "non-qualified",
        "roth-ira",
        "traditional-ira",
        "sep",
        "simple"
      ]
    }
  }
}
```

### Field Reference

| Field | Type | Description |
|-------|------|-------------|
| `client.client-name` | string | Client name echoed back for confirmation |
| `client.ssn-last-4` | string | Last four digits of the client's SSN |
| `client.policies` | object | Contract-number-keyed map of policy details |

#### Policy Object (keyed by contract number)

| Field | Type | Description |
|-------|------|-------------|
| `carrier-name` | string | Name of the insurance carrier that wrote the annuity |
| `account-type` | enum | Registration type of the account (see enums) |
| `plan-type` | enum | Tax qualification type of the account (see enums) |
| `ownership` | string | Ownership structure of the policy |
| `product-name` | string | Name of the annuity product |
| `cusip` | string | CUSIP identifier for the product |
| `trailing-commission` | boolean | Whether trailing commission will apply to the new servicing agent |
| `contract-status` | string | Current status of the contract |
| `withdrawal-structure.systematic-in-place` | boolean | Whether a systematic withdrawal plan is currently active |
| `errors` | array | Any errors or issues associated with this policy |

### Notes

- The `policies` object is keyed by contract number, so each entry is accessed directly by its contract number rather than iterating an array.
- The delivering firm information is **not** included in the response — DTCC is aware of the delivering firm but does not pass it back to the receiving firm.
- The response returns only the **last four digits** of the SSN for security.
- The `trailing-commission` field is a simple yes/no indicating whether the new servicing agent will receive trailing commissions on this policy.

---

## Enums

### account-type

| Value | Description |
|-------|-------------|
| `individual` | Individual account |
| `joint` | Joint account |
| `trust` | Trust account |
| `custodial` | Custodial account |
| `entity` | Entity account |

### plan-type

| Value | Description |
|-------|-------------|
| `non-qualified` | Non-qualified (after-tax) account |
| `roth-ira` | Roth Individual Retirement Account |
| `traditional-ira` | Traditional Individual Retirement Account |
| `sep` | Simplified Employee Pension |
| `simple` | Savings Incentive Match Plan for Employees |

> **Note:** The plan-type list is a starting set. The full DTCC qualified account type list will be incorporated in a future revision.

---

## Sequence Context

This request/response pair covers Steps 1 and 2 of the broader BD Change Process. After the Receiving Firm reviews the returned policy details (Step 3 — Due Diligence), in-scope policies proceed to Step 4 where individual BD Change Requests are sent to each carrier for validation.
