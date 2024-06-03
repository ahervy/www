---
title: API docs for a weather API
publishDate: 2024-06-03 00:00:00
img: /assets/api-docs.png
img_alt: Interactive API documentation and playground for OpenWeather's Current Weather API
description: |
  This case study is about the rewriting of the existing API docs for OpenWeather's Current Weather API, with interactive examples, streamlined onboarding, and a focus on developer experience.
meta_description: Improved API documentation with interactive examples, streamlined onboarding, and a focus on developer experience for OpenWeather's Current Weather API.
sample_url: https://arnaud.mintlify.app/introduction
tags:
  - technical writing
  - API documentation
---

## Context

OpenWeather's Current Weather Data API is a valuable resource for developers, but its [existing documentation](https://openweathermap.org/current) could be improved.

## My role

My goal was to revamp the documentation to empower developers to integrate the API quickly and effectively.

## Process

1. Exploring the API: I started by creating an account and testing the API using Postman to gain a deep understanding of its capabilities and limitations.
2. Taking a developer-centric approach: I tested the API to understand the onboarding process from the developer's perspective.
3. Building the content: I created [a comprehensive OpenAPI definition](https://github.com/ahervy/api-docs/blob/main/api-reference/openapi.yaml) to describe the API, endpoints, parameters, and responses. I used [Mintlify](https://mintlify.com/) to generate the API reference documentation and an API playground. I also created a getting started guide and other pages about the API, rate limits, and authentication methods.

## Results

- The interactive playground enables developers to experiment with API calls directly within the docs.
- A getting started guide walks developers through making their first API call.

## Takeaways

- Walking in the developer's shoes was crucial for identifying areas for improvement.
- Selecting the right tools, the OpenAPI definition and Mintlify here, streamlined the documentation process and enhanced its interactivity.
