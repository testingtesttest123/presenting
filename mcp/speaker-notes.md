# 1. MCP servers

Timing: 1 minute. MCP means Model Context Protocol. The audience is technical. The talk uses the July 2026 final specification. Deployed products can implement older versions. Allocate 45 minutes to the main material and 10 to 15 minutes to discussion. The appendix supports questions and implementation work.

Sources
https://modelcontextprotocol.io/specification/2026-07-28
https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning

# 2. Scope and evidence

Timing: 1 minute. Capitalized requirement words carry BCP 14 meanings. MUST is a requirement. SHOULD allows justified exceptions after considering consequences. MAY marks an option. A capability can be optional to implement while its rules become mandatory when implemented. Engineering recommendations in this deck are labeled separately. Security guidance cannot establish that a particular server complies.

Sources
https://modelcontextprotocol.io/specification/2026-07-28
https://modelcontextprotocol.io/specification/2026-07-28/basic

# 3. VS Code as an MCP host

Timing: 1.5 minutes. Product illustration, not a claim that every host behaves identically. VS Code coordinates the model and MCP clients. The model requests a tool operation; it does not itself open a connection to the MCP server. The host connects to configured processes on the execution host over stdio or remote servers over HTTP, discovers available tools and supplies enabled tools to the model. Workspace trust, server trust, OAuth authorization and per-action approval are different controls. Current documentation distinguishes Copilot and Local harness behavior. Workspace MCP configuration can inherit Workspace Trust rather than always showing a separate server-trust prompt. Product support must be checked separately from the latest protocol publication. VS Code 1.107 release notes document 2025-11-25 support. This conceptual illustration deliberately does not assert that the deployed product uses July 2026 server/discover or stateless requests. Model inference can run in a remote service. The box represents logical host integration, not physical deployment.

Sources
https://code.visualstudio.com/docs/agents/run/manage-mcp-servers
https://code.visualstudio.com/docs/agents/concepts/tools
https://code.visualstudio.com/updates/v1_107#_support-for-the-latest-mcp-specification

# 4. The protocol boundary

Timing: 1 minute. A shared protocol can remove bespoke host-to-service adapters. It does not make tool names or arguments interchangeable across vendors. The method and schema describe a contract; the implementation determines semantics. A server named search can query public documents or confidential records. The protocol name alone does not define access rights or data handling.

Sources
https://modelcontextprotocol.io/specification/2026-07-28
https://modelcontextprotocol.io/specification/2026-07-28/server
https://modelcontextprotocol.io/specification/2026-07-28/server/tools

# 5. Changes since November 2025

Timing: 2 minutes. Use November 2025 as the comparison baseline. Earlier 2025 releases had already changed HTTP and OAuth, so not every unfamiliar feature arrived in July 2026.

Before: the client ran initialize, agreed on protocol features and then made calls within that established context. Now: each request carries the protocol version and the client capabilities needed to interpret it. A different server instance can understand the next request without relying on the initialization exchange.

Protocol statelessness does not erase application state. An export job can still have a job identifier, and a shopping cart can still exist in a database. Those identifiers belong to the application and need normal authorization. They do not become login credentials.

The other major change concerns a server needing more input. Instead of making a separate callback request to the client, it returns an input-required result. The client gathers the input and sends another request.

Tasks move from experimental core functionality to an optional extension. Roots, sampling and logging are deprecated, not instantly removed. Check the actual versions used by the deployed host and server before changing an integration.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/changelog
https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning
https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http
https://modelcontextprotocol.io/specification/2026-07-28/client/roots
https://modelcontextprotocol.io/specification/2026-07-28/client/sampling

# 6. Version and capability metadata

Timing: 1.5 minutes. Before: initialize established a protocol version and a set of supported features for subsequent communication. After: every request declares its version and client capabilities in params._meta. A capability describes a feature the client can handle, such as a supported way to request user input.

Example: two calls to the same server both carry version metadata. The second call cannot assume the server remembers what the first call advertised. This makes request handling less dependent on a particular connection or server instance.

The server must implement server/discover. The client may use it to ask which versions and capabilities the server supports, but discovery is not a mandatory initialization handshake. If a request specifies an unsupported version, error -32022 lists supported versions. The client can select a shared version and retry.

