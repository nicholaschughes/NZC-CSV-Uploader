# Repository Summary: NZC CSV Uploader

## Overview

This repository provides a Salesforce solution for Net Zero Cloud (NZC) customers to efficiently create Stationary Asset Energy Use (SAEU) records from structured CSV uploads. It includes a Lightning Flow and supporting Apex classes to process CSV data and map it to SAEU records.

## Key Features and User Flows

- **CSV Upload Interface**: A Lightning Flow (`NZC_CSV_Uploader_SAEUs`) provides a user-friendly interface for uploading CSV files.
- **Data Conversion**: Converts CSV data into Salesforce SObject records using Apex.
- **Bulk Processing**: Supports uploading multiple CSV files simultaneously.
- **Validation and Error Handling**: Includes robust error handling and validation for CSV fields and mappings.
- **Record Creation**: Creates SAEU records with dynamic naming and automatic assignment to the correct Stationary Asset Environmental Source.

## Metadata Components

### Custom Objects
- `StnryAssetEnrgyUse`: Stores energy usage records for stationary assets.
- `StnryAssetEnvrSrc`: References the environmental source (stationary asset) for which energy usage is recorded.

### Apex Classes
1. **NZC_ConvertCSVToRecords.cls**
   - Purpose: Converts CSV content from `ContentDocument` records into Salesforce SObjects.
   - Method: `convert()` - Takes CSV data and converts it to a list of SObjects matching the specified object type.
   - Features: Handles field mapping, data type conversion, and CSV parsing with support for various separators and date formats.
   - Invocable: Yes, designed for use in flows.

2. **NZC_CountRecordsAndFields.cls**
   - Purpose: Counts records in a collection based on a field value.
   - Method: `count()` - Returns total and matched record counts for validation purposes.
   - Invocable: Yes, designed for use in flows.

### Lightning Flow
- **NZC_CSV_Uploader_SAEUs.flow**
  - Purpose: Orchestrates the CSV upload and processing workflow.
  - Flow Steps:
    1. Retrieves the target Stationary Asset Environmental Source (SAES).
    2. Displays upload screen with CSV template link and tips.
    3. Processes uploaded CSV files using `NZC_ConvertCSVToRecords`.
    4. Assigns the SAES ID and generates dynamic names for each SAEU record.
    5. Counts newly created records.
    6. Creates the SAEU records in Salesforce.
    7. Shows confirmation screen with success message and record count.

### Components
- **c:fileUploadImproved** (custom LWC component): Handles the file upload functionality within the flow.

## Data Model

### ERD Overview
```
[StnryAssetEnvrSrc] 1 ----< [StnryAssetEnrgyUse]
```
- `StnryAssetEnvrSrc` (Parent): Represents a stationary asset environmental source.
- `StnryAssetEnrgyUse` (Child): Records energy usage data for a specific SAES.

### Key Relationships
- `StnryAssetEnrgyUse.StnryAssetEnvrSrcId` references `StnryAssetEnvrSrc.Id`.

## External Integrations and APIs

- **ContentDocument API**: Used to retrieve uploaded CSV file content.
- **Salesforce Flow Runtime**: Executes the CSV processing workflow.

## Setup Requirements

### Scratch Org Configuration
- Standard scratch org definition with required permissions for:
  - Reading/writing `StnryAssetEnrgyUse` and `StnryAssetEnvrSrc` objects.
  - Managing `ContentDocument` records.
  - Using Lightning Flows and custom LWC components.

### Required Permissions
- Permission sets or profiles with:
  - Read/Write access to `StnryAssetEnrgyUse` and `StnryAssetEnvrSrc`.
  - ContentDocument access.
  - Flow runtime permissions.

## Development Workflow

### Standard Commands
- Deploy to scratch org: `sf project deploy start`
- Retrieve from scratch org: `sf project retrieve start`
- Open scratch org: `sf org open`

### Special Considerations
- Ensure `c:fileUploadImproved` LWC component is deployed with the flow.
- Validate CSV templates match object field API names.
- Test with various CSV formats (date formats, separators, etc.).

## Known Limitations and Future Enhancements

### Current Limitations
- Requires CSV columns to match exact SObject field API names.
- Assumes CSV date formats align with the user's locale settings.
- Limited to single-object record creation (SAEU only).

### Future Enhancements
- Support for multiple object types in a single CSV upload.
- Enhanced CSV validation with detailed error reporting.
- Integration with external data sources.
- Support for more complex field transformations.

## LLM Guidance for AI Assistants

### Coding Conventions
- Use `@InvocableMethod` for Apex methods intended for Flow integration.
- Follow Salesforce Apex best practices (bulkification, governor limits, exception handling).
- Maintain clear documentation and comments for complex logic.

### Do's and Don'ts
- Do: Use `Schema.DisplayType` for dynamic field type handling.
- Do: Implement proper error handling with custom exceptions.
- Don't: Hard-code field names or object names.
- Don't: Perform DML operations inside loops.
