# NZC CSV Uploader

A Salesforce solution for Net Zero Cloud (NZC) customers to efficiently create Stationary Asset Energy Use (SAEU) records from structured CSV uploads. This solution includes a Lightning Flow and supporting Apex classes to process CSV data and map it to SAEU records.

![Salesforce](https://img.shields.io/badge/Salesforce-00A1E0?style=flat&logo=salesforce&logoColor=white)
![Lightning Flow](https://img.shields.io/badge/Flow-Lightning%20Flow-blue)
![Net Zero Cloud](https://img.shields.io/badge/Net%20Zero%20Cloud-Sustainability-green)
![API Version](https://img.shields.io/badge/API%20Version-59.0-orange)

## 🌟 Key Features

### 📤 CSV Upload Interface
- **Lightning Flow**: `NZC_CSV_Uploader_SAEUs` provides a user-friendly interface for uploading CSV files
- **Data Conversion**: Converts CSV data into Salesforce SObject records using Apex
- **Bulk Processing**: Supports uploading multiple CSV files simultaneously
- **Validation**: Robust error handling and validation for CSV fields and mappings

### 🎯 Data Processing
- **Record Creation**: Creates SAEU records with dynamic naming and automatic assignment to the correct Stationary Asset Environmental Source
- **Field Mapping**: Maps CSV columns to appropriate Salesforce object fields
- **Date Handling**: Supports various date formats through flexible parsing
- **Error Reporting**: Comprehensive error handling with detailed feedback

### 🔧 Technical Excellence
- **Flow Integration**: Designed for seamless integration with Salesforce Flows
- **CSP Compliant**: Secure implementation without external JavaScript libraries
- **Performance Optimized**: Efficient data processing with minimal latency
- **Error Handling**: Graceful degradation with comprehensive error states

## 📋 Prerequisites

- **Salesforce Edition**: Enterprise, Unlimited, or Developer Edition
- **Net Zero Cloud**: Package must be installed and configured
- **API Version**: 59.0 or higher
- **Lightning Experience**: Required (does not work in Classic)

## ⚠️ Important Disclaimer

**This is an open-source accelerator, not an official Salesforce product.** This component is provided "as-is" under the Apache 2.0 license and is maintained by the community. It is not officially supported by Salesforce. For issues, feature requests, or contributions, please use the GitHub Issues tab.

## 🚀 Installation

Choose the installation method that best fits your skill level and use case.

### Option 1: One-Click Deploy (Recommended for Admins)

The easiest way to install this accelerator in your Salesforce org:

[![Deploy to Salesforce](https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png)](https://githubsfdeploy.herokuapp.com/?owner=nicholaschughes&repo=NZC-CSV-Uploader)

> **Note:** After clicking the button, you'll need to provide the repository owner and name when prompted.

### Option 2: Metadata Package Deploy (Admin-Friendly)

1. Download the pre-packaged metadata .zip file from the [Releases](../../releases) section
2. Use one of these tools to deploy:
   - **Salesforce Workbench**: Tools → Deploy
   - **Salesforce Inspector**: Deploy → Upload Zip
   - **Ant Migration Tool**: Use the downloaded package

### Option 3: Salesforce CLI (Developer/Pro-Code)

For developers who want full control and CI/CD integration:

```bash
# Clone the repository
git clone https://github.com/nicholaschughes/NZC-CSV-Uploader.git
cd NZC-CSV-Uploader

# Authorize your org
sf org login web --alias my-org

# Deploy to your org
sf project deploy start --source-dir force-app/ --target-org my-org
```

**Compatible with CI/CD tools** like Gearset, Copado, and standard SFDX pipelines.

## 📋 Post-Installation Steps

After deploying the accelerator, complete these configuration steps:

### Step 1: Add Flow to Account Pages

1. Navigate to **Setup** → **Lightning App Builder**
2. **Edit** an existing Account record page or **Create** a new one
3. Find the **"NZC CSV Uploader SAEUs"** flow in the flows section
4. **Drag** the flow to your desired location on the page
5. **Save** the page
6. **Activate** the page (assign it to apps, record types, or as org default)

### Step 2: Configure User Permissions

Ensure users have access to:
- **Stationary Asset Energy Use** object (Read/Write access)
- **Stationary Asset Environmental Source** object (Read access)
- **ContentDocument** object (Read/Write access)
- **Flow Runtime** permissions

## 💡 Usage

### Step-by-Step Walkthrough

1. **Navigate** to any Account record page with the flow installed
2. **Initiate** the flow from the Account page
3. **Upload** a CSV file using the file picker
4. **Review** the uploaded file and data preview
5. **Process** the data through the flow
6. **Confirm** the creation of SAEU records

### Flow Process

The flow handles CSV uploads through these stages:
- **Upload Screen**: Displays upload interface with CSV template link
- **Data Processing**: Uses `NZC_ConvertCSVToRecords` to parse CSV data
- **Mapping**: Assigns SAES ID and generates dynamic names for records
- **Validation**: Counts newly created records
- **Creation**: Creates the SAEU records in Salesforce
- **Confirmation**: Shows success message with record count

## 🏗️ Architecture

### Component Structure
```
force-app/main/default/
├── flows/
│   └── NZC_CSV_Uploader_SAEUs.flow     # Main flow definition
├── lwc/
│   └── fileUploadImproved/             # Custom LWC component for file upload
├── classes/
│   ├── NZC_ConvertCSVToRecords.cls     # CSV to SObject conversion
│   ├── NZC_CountRecordsAndFields.cls   # Record counting and validation
│   └── ...                             # Other supporting classes
├── objects/
│   ├── StnryAssetEnrgyUse.object       # Stationary Asset Energy Use object
│   └── StnryAssetEnvrSrc.object        # Stationary Asset Environmental Source object
└── ...                                 # Other metadata components
```

### Data Integration

The solution integrates with Net Zero Cloud objects:

- **`StnryAssetEnrgyUse`** - Stores energy usage records for stationary assets
- **`StnryAssetEnvrSrc`** - References the environmental source for energy usage
- **`ContentDocument`** - Stores uploaded CSV files

### Key Components

#### Apex Classes
1. **NZC_ConvertCSVToRecords.cls**
   - Purpose: Converts CSV content from `ContentDocument` records into Salesforce SObjects
   - Method: `convert()` - Takes CSV data and converts it to a list of SObjects matching the specified object type
   - Features: Handles field mapping, data type conversion, and CSV parsing with support for various separators and date formats
   - Invocable: Yes, designed for use in flows

2. **NZC_CountRecordsAndFields.cls**
   - Purpose: Counts records in a collection based on a field value
   - Method: `count()` - Returns total and matched record counts for validation purposes
   - Invocable: Yes, designed for use in flows

#### Lightning Flow
- **NZC_CSV_Uploader_SAEUs.flow**
  - Purpose: Orchestrates the CSV upload and processing workflow
  - Flow Steps:
    1. Retrieves the target Stationary Asset Environmental Source (SAES)
    2. Displays upload screen with CSV template link and tips
    3. Processes uploaded CSV files using `NZC_ConvertCSVToRecords`
    4. Assigns the SAES ID and generates dynamic names for each SAEU record
    5. Counts newly created records
    6. Creates the SAEU records in Salesforce
    7. Shows confirmation screen with success message and record count

#### Custom LWC Component
- **c:fileUploadImproved**: Handles the file upload functionality within the flow

## 🎨 Customization

### Styling
The solution uses Salesforce Lightning Design System with custom styling for the flow interface and LWC component.

### Flow Customization
The flow can be customized by:
- Modifying the upload screen layout
- Adjusting validation rules
- Changing success/error messages
- Updating field mappings

## 🧪 Testing

### Run Unit Tests
```bash
# Install dependencies
npm install

# Run Apex tests (requires Salesforce CLI)
sf apex run test --test-suite NZC_ConvertCSVToRecordsTest
sf apex run test --test-suite NZC_CountRecordsAndFieldsTest
```

### Manual Testing Checklist

- [ ] Flow displays correctly on Account pages
- [ ] File upload functionality works
- [ ] CSV data parsing is accurate
- [ ] Data validation catches errors
- [ ] Flow processes data correctly
- [ ] SAEU records are created successfully
- [ ] Error states display appropriately
- [ ] Empty states show helpful messages

## 🔧 Development

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/nicholaschughes/NZC-CSV-Uploader.git
   cd NZC-CSV-Uploader
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Authorize your Dev Hub**
   ```bash
   sf org login web --set-default-dev-hub
   ```

4. **Create a scratch org**
   ```bash
   sf org create scratch --definition-file config/project-scratch-def.json --alias lwc-demo --set-default
   ```

5. **Deploy the component**
   ```bash
   sf project deploy start
   ```

6. **Open the scratch org**
   ```bash
   sf org open
   ```

### Code Quality

The project includes:
- **Apex best practices** with proper error handling and bulkification
- **Flow design patterns** for optimal performance
- **LWC component structure** following SLDS guidelines

Run quality checks:
```bash
sf apex run test --test-level RunLocalTests    # Run all tests
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines

- Follow Salesforce coding standards
- Include unit tests for new functionality
- Update documentation for any changes
- Ensure all tests pass before submitting

## 📚 Resources

### Salesforce Development
- [Lightning Flow Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.flow_dev.meta/flow_dev/flow_dev_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Lightning Web Components Guide](https://developer.salesforce.com/docs/component-library/documentation/en/lwc)

### Net Zero Cloud
- [Net Zero Cloud Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.netzero_cloud_dev_guide.meta/netzero_cloud_dev_guide/netzero_cloud_std_objects_intro.htm)
- [Net Zero Cloud Object Reference](https://developer.salesforce.com/docs/atlas.en-us.netzero_cloud_dev_guide.meta/netzero_cloud_dev_guide/netzero_cloud_objects.htm)

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for full details.

```
Copyright (c) 2025, Nicholas Hughes
All rights reserved.
SPDX-License-Identifier: Apache-2.0
```

## 🆘 Support & Bug Reports

This accelerator is community-supported and not officially maintained by Salesforce.

- **Report Bugs**: Use the [GitHub Issues](../../issues) tab to report bugs or problems
- **Request Features**: Submit enhancement requests through [GitHub Issues](../../issues)
- **Ask Questions**: Start a [GitHub Discussion](../../discussions) for general questions
- **Documentation**: Check the [Wiki](../../wiki) for additional guides and tips

**Note:** This is not an official Salesforce product. For official support, please contact Salesforce directly for your Net Zero Cloud implementation.

## 🏷️ Version History

### v1.0.0 (Current)
- Initial release
- CSV upload flow for SAEU records
- Apex classes for CSV processing and validation
- Custom LWC component for file upload
- Support for Stationary Asset Energy Use object
- Integration with Stationary Asset Environmental Source object

---

**⭐ If this project helps you, please give it a star!**

Made with ❤️ for the Salesforce community and sustainability initiatives.