# System and Method for Context-Aware Generative Literary Art
**Patent Capability Documentation - EPO (European Patent Office) Aligned**
**Version 3.0 - Enhanced with Real-Time Data Acquisition and Multi-Source Architecture**

---

## 1. Abstract of the Invention
A computer-implemented system and method for transforming quantitative environmental metrics into qualitative literary output. The system utilizes a novel "Constraint Engine" that normalizes geo-spatial pollution data (e.g., PM10, PM2.5, NO2) against localized thresholds to determine specific emotional and structural constraints. The invention further comprises a **Multi-Source Data Acquisition Layer** capable of ingesting environmental data from both historical archives and real-time external APIs, with automatic geocoding of arbitrary global locations. These constraints are dynamically injected into a hybrid generative architecture that seamlessly alternates between stochastic (Cloud AI) and deterministic (Template-based) generation modes based on system latency and availability, ensuring a robust and contextually accurate user experience.

---

## 2. Technical Problem Solved (EPO Requirement)

### Background
Existing generative AI systems produce unpredictable and uncontrollable output when given abstract or open-ended prompts. When tasked with generating content based on numerical data (e.g., environmental metrics), these systems often fail to produce output that is meaningfully correlated to the input data, resulting in generic or inconsistent results. Furthermore, existing systems are typically limited to pre-loaded datasets, lacking the ability to acquire and process real-time data from external sources.

### The Technical Problem
1. How to **deterministically control** the emotional tone, structural form, and lexical content of AI-generated text based on quantitative, geo-spatial input data.
2. How to ensure **system reliability** in the event of network or service failure.
3. How to enable **real-time data acquisition** from external APIs while maintaining compatibility with historical data sources.
4. How to support **arbitrary global locations** without pre-configured data files.

### The Technical Solution
This invention introduces:
1.  A **Constraint Engine** that pre-computes a structured "Constraint Object" from raw data *before* invoking the generative model.
2.  A **Hybrid Generative Architecture** that switches between a primary stochastic engine (Cloud LLM) and a secondary deterministic engine (Local Templates) based on real-time system state.
3.  A **Contextual Normalization Layer** that interprets data relative to its geo-spatial origin, ensuring the generated output reflects local significance.
4.  A **Dynamic Vocabulary System** that modulates lexical constraints based on computed severity tiers.
5.  A **Provenance Audit Trail** that cryptographically links generated output to its input parameters.
6.  A **Multi-Source Data Acquisition Layer** that abstracts data retrieval from multiple sources (historical files, real-time APIs) behind a unified interface.
7.  A **Geocoding Service** that converts human-readable location names to geographic coordinates for API-based data retrieval.

---

## 3. Independent Claims (EPO Format)

### Claim 1: Computer-Implemented Constraint Optimization Method (Method Claim)
A computer-implemented method for controlling the output of a generative language model, comprising:
1.  **Receiving** a numerical environmental metric (avgPollutionRate) associated with a specific geolocation (city) and time range.
2.  **Retrieving** a City Profile comprising a baseline value and a sensitivity factor for said geolocation.
3.  **Calculating** a Contextual Severity Index by computing the deviation of said metric from said baseline and multiplying by said sensitivity factor.
4.  **Determining** a Severity Tier from said Contextual Severity Index, wherein:
    *   A Contextual Severity Index less than 5 corresponds to a "LOW" tier.
    *   A Contextual Severity Index between 5 and 15 corresponds to a "MODERATE" tier.
    *   A Contextual Severity Index between 15 and 30 corresponds to a "HIGH" tier.
    *   A Contextual Severity Index greater than 30 corresponds to a "VERY_HIGH" tier.
5.  **Mapping** said Severity Tier to a corresponding set of semantic constraints, including:
    *   An **Emotional Tone Directive**.
    *   A **Dynamic Lexical Restriction Set** comprising tier-specific forbidden, emphasized, and imagery vocabulary.
6.  **Generating** an Audit Trail comprising input data, computed values, a timestamp, and a checksum.
7.  **Synthesizing** a prompt string incorporating said constraints.
8.  **Transmitting** said prompt string to a generative language model to produce textual output.

### Claim 2: Context-Aware Generative System (Apparatus/System Claim)
A data processing system for generating context-aware textual content, comprising:
*   A **Data Ingestion Module** configured to receive environmental metrics and geolocation identifiers.
*   A **City Profile Database** storing baseline values and sensitivity factors for a plurality of geolocations.
*   A **Normalization Module** configured to calculate a Contextual Severity Index based on the received metric and the corresponding City Profile.
*   A **Constraint Engine Module** configured to:
    *   Determine a Severity Tier from said Contextual Severity Index.
    *   Generate a Constraint Object comprising tone, vocabulary, structure, and audit trail data.