A server's name and capabilities are self-reported metadata. They do not authenticate the server. Also, matching the protocol version does not guarantee that two tools called create_ticket have the same business meaning. Deployed clients may still require the legacy initialize flow.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning
https://modelcontextprotocol.io/specification/2026-07-28/server/discover

# 7. Capabilities and interaction

Timing: 1.5 minutes. The conventional labels model-controlled tools, application-controlled resources and user-controlled prompts describe interaction patterns. They do not grant authority. The tools specification does not mandate one user interface. The host can expose tools through a UI, a planner or generated code. Optional capabilities require explicit support. Roots and sampling belong in the migration discussion rather than a new implementation's default capability list.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/server
https://modelcontextprotocol.io/specification/2026-07-28/server/tools
https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation

# 8. Tool contracts

Timing: 1.5 minutes. Server validation must check structure and domain constraints. A schema can require an asset ID but cannot prove that the caller owns the asset. When outputSchema is supplied, the server must conform and the client should validate the output. Authorization-dependent tool lists help avoid exposing unavailable operations, but each invocation still needs authorization. Tool annotations are untrusted unless the server is trusted. Enforcement can delegate to the backing service's existing authorization policy. An MCP adapter does not need to duplicate that policy.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/server/tools

# 9. Copilot tool-call sequence

Timing: 1.5 minutes. Conceptual VS Code product flow. The user submits a task and context. The model can request an enabled tool with arguments. The host applies its current permissions and approval behavior, then invokes the MCP server. The server returns a tool result, which the host can include in context for a subsequent model step. Approval is conditional; an approval prompt is not guaranteed for every invocation or permission mode. The host remains responsible for orchestration and the server for executing its operation under applicable access controls. The server may use another API, with separate authorization. Trusting the configured server command, obtaining an OAuth grant and approving a particular operation are distinct actions. Protocol errors and execution failures still need interpretation; a received result is not necessarily business success. The sequence does not specify a current wire-level handshake because deployed VS Code protocol support must be verified independently.

Sources
https://code.visualstudio.com/docs/agents/concepts/tools
https://code.visualstudio.com/docs/agents/run/manage-mcp-servers
https://code.visualstudio.com/updates/v1_107
https://code.visualstudio.com/docs/agents/run/approvals

# 10. Standard transports

Timing: 1.5 minutes. Both transports carry UTF-8 JSON-RPC. Custom transports are allowed if they preserve required message patterns and metadata. A transport choice does not determine the full security model. A local server can have broad access to the host. A remote server can enforce narrow rights or expose overly broad ones. Compare the actual deployment and privilege set. SSE means server-sent events.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/basic/transports
https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/stdio
https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http
https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization

# 11. stdio transport

Timing: 1 minute. Embedded newlines cannot split a message. Request IDs correlate messages on the shared stream. Diagnostic text on stdout corrupts protocol framing. Local startup configuration deserves code-execution review because the server runs a command with inherited privileges and credentials. Credential delivery through the environment does not imply that all inherited environment variables should be exposed.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/stdio
https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization

# 12. Streamable HTTP

Timing: 2 minutes. SSE means Server-Sent Events, a format for streaming events in an HTTP response. It remains available. The change is how a stream begins and what it belongs to.

Before: a client could open a separate GET stream, use a protocol session identifier and resume events with Last-Event-ID. Now: each request uses POST. Its response is JSON or an SSE stream. A subscriptions/listen POST opens a long-lived response for requested change notifications.

Example: a host listens for a tool-list change through that subscription response. It does not open the former standalone GET channel. If the stream breaks, Last-Event-ID cannot resume it in this revision. Re-establish listening rather than assuming delivery continued.

For a write such as creating a ticket, a lost response does not prove that no ticket was created. Duplicate prevention is an application concern. An idempotency key lets repeated attempts refer to the same intended action.

The HTTP server must validate Origin and reject an invalid supplied Origin with 403. Origin validation helps protect local services from malicious browser origins. It does not authenticate a user.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http
https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions

# 13. Multi-round input flow

Timing: 2 minutes. MRTR means Multi Round-Trip Requests. It is a request, an input-needed result, and another request with that input.

