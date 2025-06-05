# Agri Use Case Implementation Guide (Beckn Perspective)  
### Use Case: Soil Testing via Unified Krishi Interface (UKI)

---

## Objective

This guide helps developers integrate their BAP (Beckn Application Platform) or BPP (Beckn Provider Platform) with the UKI open network powered by the Beckn Protocol for soil testing services in agriculture.

---

## BAP–BPP Roles

- **BAP (Beckn Application Platform)**  
  Interface used by farmers. Initiates service discovery, order placement, tracking, and post-fulfillment.

- **BPP (Beckn Provider Platform)**  
  Service provider's backend system. Publishes services, responds to search queries, handles order confirmations and fulfillment.

---

## Network Entities and Roles

| Entity                 | Description                               | Beckn Role                     |
| ---------------------- | ----------------------------------------- | ------------------------------ |
| **Farmer**             | Requests soil testing service             | End-user (via BAP)             |
| **Agri App/Portal**    | Platform accessed by farmers              | BAP                            |
| **Soil Testing Lab**   | Performs testing, uploads reports         | BPP                            |
| **Extension Agent**    | May help collect and deliver soil samples | Optional Fulfillment Partner   |
| **Aggregator/Startup** | May onboard multiple labs                 | BPP Aggregator (optional)      |

---

## 4. DOFP

### Discovery
- User searches for soil testing centres using her BAP (UKI-enabled app).
- Possible to Filter on the basis of:
  - Ratings, Provider Experience,Location,Cost
  - Collection Type (farm pickup / self-delivery)
  - Test Types: NPK, micronutrient, pH, EC, organic carbon, texture, water, contaminants
  - User selects "Krishi Kendra Soil Services"

### Order
- Reviews available slots, price quote, prerequisites
- Confirms with **cash on delivery** (COD)

### Fulfillment
#### If **farm pickup**:
- Service provider schedules pickup
- Agent collects sample
- User pays in cash at pickup

#### If **self-delivery**:
- User prepares soil using the procedure explained by the provider
- Takes it to testing centre
- Pays in cash

- Receives test updates and final report (PDF, video etc.)

### Post-Fulfillment
- User rates the service based on:
    - Product/service quality 
    - Service Provider


- BPP receives rating and can request further feedback
- User can reach out to support services if required

---

## API Sequence (Beckn Protocol)

```text
/search      →  BAP initiates discovery
/on_search   →  BPPs respond

/select      →  Farmer selects service
/on_select   →  BPP provides service quote

/init        →  Order initiation
/on_init     →  BPP validates

/confirm     →  Farmer confirms order
/on_confirm  →  BPP acknowledges and assigns agent

/status      →  Track fulfillment status
/on_status   →  Status updates

/update      →  BPP sends live updates
/on_update   →  Acknowledged

/rating      →  Farmer gives feedback
/on_rating   →  BPP receives it

```

### Example: search Request (BAP->BPP)

```json
{
  "context": {
    "domain": "agri.soil",
    "action": "search",
    "country": "IND",
    "city": "std:080",
    "core_version": "0.9.2",
    "bap_id": "https://soil-bap.krishi.in",
    "bap_uri": "https://soil-bap.krishi.in/beckn",
    "transaction_id": "txn-001",
    "message_id": "msg-001",
    "timestamp": "2025-06-04T09:00:00.000Z"
  },
  "message": {
    "intent": {
      "item": {
        "descriptor": {
          "name": "Soil Test"
        }
      },
      "fulfillment": {
        "end": {
          "location": {
            "gps": "12.9716,77.5946"
          }
        }
      }
    }
  }
}
```

---

### Example: on_search Response (BPP->BAP)

```json
{
  "context": {
    "domain": "agri.soil",
    "action": "on_search",
    "country": "IND",
    "city": "std:080",
    "core_version": "0.9.2",
    "bap_id": "https://soil-bap.krishi.in",
    "bap_uri": "https://soil-bap.krishi.in/beckn",
    "bpp_id": "https://soil-lab.krishi.in",
    "bpp_uri": "https://soil-lab.krishi.in/beckn",
    "transaction_id": "txn-001",
    "message_id": "msg-002",
    "timestamp": "2025-06-04T09:00:02.000Z"
  },
  "message": {
    "catalog": {
      "descriptor": {
        "name": "Soil Testing Services"
      },
      "providers": [
        {
          "id": "soil-lab-001",
          "descriptor": {
            "name": "Green Soil Labs"
          },
          "locations": [
            {
              "id": "loc-001",
              "gps": "12.9716,77.5946"
            }
          ],
          "items": [
            {
              "id": "soil-test-basic",
              "descriptor": {
                "name": "Basic Soil Test",
                "long_desc": "Tests for NPK levels, pH, and organic content"
              },
              "price": {
                "value": "150",
                "currency": "INR"
              },
              "fulfillment_id": "fulfill-001"
            }
          ],
          "fulfillments": [
            {
              "id": "fulfill-001",
              "type": "Sample Collection",
              "tracking": false,
              "contact": {
                "email": "support@greensoil.in",
                "phone": "1800123456"
              },
              "start": {
                "location": {
                  "gps": "12.9716,77.5946"
                }
              },
              "end": {
                "location": {
                  "gps": "12.9716,77.5946"
                }
              },
              "time": {
                "label": "Report Delivery",
                "duration": "P2D"
              }
            }
          ]
        }
      ]
    }
  }
}
```

## High-level Flow Diagram

![High-level flow diagram](flow-diagram.svg)
---

## Relevant Tags/Taxonomy

- **Domain**: `agri.soil`
- **Service Type**: Soil Testing Services
- **Fulfillment Types**: 
  - `Sample Collection` (farm pickup)
  - `Self Delivery` (farmer delivers soil sample)
- **Test Types**: 
  - Nutrient tests: NPK (Nitrogen, Phosphorus, Potassium)
  - Micronutrient analysis
  - Soil pH
  - Electrical Conductivity (EC)
  - Organic carbon
  - Soil texture
  - Water content
  - Contaminants (e.g., heavy metals, pesticides)
- **Payment Mode**: Cash on Delivery (COD)
- **Location**: GPS coordinates
- **Ratings/Feedback**: Quality of service, provider experience

---

## Challenges and Assumptions

### Challenges

- **Network Latency & Consistency**: Real-time status updates might be delayed or lost; proper retries and error handling must be in place.
- **Service Discovery Granularity**: Filtering based on detailed soil test parameters (e.g., specific micronutrients) requires comprehensive cataloging and tagging on BPP side.
- **Trust & Quality Assurance**: Ensuring labs maintain standards and the accuracy of test results is beyond protocol scope but critical operationally.

### Assumptions

- All BPPs and BAPs strictly adhere to Beckn protocol v0.9.2 for interoperability.
- User location data is accurate and permission is granted.
- Labs can digitally upload and share reports in multiple formats (PDF, video).
- Optional agents (extension workers) are registered and integrated via fulfillment workflows.

---

## Developer Notes

- **API Versioning**: Use core_version `"0.9.2"` in all context objects for compatibility.
- **Transaction and Message IDs**: Must be unique per request; facilitate tracing and debugging.
- **Fulfillment IDs**: Associate fulfillment objects with items/services for tracking and updates.
- **Security**: Ensure HTTPS and authentication between BAP and BPP endpoints.
- **Testing**: Simulate both farm pickup and self-delivery workflows to verify end-to-end fulfillment.
- **Rate Limiting & Throttling**: Anticipate high search/query loads during peak agricultural seasons.