*   A **Primary Generation Module** configured to communicate with a remote generative language model.
*   A **Secondary Generation Module** configured to generate textual content locally using deterministic templates.
*   A **Selector Logic Module** configured to route generation requests to the Primary or Secondary Module based on system state.
*   An **Output Module** configured to deliver the generated textual content to a user interface.

### Claim 3: Computer Program Product (Product Claim)
A non-transitory computer-readable medium storing instructions that, when executed by a processor, cause the processor to perform a method comprising:
1.  Receiving environmental data associated with a geolocation.
2.  Normalizing said data against a stored City Profile to produce a Contextual Severity Index.
3.  Mapping said Index to a Severity Tier.
4.  Generating a Dynamic Vocabulary Set based on said Tier.
5.  Constructing a constrained prompt incorporating said Vocabulary Set.
6.  Invoking a generative model with said prompt.
7.  Returning generated textual output linked to an audit trail.

### Claim 4: Multi-Source Data Acquisition Method (NEW - Method Claim)
A computer-implemented method for acquiring environmental data from multiple heterogeneous sources, comprising:
1.  **Receiving** a data source selection indicator specifying either "HISTORICAL" or "LIVE" mode.
2.  **Receiving** a geolocation identifier (city name or coordinates) and a time range.
3.  **If HISTORICAL mode**:
    *   Retrieving pre-stored environmental data from a local file system based on said geolocation identifier.
    *   Calculating an average metric value for said time range from said pre-stored data.
4.  **If LIVE mode**:
    *   **Geocoding** said geolocation identifier to obtain geographic coordinates (latitude, longitude) via an external geocoding API.
    *   **Transmitting** a request to an external air quality API with said coordinates and time range.
    *   **Receiving** hourly environmental data from said external API.
    *   **Aggregating** said hourly data to calculate an average metric value.
5.  **Returning** said average metric value and associated location metadata to a consuming module.

### Claim 5: Geocoding-Enabled Global Location System (NEW - System Claim)
A data processing system for supporting arbitrary global locations in environmental data retrieval, comprising:
*   A **Known Cities Cache** storing pre-computed geographic coordinates for a plurality of frequently-accessed cities.
*   A **Geocoding Module** configured to:
    *   First query said Known Cities Cache for a matching geolocation identifier.
    *   If no match is found, transmit a request to an external geocoding API.
    *   Receive and parse geographic coordinates from said external API.
    *   Return said coordinates along with supplementary location metadata (country, administrative region).
*   A **Data Retrieval Module** configured to use said coordinates to query external environmental data APIs.
*   A **Fallback Handler** configured to return a default or error response if geocoding fails.

---

## 4. Dependent Claims

### Claims Dependent on Claim 1 (Constraint Optimization Method)
**Claim 6.** The method of Claim 1, wherein the Dynamic Lexical Restriction Set further comprises an **imagery vocabulary list** specific to each Severity Tier, said imagery list being injected into the prompt as visual guidance for the generative model.

**Claim 7.** The method of Claim 1, wherein the Audit Trail further comprises a **checksum** computed from a hash of the input parameters and Severity Tier, enabling verification that a specific output was generated from specific inputs.

**Claim 8.** The method of Claim 1, wherein the Emotional Tone Directive for the "LOW" Severity Tier comprises language directing the generative model to produce output that is "pleasing and celebratory, highlighting the clarity of nature."

**Claim 9.** The method of Claim 1, wherein the Emotional Tone Directive for the "VERY_HIGH" Severity Tier comprises language directing the generative model to produce output that is "urgent and visceral, emphasizing the struggle for breath."

**Claim 10.** The method of Claim 1, wherein the forbidden vocabulary for the "LOW" Severity Tier includes terms associated with negative environmental conditions, including at least: 'choking', 'suffocating', 'toxic', 'deadly'.

**Claim 11.** The method of Claim 1, wherein the forbidden vocabulary for the "VERY_HIGH" Severity Tier includes terms associated with positive environmental conditions, including at least: 'beautiful', 'serene', 'peaceful', 'idyllic'.

### Claims Dependent on Claim 2 (Generative System)
**Claim 12.** The system of Claim 2, wherein the Selector Logic Module is configured to invoke the Secondary Generation Module upon detection of a network timeout exceeding a predetermined threshold.

**Claim 13.** The system of Claim 2, wherein the City Profile Database stores profiles for at least three distinct geolocations, each profile comprising a unique baseline value reflecting the typical environmental conditions of that geolocation.