Illustrative example: a client calls tools/call with tool name prepare_export and request ID 41. The server needs a date range. Instead of sending an independent elicitation/create callback, it returns resultType input_required and an inputRequests entry describing the question. The host obtains the user's answer through a supported interaction.

The client repeats prepare_export with a new request ID, for example 42. It includes inputResponses keyed to the requested input and copies the exact opaque requestState if the server supplied one. The client must return that value unchanged, without inspecting, parsing or modifying it. The server then completes the operation or requests more input.

This pattern applies to tools/call, resources/read and prompts/get. The server cannot require an unsupported client capability. A continuation value identifies workflow context, not ownership. If it affects authorization or business logic, the server must protect its integrity. Engineering guidance: continuation handling should avoid duplicating business effects already performed. A new JSON-RPC request ID is not an application idempotency key. The example names and IDs are illustrative, not a packet capture.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr

# 14. Optional capabilities and extensions

Timing: 1.5 minutes. An extension adds a feature outside the required core. Both sides must explicitly support it. Tasks, used to track work that continues beyond a simple immediate result, moved from experimental core functionality to an extension. An integration that used tasks must check extension support rather than assuming every MCP implementation offers them.

Deprecated means retained for compatibility but discouraged for new implementations. It does not mean an existing deployment stops working on the release date. Roots described locations the client exposed. Sampling let a server request model use through the client. Logging carried protocol log messages. The July release deprecates these features. Roots never enforced filesystem permissions.

Elicitation means asking for additional user input. A form can request ordinary data, such as a date range. Passwords, tokens and payment credentials must not go through that form. URL-mode elicitation directs the user to a separate website, with domain display and navigation consent. That provider interaction is separate from OAuth protecting the MCP endpoint.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation
https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning
https://modelcontextprotocol.io/specification/2026-07-28/client/roots
https://modelcontextprotocol.io/specification/2026-07-28/client/sampling

# 15. Authentication and authorization

Timing: 2 minutes. Authentication establishes an identity or possession of a credential. Authorization determines permitted operations. OAuth is an authorization framework; OIDC adds an identity layer. A valid token does not prove that the user intended the submitted arguments. Client authentication and human authentication are distinct. Public clients cannot keep a client secret as a reliable confidential credential. Scope approval does not eliminate resource-policy checks, which can remain in the existing backing service. OIDC means OpenID Connect.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization
https://openid.net/specs/openid-connect-core-1_0.html

# 16. Separate authorization relationships

Timing: 1.5 minutes. OAuth at the first boundary protects the MCP endpoint. The MCP client presents token A, intended for the MCP resource. The MCP server validates that token and its granted access. The backing API is a separate protected resource. Token B, or another suitable integration credential, belongs to that relationship. Token A must not be forwarded to the backing resource. Exchange of A at a trusted authorization server for B is different from passing A to the resource. MCP does not prescribe one universal downstream architecture. Provider OAuth, token exchange, workload identity and API keys have different authority. The adapter need not become an identity provider or duplicate backing-service business policy. The authorization server can be existing infrastructure. The following diagrams show implementation choices, not additional MCP requirements.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization
https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security-considerations#access-token-privilege-restriction

# 17. Authorization-code request flow

Timing: 2 minutes. The client obtains protected-resource metadata using RFC 9728 and supports the well-known fallback. Authorization-server metadata uses RFC 8414 or OIDC discovery, with exact issuer validation. The client chooses or establishes registration before browser authorization. The code exchange includes the verifier and resource. The bearer token goes in the Authorization header on each protected request. The server separately obtains suitable credentials for any upstream API. The flow uses POST; old GET examples do not describe the July transport. PKCE means Proof Key for Code Exchange. The client validates the authorization response issuer before redeeming the code. Missing issuer information is rejected when issuer support was advertised. Walk through a concrete failure: the client requests access to mcp.example but receives a token intended for api.example. The MCP server rejects it even if the signature and expiry are valid. Audience restriction prevents one resource from accepting a token issued for another. Then distinguish insufficient scope from a cross-tenant object request. A broad scope such as assets.read can permit the operation category while the existing resource policy still denies a particular asset. Ask which component can establish the user identity, which can validate the access token and which owns the tenant database. The authorization server cannot usually decide object ownership from the OAuth request alone. Finally, show the point at which prompt injection remains possible: authorized inventory content is returned after successful OAuth and can still contain malicious instructions.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization
https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/authorization-server-discovery
https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security-considerations

