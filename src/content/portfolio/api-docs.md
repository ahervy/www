---
title: Improving onboarding for a weather API
img: /assets/api-docs.webp
img_alt: Interactive API documentation and playground for OpenWeather's Current Weather API
description: |
  Redesigned API documentation to provide a clear path to first API call, using a task-focused quickstart and OpenAPI-based reference.
meta_description: API documentation with interactive examples, streamlined onboarding, and a focus on developer experience for OpenWeather's Current Weather API.
summary: |
  Rebuilt API documentation to provide a clear path to first API call, using an OpenAPI-based reference and task-focused quickstart  
audience: Backend and frontend developers integrating current weather data
role: Technical writer and documentation strategist
deliverables:
  - OpenAPI specification
  - Getting started guide
  - Reference documentation
  - Authentication and rate limits pages
  - Interactive API playground
tools:
  - Mintlify
  - OpenAPI
  - Postman
outcomes:
  - Clear path to first API call through a task-based quickstart
  - Self-serve testing via interactive API playground
  - Reduced ambiguity around authentication and rate limits
sample_url: https://arnaud.mintlify.app/introduction
tags:
  - API documentation
  - OpenAPI
  - technical writing
---

## Context

OpenWeather provides a widely used API for current weather data. The existing documentation contained all required information, but made it difficult for developers to understand how to make a first successful request.

## Problem

The documentation made first-time integration harder than necessary:

- No clear path to a first API call
- Authentication and rate limits were documented but not contextualized
- Examples were inconsistent and not tied to real tasks

Developers had to piece together information across multiple pages before getting a working request.

## My role

I restructured the documentation to create a clear onboarding path and a consistent reference system.

## Approach

- Tested the API as a new user to map the onboarding flow
- Identified missing steps and unclear concepts in the existing docs
- Introduced an OpenAPI-based reference for consistency
- Designed a quickstart focused on reaching a first successful API call

## Key decisions

- Prioritized a quickstart over expanding existing reference content
- Used OpenAPI to enforce consistency across endpoints and examples
- Separated conceptual explanations (auth, rate limits) from task-based flows
- Added an interactive playground to reduce context switching

## What changed

- Developers can now make a first API call from a single entry point
- Reference documentation is generated from a consistent OpenAPI source
- Examples are aligned with real usage instead of isolated snippets

## Evidence

No internal metrics were available. Improvements are based on:

- Reduced number of steps to first API call
- Clearer mapping between tasks and documentation sections
- Ability to test endpoints directly from the documentation

## Takeaways

- Most friction came from structure, not missing content
- A clear onboarding path is more valuable than exhaustive documentation
- Consistency (via OpenAPI) reduces long-term maintenance and confusion