**Claim 14.** The system of Claim 2, wherein the Constraint Engine Module is further configured to generate a **version identifier** (e.g., "AI(R) Constraint Engine v2.0") included in the Audit Trail for traceability.

### Claims Dependent on Claim 3 (Computer Program Product)
**Claim 15.** The computer program product of Claim 3, wherein the instructions further cause the processor to store the Audit Trail in a persistent log for subsequent retrieval and verification.

**Claim 16.** The computer program product of Claim 3, wherein the Dynamic Vocabulary Set is computed at runtime based on the Severity Tier, rather than retrieved from a static lookup table.

### Claims Dependent on Claim 4 (Multi-Source Data Acquisition - NEW)
**Claim 17.** The method of Claim 4, wherein the LIVE mode further comprises validating that the requested time range falls within a maximum historical window supported by the external API (e.g., 92 days).

**Claim 18.** The method of Claim 4, wherein the aggregation step comprises calculating the arithmetic mean of non-null hourly values, excluding data points marked as invalid or missing.

**Claim 19.** The method of Claim 4, wherein the method further comprises automatically adjusting the time range when switching between HISTORICAL and LIVE modes to reflect the available data window for each source.

**Claim 20.** The method of Claim 4, wherein the location metadata returned includes at least: latitude, longitude, country name, and data source identifier.

### Claims Dependent on Claim 5 (Geocoding System - NEW)
**Claim 21.** The system of Claim 5, wherein the Known Cities Cache stores coordinates for at least 20 cities spanning multiple continents.

**Claim 22.** The system of Claim 5, wherein the Geocoding Module is configured to return a list of alternative location matches when the external API returns multiple results.

**Claim 23.** The system of Claim 5, wherein the Data Retrieval Module supports querying for multiple pollutant types (PM10, PM2.5, NO2) in a single API request.

---

## 5. Technical Implementation Details (Embodiments)

### A. The Constraint Engine (`src/utils/constraintEngine.js`)
*   **Function**: `generateConstraints({ avgPollutionRate, poemType, city })`
*   **Key Sub-functions**:
    *   `determineSeverityTier(contextualSeverity)`: Maps numerical severity to enum tier.
    *   `determineTone(severityTier)`: Returns tier-specific tone directive.
    *   `generateDynamicVocabulary(severityTier)`: Computes tier-specific vocabulary at runtime.
    *   `generateChecksum(data)`: Produces a verifiable hash for provenance.
*   **Output**: A structured Constraint Object:
    ```json
    {
      "tone": "string",
      "structure": "string (template)",
      "vocabulary": {
        "forbidden": ["string"],
        "emphasized": ["string"],
        "imagery": ["string"]
      },
      "severityTier": "LOW | MODERATE | HIGH | VERY_HIGH",
      "contextualSeverity": "number",
      "auditTrail": {
        "inputData": { ... },
        "computedValues": { ... },
        "engineVersion": "string",
        "timestamp": "ISO 8601 string",
        "checksum": "string (e.g., AIR-A1B2C3D4)"
      }
    }
    ```

### B. The Hybrid Service Layer (`src/services/poetry.service.js`)
*   **Function**: `generatePoetry(options)`
*   **Technical Contribution**: Implements a "try-catch-fallback" pattern that constitutes a fault-tolerant computing architecture.

### C. City Profile Normalization (`src/services/pollutionData.service.js`)
*   **Data Structure**: `CITY_PROFILES` object with `baseline` and `sensitivityFactor` per city.
*   **Functions**:
    *   `getContextualSeverity(rawRate, city)`: Calculates normalized severity.
    *   `getCityProfile(city)`: Returns the profile object.

### D. Live Air Quality Service (`src/services/liveAirQuality.service.js`) - NEW
*   **API Endpoint**: `https://air-quality-api.open-meteo.com/v1/air-quality`
*   **Functions**:
    *   `fetchCurrentAirQuality(latitude, longitude)`: Retrieves real-time AQI and pollutant concentrations.
    *   `fetchHistoricalAirQuality(latitude, longitude, startDate, endDate)`: Retrieves hourly data for a date range (up to 92 days).
    *   `getLiveAvgPollutionRate(latitude, longitude, pollutant, startDate, endDate)`: Unified interface returning average pollution rate.