# 18. User-connected provider OAuth

Timing: 1.5 minutes. Implementation pattern. The user completes a separate provider authorization flow. A protected callback associates the connection with the correct application user and provider account. A credential store retains provider access and refresh tokens. On a tool call, the MCP service selects an authorized connection and obtains token B for the provider API. Token A does not itself create or authorize every provider connection. Auth0 Token Vault is one concrete implementation. External connections remain per user even when organization context is present. AWS documents session binding to prevent another user from completing a connection under the wrong application identity. Keep tokens out of model context. Handle expiry, revoked consent, partial scopes and refresh failure. Do not silently fall back to broader service credentials. Existing provider policy governs permitted operations.

Sources
https://auth0.com/docs/secure/call-apis-on-users-behalf/token-vault
https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/oauth2-authorization-url-session-binding.html
https://developers.google.com/identity/protocols/oauth2/resources/best-practices
https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation#url-mode-elicitation-for-oauth-flows

# 19. On-behalf-of token exchange

Timing: 1.5 minutes. Implementation pattern. MCP service/API A receives token A intended for it. It authenticates to the authorization server's token endpoint and presents the required assertion or subject token. That server issues token B for API B under its policy and consent requirements. API A calls API B with B. This is not forwarding A to API B. Microsoft Entra on-behalf-of flow carries delegated user permissions and differs from application-only client credentials. Its wire protocol is not identical to RFC 8693. RFC 8693 defines general exchange with subject token, optional actor token, resource or audience and scopes. Delegation or impersonation depends on the exchange semantics. Providers need explicit support. Revoking the input does not automatically revoke every resulting token. The issuer and resource-validation design determine that behavior.

Sources
https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-on-behalf-of-flow
https://www.rfc-editor.org/rfc/rfc8693.html
https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security-considerations#access-token-privilege-restriction

# 20. Tools specification responsibilities

Timing: 2 minutes. These are requirement levels from the tools specification, not a claim that every implementation complies. The operation must remain subject to the application's existing authorization policy. The MCP adapter can delegate the decision to a backing API or authorization service. Host confirmation is a separate control. Sanitization reduces known output hazards but cannot prove that arbitrary natural-language output is free of prompt injection. Audit records should preserve useful evidence without exposing tokens or unnecessary personal data. The SHOULD statements are normative recommendations in the specification, rather than optional commentary from a tutorial. Server developers preserve the existing permission model through verified caller context and appropriately scoped credentials. This division of responsibility is ordinary protocol design. The specification does not prescribe one tenant model or business policy.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/server/tools

# 21. Threat paths

Timing: 2 minutes. OAuth protects access but cannot make retrieved instructions trustworthy. Prompt injection can persuade a model to misuse otherwise valid authority. SSRF appears in discovery and client metadata fetches. A confused deputy can misuse the server's upstream authority. Workflow state requires authorization on every request, even when the handle is hard to guess. The controls are architectural recommendations grounded in the security tutorial; they are not automatically installed by adopting MCP. Walk through a hypothetical inventory record whose description says to export credentials. The description is data from a tool result. It is not a new instruction from the user. The host must preserve that distinction, and the server must preserve denial of unauthorized credential access even if the model requests it. Next, consider metadata containing a URL that redirects to an internal address. A check on only the original hostname does not constrain the final destination. The implementation needs redirect and DNS-aware egress controls. Finally, replace a workflow handle with another user's handle. A random identifier can reduce guessing but cannot replace a principal check. These examples exercise separate boundaries. No single input sanitizer, token check or confirmation dialog establishes all of them. Source classification matters. The official security tutorial explains attack paths and mitigations. The MRTR specification separately requires integrity protection for requestState when it affects authorization, access control or business logic. Recommended implementation controls should not be mislabeled as universal core MUST requirements.

Sources
https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices
https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr

# 22. Workload or service authority

