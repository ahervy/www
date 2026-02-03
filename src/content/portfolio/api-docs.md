---
title: API documentation for a weather API
img: /assets/api-docs.webp
img_alt: Interactive API documentation and playground for OpenWeather's Current Weather API
description: |
  This case study is about the rewriting of the API documentation for OpenWeather's Current Weather API, with a focus on developer experience.
meta_description: API documentation with interactive examples, streamlined onboarding, and a focus on developer experience for OpenWeather's Current Weather API.
summary: |
  Improved onboarding by redesigning API docs and adding interactive examples for faster time-to-first-call.
audience: Backend and frontend developers integrating current weather data.
role: Technical writer and documentation strategist.
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
  - Shortened onboarding path with a guided quickstart
  - Self-serve testing through an interactive playground
  - Clearer expectations for auth and rate limits
sample_url: https://arnaud.mintlify.app/introduction
tags:
  - API documentation
  - OpenAPI
  - technical writing
---

## Context

OpenWeather's Current Weather Data API is a valuable resource for developers, but its [documentation](https://openweathermap.org/current) could be improved.

## Problem

The existing docs made first-time integration slow and unclear, especially around auth, rate limits, and example requests.

## My role

My goal was to revamp the documentation to help developers integrate the API quickly and effectively.

## Approach

- Audited the current docs and tested the API to map friction points.
- Wrote an OpenAPI spec to power reference docs and consistent examples.
- Built a task-focused quickstart and clarified auth and rate limits.

## Process

1. Exploring the API: I created an account and tested the API using Postman to gain a deep understanding of its capabilities and limitations.
2. Taking a developer-centric approach: while testing the API, I focused on the onboarding process and learning experience for developers.
3. Analyzing the existing documentation: I identified ways to improve navigation, usability, and the developer experience.
4. Building the content:
   - I created an [OpenAPI definition](https://github.com/ahervy/api-docs/blob/main/api-reference/openapi.yaml) that describes the API.
   - I used [Mintlify](https://mintlify.com/) to generate the API reference documentation and an interactive playground.
   - I created a getting started guide and pages about the API, rate limits, and authentication methods.

## Results

- A getting started guide walks developers through making their first API call, reducing the onboarding time.
- An interactive playground enables developers to make API calls directly within the documentation.

## Impact

- Faster time-to-first-call thanks to the quickstart and examples.
- Fewer integration blockers by clarifying auth and rate limits upfront.

## Takeaways

- Walking in the developer's shoes was crucial for identifying areas for improvement.
- Choosing the right tools streamlined the documentation process and made it more interactive.