*   **Supported Pollutants**: PM10, PM2.5, NO2, CO, SO2, O3.
*   **Output Structure**:
    ```json
    {
      "success": true,
      "location": {
        "latitude": 45.6983,
        "longitude": 9.6773,
        "timezone": "Europe/Rome"
      },
      "period": {
        "start": "2024-11-01",
        "end": "2024-12-01",
        "dataPoints": 720
      },
      "averages": {
        "pm10": 28.5,
        "pm25": 15.2,
        "no2": 42.1
      },
      "source": "Open-Meteo Air Quality API",
      "fetchedAt": "2024-12-02T10:30:00Z"
    }
    ```

### E. Geocoding Service (`src/services/geocoding.service.js`) - NEW
*   **API Endpoint**: `https://geocoding-api.open-meteo.com/v1/search`
*   **Functions**:
    *   `geocodeCity(cityName)`: Converts city name to coordinates.
    *   `getKnownCities()`: Returns list of pre-cached cities.
    *   `isKnownCity(cityName)`: Checks if city is in cache.
*   **Known Cities Cache**: 20 cities including Bergamo, Milan, Paris, London, Tokyo, New York, etc.
*   **Output Structure**:
    ```json
    {
      "success": true,
      "city": "Tokyo",
      "latitude": 35.6762,
      "longitude": 139.6503,
      "country": "Japan",
      "admin1": "Tokyo",
      "population": 13960000,
      "source": "api",
      "alternatives": [
        { "city": "Tokyo", "country": "Japan", "admin1": "Saitama", ... }
      ]
    }
    ```

### F. Data Source Toggle Hook (`src/hooks/usePollutionDataWithToggle.js`) - NEW
*   **Exported Constants**: `DATA_SOURCE = { HISTORICAL: 'historical', LIVE: 'live' }`
*   **Hook**: `usePollutionDataWithToggle(city, pollutant, fromDate, toDate, dataSource)`
*   **Returns**:
    *   `avgPollutionRate`: Calculated average from selected source.
    *   `loading`: Boolean indicating data fetch status.
    *   `error`: Error message if fetch failed.
    *   `locationInfo`: Metadata about the data source and location.
    *   `reload`: Function to manually trigger data refresh.

---

## 6. Distinction from Prior Art

| Prior Art | This Invention |
|---|---|
| Generic AI prompts (e.g., "Write a poem about pollution") | **Constrained prompts** where tone, vocabulary, and structure are pre-computed from data. |
| Static vocabulary lists | **Dynamic vocabulary** computed at runtime based on Severity Tier. |
| Single-mode generation (Cloud-only or Local-only) | **Hybrid Architecture** with automatic failover and Selector Logic. |
| Global pollution thresholds (e.g., WHO standards) | **Localized City Profiles** that interpret data relative to its origin (baseline + sensitivity). |
| No provenance tracking | **Audit Trail with checksum** linking output to input parameters. |
| Pre-loaded static datasets only | **Multi-Source Data Acquisition** supporting both historical files and real-time APIs. |
| Limited to pre-configured locations | **Geocoding Service** enabling arbitrary global locations via coordinate lookup. |
| Single data source with no fallback | **Data Source Toggle** allowing user selection between Historical and Live modes. |

---

## 7. Filing Notes (EPO Specific)

*   **Classification**: 
    *   **G06F 40/00** (Handling natural language data)
    *   **G06N 3/08** (Learning methods)
    *   **G06F 16/29** (Information retrieval; Database structures - Geographical data)
    *   **G06F 16/9537** (Information retrieval; Query processing - Spatial or geographical queries) - NEW
    *   **G01W 1/00** (Meteorology - Data collection) - NEW
*   **Technical Character**: The claims are directed to a computer-implemented method involving specific algorithms (contextual normalization, dynamic vocabulary generation, checksum computation, geocoding, multi-source data aggregation) and a technical system (hybrid architecture with selector logic, API integration), thereby satisfying the EPO's requirement for "technical character" under Art. 52 EPC.
*   **Inventive Step (COMVIK)**: The features contributing to technical character are:
    1.  The **Contextual Severity Index** calculation (novel normalization).
    2.  The **Dynamic Vocabulary Generation** (runtime computation, not static lookup).
    3.  The **Audit Trail with Checksum** (provenance verification).
    4.  The **Selector Logic Module** (fault-tolerant architecture).
    5.  The **Multi-Source Data Acquisition Layer** (abstraction over heterogeneous data sources). - NEW
    6.  The **Geocoding-Enabled Location System** (dynamic coordinate resolution for global coverage). - NEW
*   **Sufficiency of Disclosure (Art. 83)**: The specification includes exact threshold values, algorithm pseudocode (via code references), API endpoint specifications, and data structure definitions, enabling a person skilled in the art to reproduce the invention.

---

## 8. Claim Dependency Diagram