Timing: 1.5 minutes. Implementation pattern. The inbound request uses MCP authorization. The outbound request uses workload identity, an application token or another server-held credential. The backing API sees service authority unless the integration explicitly represents delegated-user authority. Client credentials do not automatically carry the human caller's permissions. Existing application authorization or a gateway constrains caller operations when the outbound credential is broader. The MCP adapter need not duplicate domain policy. Microsoft documents certificates and federation as alternatives to shared secrets. Google Workload Identity Federation can obtain short-lived credentials without service-account keys. AWS documents outbound modes and identifies a shared execution role as an upper bound requiring caller-to-target policy. An API key usually conveys its configured account or project's authority, not standard user delegation. Keep credentials outside generated code and model context where feasible.

Sources
https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-client-creds-grant-flow
https://docs.cloud.google.com/iam/docs/workload-identity-federation
https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway-outbound-auth.html

# 23. Scripts, Python and MCP

Timing: 2 minutes. A REPL is a read-evaluate-print loop and execution environment. MCP is an integration protocol. A Python program can call MCP. A script can expose an MCP adapter. The choice is not exclusive. Compare equivalent privilege sets and deployment controls. A hardened MCP server should not be compared with an unrestricted shell as if the difference were caused by serialization. Each design needs credential handling, authorization and observability.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/server/tools
https://www.anthropic.com/research/code-execution-with-mcp
https://blog.cloudflare.com/code-mode/

# 24. Composition and intermediate data

Timing: 1.5 minutes. A direct tool loop can expose many intermediate results to the model if the host is designed that way. MCP does not require that design. Code can filter or aggregate results before returning a summary. This can reduce context usage in suitable workloads, but there is no universal speed or token reduction. Runtime startup, API latency, caching, model turns and failure recovery all affect the outcome. Stateful REPLs also create reproducibility and hidden-state costs.

Sources
https://www.anthropic.com/research/code-execution-with-mcp
https://blog.cloudflare.com/code-mode/

# 25. Example: remediation ticket preparation

Timing: 2 minutes. This is an illustrative workflow, not a benchmark. A script can import inventory and advisory libraries. A direct MCP workflow can call inventory.list, advisory.lookup and tickets.create. A hybrid can call MCP wrappers from Python and join the results locally. The same authorization and evidence requirements apply. The write is separated from analysis so that an accidental or injected recommendation does not automatically create tickets. Discuss where the inventory snapshot and findings should be retained. Use one example asset: asset-17 belongs to team-a and reports package p at version v. The correlation step joins the inventory snapshot to the applicable advisory range and retains the snapshot time, asset ID, package version and advisory ID. Those fields make the recommendation reviewable. Introduce a second asset with missing version data. The workflow should report uncertainty rather than classify it as vulnerable or safe without evidence. Introduce a stale snapshot and discuss whether a fresh read is required before ticket creation. The same cases apply to script, direct MCP and hybrid implementations. Compare the intermediate data sent to the model, the number of upstream calls and the behavior after partial failure. A ticket write that times out may already have succeeded. The implementation needs a deduplication key or reconciliation query before retrying.

Sources
https://www.anthropic.com/research/code-execution-with-mcp
https://blog.cloudflare.com/code-mode/

# 26. Nested tool authorization

Timing: 2 minutes. Approval of execute_python does not necessarily authorize every nested write. The execution environment must route privileged operations through an enforcement point that the code cannot bypass. Keep secrets outside generated code where practical. The broker and server apply different controls: the broker enforces the host's workflow policy, while the server enforces its resource policy. This architecture is an example, not a built-in MCP feature. It introduces another component to operate and test. Trace a hypothetical create-ticket call from generated Python to the broker and then to the server. The broker can restrict the project to SEC and require an approval record for the exact proposed findings. The server validates the arguments and verifies, directly or through the backing service, that the authenticated principal can create tickets in that project. The upstream API applies its credential permissions. Now remove the broker restriction while leaving server authorization intact. The server may still permit an unwanted but authorized write. Next, give Python the upstream bearer token and general network access. The code can call the API without the broker, so the host's approval gate no longer controls the write. These cases distinguish security against unauthorized callers from control over delegated agent behavior. Test both paths rather than checking only that the nominal broker route works. The MCP adapter can rely on the backing service for object-level decisions. It need not implement a second policy engine. A broad service credential that loses the caller's delegated restrictions would require additional enforcement or a different credential design.

Sources
https://blog.cloudflare.com/code-mode/
https://modelcontextprotocol.io/specification/2026-07-28/server/tools

# 27. Architecture selection

