---
title: Helping users safely manage API keys
img: /assets/how-to.webp
img_alt: How-to guide for managing API keys in HTML format
description: |
  Created documentation for API key management to enable self-service workflows and clarify security implications such
  as revocation and one-time visibility.
meta_description: |
  API key management documentation covering creation, revocation, one-time visibility, permissions, and security risks
  for developer operations users.
summary: Created documentation for API key creation and revocation, with clear warnings about real-world consequences
audience: API users with admin access and developer operations teams
role: Technical writer partnering with product and support
deliverables:
  - How-to guide for creating and revoking API keys
  - UI copy for key management warnings
tools:
  - Zendesk Guide
  - Postman
outcomes:
  - Creation and revocation workflows documented end to end
  - Revocation impact on integrations made explicit before the destructive action
  - Consistent terminology across UI and documentation
tags:
  - technical writing
---

## Context

The product introduced a feature allowing users to manage their own API keys instead of relying on support.

## Problem

API key management involves irreversible actions and security implications:

- Revoking a key can break existing integrations
- Keys are often visible only once at creation
- Users need to understand consequences before taking action

Without clear guidance, users risk breaking their own systems or contacting support for clarification.

## My role

I defined and documented the API key management workflows, and wrote UI copy to make critical actions and their
consequences explicit.

## Approach

- Tested the feature end-to-end to understand real user workflows
- Identified critical moments requiring warnings (creation, visibility, revocation)
- Wrote step-by-step instructions focused on safe execution
- Aligned wording between UI and documentation

## Key decisions

- Focused on risk-heavy actions rather than full feature coverage
- Made warnings explicit at the point of action
- Used real-world consequences (broken integrations) instead of abstract explanations
- Kept steps minimal to avoid overloading users

## What changed

- Users can create and revoke API keys without relying on support
- Critical actions are documented with explicit consequences before execution
- Documentation and UI use consistent terminology across the workflow

## Evidence

I did not have access to support-ticket or usage metrics. The evidence here is structural:

- End-to-end testing of creation and revocation flows
- Warnings placed at the moments where users make irreversible decisions
- Fewer handoffs in the workflow, as users are no longer directed to contact support for key management

## Takeaways

- Documentation must highlight risk, not just describe steps
- Warnings are part of the user experience, not an afterthought
- Aligning UI and documentation reduces user confusion