```
Claim 1 (Constraint Optimization Method - Independent)
├── Claim 6 (Imagery Vocabulary)
├── Claim 7 (Checksum Verification)
├── Claim 8 (LOW Tier Tone)
├── Claim 9 (VERY_HIGH Tier Tone)
├── Claim 10 (LOW Tier Forbidden Words)
└── Claim 11 (VERY_HIGH Tier Forbidden Words)

Claim 2 (Generative System - Independent)
├── Claim 12 (Timeout-based Failover)
├── Claim 13 (Multi-City Database)
└── Claim 14 (Version Identifier in Audit)

Claim 3 (Computer Program Product - Independent)
├── Claim 15 (Persistent Audit Log)
└── Claim 16 (Runtime Vocabulary Computation)

Claim 4 (Multi-Source Data Acquisition - Independent) [NEW]
├── Claim 17 (Time Range Validation)
├── Claim 18 (Null-Value Exclusion in Aggregation)
├── Claim 19 (Automatic Date Range Adjustment)
└── Claim 20 (Location Metadata Return)

Claim 5 (Geocoding System - Independent) [NEW]
├── Claim 21 (20+ City Cache)
├── Claim 22 (Alternative Location Matches)
└── Claim 23 (Multi-Pollutant Query Support)
```

---

## 9. System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           USER INTERFACE LAYER                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  GeneratorControls.jsx                                               │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │    │
│  │  │ Data Source │  │    City     │  │   Date      │                  │    │
│  │  │   Toggle    │  │  Selector   │  │   Range     │                  │    │
│  │  │ [HIST|LIVE] │  │ [Dropdown/  │  │  [Calendar] │                  │    │
│  │  │             │  │  Custom]    │  │             │                  │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        DATA ACQUISITION LAYER                                │
│  ┌──────────────────────────────┐  ┌──────────────────────────────────┐    │
│  │   HISTORICAL MODE            │  │   LIVE MODE                       │    │
│  │   pollutionData.service.js   │  │   liveAirQuality.service.js       │    │
│  │   ┌────────────────────┐     │  │   ┌────────────────────────┐     │    │
│  │   │  Local JSON Files  │     │  │   │  Open-Meteo API        │     │    │
│  │   │  (Jan 2022 - Dec   │     │  │   │  (Last 92 days)        │     │    │
│  │   │   2023)            │     │  │   │                        │     │    │
│  │   └────────────────────┘     │  │   └────────────────────────┘     │    │
│  └──────────────────────────────┘  │   ┌────────────────────────┐     │    │
│                                     │   │  geocoding.service.js  │     │    │
│                                     │   │  (City → Coordinates)  │     │    │
│                                     │   └────────────────────────┘     │    │
│                                     └──────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼ avgPollutionRate
┌─────────────────────────────────────────────────────────────────────────────┐
│                        CONSTRAINT ENGINE LAYER                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  constraintEngine.js                                                 │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │    │
│  │  │ Contextual  │  │  Severity   │  │  Dynamic    │  │   Audit    │ │    │
│  │  │ Severity    │→ │    Tier     │→ │ Vocabulary  │→ │   Trail    │ │    │
│  │  │ Calculation │  │ Mapping     │  │ Generation  │  │ + Checksum │ │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘ │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼ Constraint Object
┌─────────────────────────────────────────────────────────────────────────────┐
│                        GENERATION LAYER                                      │
│  ┌──────────────────────────────┐  ┌──────────────────────────────────┐    │
│  │   PRIMARY (Stochastic)       │  │   SECONDARY (Deterministic)      │    │
│  │   googleAI.js                │  │   offlineFallback.js             │    │
│  │   ┌────────────────────┐     │  │   ┌────────────────────────┐     │    │
│  │   │  Google Gemini AI  │     │  │   │  Local Template Engine │     │    │
│  │   │  (Cloud LLM)       │     │  │   │  (Fallback)            │     │    │
│  │   └────────────────────┘     │  │   └────────────────────────┘     │    │
│  └──────────────────────────────┘  └──────────────────────────────────┘    │
│                    │                              │                         │
│                    └──────────┬──────────────────┘                         │
│                               ▼                                             │
│                    ┌──────────────────────┐                                 │
│                    │  Selector Logic      │                                 │
│                    │  (Hybrid Failover)   │                                 │
│                    └──────────────────────┘                                 │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼ Generated Poem
┌─────────────────────────────────────────────────────────────────────────────┐
│                           OUTPUT LAYER                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  PoemDisplay.jsx                                                     │    │
│  │  - Poem Text                                                         │    │
│  │  - Translation Support                                               │    │
│  │  - Download/Share Actions                                            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```