Timing: 1.5 minutes. This is an engineering assessment. MCP introduces schema maintenance, version compatibility and deployment responsibilities. Scripts introduce runtime and dependency conventions. Hybrid designs combine those costs as well as benefits. Test task success, latency, context usage, authorization enforcement and operational burden. The decision should follow measured requirements rather than a protocol preference.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/server/tools
https://www.anthropic.com/research/code-execution-with-mcp

# 28. Implementation review

Timing: 1.5 minutes. Begin with a version matrix rather than assuming every host has upgraded. Test capabilities that the server advertises, unsupported versions and legacy fallback. Include business failures within successful envelopes. For writes, verify application-level idempotency or reconciliation. Test cross-tenant object IDs and state-handle reuse. Confirm that logs do not expose tokens. Validate that isolation and approvals work when code calls tools indirectly.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning
https://modelcontextprotocol.io/specification/2026-07-28/server/tools
https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr

# 29. Discussion

Timing: 10 to 15 minutes. Main presentation target is approximately 45 minutes, with discussion extending the session to 55 to 60 minutes. Use the appendix for exact version history and source lookup. Distinguish confirmed protocol requirements from local implementation choices in answers. Do not infer product support from publication of a specification.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning

# 30. Appendix: 2025 release sequence

Reference slide. Name the baseline before saying what changed.

March 2025: Streamable HTTP replaced the older HTTP+SSE transport, and the OAuth authorization framework appeared. JSON-RPC, meaning JSON Remote Procedure Call, batching also appeared. June removed batching.

June 2025: structured tool output made machine-readable results more explicit. Elicitation added requests for user input. The authorization design treated the MCP server as an OAuth protected resource and added resource metadata and resource indicators. The MCP server did not thereby become the authorization server.

November 2025: URL-mode elicitation, experimental tasks and recommended Client ID Metadata Documents appeared. OpenID Connect discovery and incremental scope consent also arrived.

July 2026: request metadata replaces the initialize-based context. Multi Round-Trip Requests replace independent server callbacks. Subscriptions use POST-response streams. Tasks become an extension. Roots, sampling and logging become deprecated.

Practical reading rule: a tutorial written for November 2025 can describe a valid deployed integration while using wire behavior absent from the July 2026 core. Match implementation guidance to the negotiated or requested version.

Sources
https://modelcontextprotocol.io/specification/2025-03-26/changelog
https://modelcontextprotocol.io/specification/2025-06-18/changelog
https://modelcontextprotocol.io/specification/2025-11-25/changelog
https://modelcontextprotocol.io/specification/2026-07-28/changelog

# 31. Appendix: authorization extensions

Reference slide. These optional extensions address different identity and administration requirements. Client Credentials does not imply delegated human authority. Enterprise-managed authorization adds an identity-provider-mediated flow. Avoid describing enterprise policy changes as guaranteed instantaneous invalidation of every issued bearer token. Verify the deployed authorization server, token lifetime and validation mechanism. ID-JAG means Identity Assertion JWT Authorization Grant.

Sources
https://modelcontextprotocol.io/extensions/auth/oauth-client-credentials
https://modelcontextprotocol.io/extensions/auth/enterprise-managed-authorization

# 32. Appendix: primary source map

Sources were checked on 21 October 2026. Each substantive slide includes direct source URLs in its speaker notes. Dedicated normative pages take precedence over stale overview wording. The overview still contains an initialization reference that conflicts with the dedicated current versioning page. The authorization tutorial includes a GET example that does not match the current POST binding. The presentation follows the detailed current versioning and transport requirements. Vendor engineering articles support examples, not universal benchmark claims.

Sources
https://modelcontextprotocol.io/specification/2026-07-28
https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning
https://modelcontextprotocol.io/specification/2026-07-28/basic/transports
https://modelcontextprotocol.io/specification/2026-07-28/server/tools
https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization
https://www.anthropic.com/research/code-execution-with-mcp
https://blog.cloudflare.com/code-mode/

# 33. Appendix: HTTP request headers

Illustrative HTTP headers, not a packet capture. HTTP content-length and framing are omitted. The endpoint is unprotected for this demonstration. A protected endpoint also requires Authorization: Bearer <access-token>. Header names are case-insensitive. The protocol version must match the body metadata. Mcp-Method is required on requests. Mcp-Name is required for tools/call, resources/read and prompts/get. The JSON body is authoritative. The client accepts both JSON and SSE even when this response uses JSON.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http

