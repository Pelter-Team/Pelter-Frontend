# Pelter - Stray Pet Adoption Platform
## Overview
Pelter is an e-commerce platform connecting stray pets with potential adopters, enabling both free and paid adoptions. The platform serves as a centralized hub for individuals and organizations to list and find pets needing homes.

## Problem Statement
Despite ongoing efforts, stray animal management remains a significant challenge. Many potential pet owners lack access to proper adoption channels, while shelters struggle with resource limitations. Pelter addresses this gap by providing a structured platform for pet adoption.

## Tech Stack
- Frontend Framework: Next.js
- Styling: Tailwind CSS, Ant Design
- API Integration: ts-rest
- Data Fetching: TanStack Query
- Language: TypeScript

## Prerequisites
```
node >= 18.18.0
pnpm >= 9.11.0
```

## Installation
```
pnpm install
```

## Development
```
pnpm dev
```

## Build
```
pnpm build
```

## Project Structure
```
src
├── app                    # Next.js app directory
│   ├── (admin)            # Admin routes
│   │   └── admin          # Admin dashboard
│   ├── (auth)             # Authentication routes
│   │   ├── _component     # Auth components
│   │   ├── signin         # Login page
│   │   └── register       # Registration pages
│   ├── (user)             # User routes
│   │   ├── pet            # Pet details
│   │   └── petlist        # Pet listing pages
│   ├── component          # App-level components
│   ├── newProduct         # New pet listing
│   └── productManage      # Product management
├── components             # Shared components
├── config                 # Configuration files
├── core                   # Core functionality
│   ├── api                # API integration
│   │   ├── pet            # Pet-related contracts
│   │   ├── transaction    # Transaction contracts
│   │   └── user           # User-related contracts
│   └── cloudinary         # Image upload config
├── features               # Feature modules
│   ├── admin              # Admin features
│   ├── auth               # Auth features
│   ├── pet                # Pet features
│   ├── productManage      # Product management
│   ├── transaction        # Transaction features
│   └── user               # User features
├── providers              # Global providers
└── utils                  # Utility functions
```