# 34. Appendix: JSON-RPC request body

Illustrative request. The example assumes an advertised get_weather tool accepting a location string, with no extra x-mcp-header parameters or outputSchema. The full namespaced metadata keys are required. clientInfo is recommended but omitted from this minimal request. It can be supplied under io.modelcontextprotocol/clientInfo with a name and version. The example does not make a real weather request. Missing required metadata produces an invalid-parameters error. This example is specific to 2026-07-28 rather than a legacy initialized session.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/basic
https://modelcontextprotocol.io/specification/2026-07-28/server/tools

# 35. Appendix: completed tool result

Illustrative JSON response with Content-Type: application/json. The request ID correlates the result with the call. The weather data is invented. The example tool has no outputSchema. serverInfo is recommended but omitted from this minimal response. A tool failure can instead return isError true. An input-required result would use the multi-round pattern. The caller must distinguish completion from business success and validate any structured result against an advertised outputSchema.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/basic
https://modelcontextprotocol.io/specification/2026-07-28/server/tools

# 36. Appendix: hybrid workflow pseudocode

Illustrative pseudocode, not executable SDK code. The inventory, advisory and ticket bindings can call MCP or another service interface. correlate is deterministic domain logic. approved_findings represents a broker-verified approval record, not an untrusted variable name that code can set to grant itself authority. The broker binds approval to the intended operation and arguments. The execution environment has no direct upstream credential or alternative network path that bypasses policy. In production the implementation must handle pagination, missing versions, partial failures and write deduplication.

Sources
https://www.anthropic.com/research/code-execution-with-mcp
https://blog.cloudflare.com/code-mode/

# 37. Appendix: security requirement sources

This table separates source authority from implementation ownership. The dated tools specification requires input validation, access controls, rate limiting and output sanitization. The HTTP binding requires Origin validation; localhost binding and proper authentication are SHOULD requirements. The OAuth profile is optional overall, with applicability defined for HTTP implementations that support authorization. Its token and discovery requirements apply when that profile is used. Official security guidance explains attacks and recommended mitigations. Application and deployment controls define resource-specific permissions, network policy, secret handling, retention and operational thresholds. The same component can have both protocol obligations and local configuration responsibilities. This is a responsibility allocation, not a claim that a protocol should prescribe every business rule. Guidance can discuss the same control as a normative page. Classify each rule by its source and scope. For example, the authorization security specification requires per-client consent for the specified static-client-ID proxy scenario; that is a conditional requirement, not merely a general recommendation.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/server/tools#security-considerations
https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http#security--endpoint
https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization
https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices
https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security-considerations

# 38. Appendix: enforcement responsibilities

The roles can be operated by one organization or several. The host/client applies the tools specification's SHOULD recommendations and client authorization requirements when applicable. The MCP resource server consumes OAuth authorization, validates tokens for its resource and preserves the caller's delegated access. Existing authorization services and backing APIs can make object and business-policy decisions. The adapter does not need to own identity management or duplicate those policies. It must not forward the inbound MCP token to an upstream API. It uses an appropriate separate upstream token or other authorized credential arrangement. The authorization server owns token issuance and its OAuth responsibilities. The upstream API enforces its resource policy. The operator configures allowed origins and listeners. The HTTP server implementation validates Origin. The operator also configures isolation, secret handling and network access. A broad service credential that discards caller restrictions can bypass existing policy; the adapter must preserve delegation or enforce equivalent constraints. Host confirmation cannot override denial from the authoritative resource policy. The tools specification's client audit SHOULD is not a universal server audit MUST.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/server/tools#security-considerations
https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization
https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security-considerations
https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http

# 39. Appendix: object authorization example

Illustrative application policy. Assume the access token permits assets.delete and represents a caller in tenant A. The MCP resource server validates the intended token and the tool input. The adapter invokes the backing service with authorized caller context and a suitable separate credential. The backing service applies its existing object policy. It denies deletion of tenant B's asset, or an asset for which the caller has only read access. The adapter need not maintain another tenant database or reimplement that policy. It must avoid turning the request into a global-admin operation that discards the caller's restrictions. The MCP access-control requirement still applies when enforcement is delegated. The host may require sensitive-action confirmation, but confirmation cannot override resource policy. Tests should establish that permitted operations work and denied object/action combinations remain denied through the adapter. Invalid token, malformed input, backing-policy denial and partial upstream failure are distinct failure paths. Responses should preserve those distinctions without exposing unnecessary object details.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/server/tools#security-considerations
https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization
https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security-considerations

# 40. Appendix: discovery and registration

Reference slide. Registration tells an OAuth authorization server about client software. Discovery tells the client where the authorization server and its endpoints are. Neither is the MCP tool-discovery method.

The current order is to use an existing registration when available, otherwise use advertised Client ID Metadata Documents, with Dynamic Client Registration as a deprecated compatibility option. CIMD means Client ID Metadata Document. It lets an authorization server retrieve client metadata through the client's HTTPS identifier. DCR means Dynamic Client Registration. It creates a registration through a registration endpoint.

CIMD was already recommended in November 2025. Do not present its existence as a wholly new July 2026 feature. The current lifecycle and fallback guidance matter when supporting older deployments.

For implementers, metadata fetching is an HTTP security surface. Validate destinations and issuer relationships. SSRF means server-side request forgery, where attacker-controlled URLs cause a service to fetch an unintended destination. A client identifier is not a secret or proof that the software is trustworthy.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/client-registration
https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/authorization-server-discovery
https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices

# 41. Appendix: token requirements

Reference slide. OAuth protects the MCP resource through an access token intended for that resource. The resource parameter names that target during authorization and token requests. The MCP server checks the token's intended audience. Invalid or expired tokens result in 401. Insufficient permission results in 403.

PKCE means Proof Key for Code Exchange. The client creates a secret verifier and a derived challenge before browser authorization. Redeeming the code requires the verifier, which limits interception attacks. S256 identifies the SHA-256 challenge method. Secure storage and appropriate refresh-token rotation remain necessary.

The current authorization response checks also bind the browser response to the authorization server selected earlier. If the response includes iss, meaning issuer, the client must validate it before redeeming the code. If issuer-response support was advertised, a missing iss must cause rejection. Example: a code returned with issuer B must not be redeemed as if it came from selected issuer A.

These are requirements within the HTTP authorization profile, not a statement that every MCP deployment must use OAuth. Downstream API authorization remains separate.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization
https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security-considerations
https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/authorization-server-discovery

# 42. Appendix: local server deployment

Timing: 1 minute. A local MCP server can execute before any tool is called. Reviewing tool names alone misses installer, startup and dependency behavior. Process isolation, resource limits and least privilege are deployment controls. A server that accepts a narrow tool call can still hold a broad upstream credential. Reduce those privileges at the service or API boundary. These are engineering recommendations, not additional protocol guarantees.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/stdio
https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices

# 43. Appendix: downstream credential choices

Implementation patterns, not mandated MCP downstream modes. A broker or gateway can implement these modes; it is infrastructure rather than an authority model. Select credentials using trusted user, tenant, provider and account context. Token A does not grant use of every stored connection. Coordinate refresh rotation, remove unnecessary credentials and handle revocation. Provider support determines whether delegated exchange is possible. API-key semantics are provider-specific. No market-prevalence or benchmark claim is made. MCP's no-passthrough rule still applies if a product offers passthrough for a different non-MCP target type.

Sources
https://auth0.com/docs/secure/call-apis-on-users-behalf/token-vault
https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-on-behalf-of-flow
https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway-outbound-auth.html
https://www.rfc-editor.org/rfc/rfc8693.html

# 44. Appendix: result and failure handling

Timing: 1.5 minutes. Separate transport failure, protocol failure and business failure. HTTP errors can occur before a JSON-RPC response. JSON-RPC errors describe protocol-level failure. Tool execution failures are represented in tool results with isError true. The caller must inspect the result rather than treating a received response as a successful operation. Error handling must avoid leaking sensitive implementation details. A timeout does not prove that a write had no effect; application-level idempotency remains a separate design concern.

Sources
https://modelcontextprotocol.io/specification/2026-07-28/basic
https://modelcontextprotocol.io/specification/2026-07-28/server/tools
