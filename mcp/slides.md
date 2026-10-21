# 1. MCP servers

Protocol, transports and authorization
Technical briefing • 21 October 2026
Specification baseline: 2026-07-28


# 2. Scope and evidence

- Protocol requirements use MUST, SHOULD and MAY.
- Design assessments identify implementation trade-offs.
- Examples illustrate behavior. They are not benchmarks.
- The comparison baseline is 2025-11-25.


# 3. VS Code as an MCP host



Editable diagram `vscode`: see build.mjs for complete labeled shapes and arrows.

# 4. The protocol boundary

- Standard messages describe discovery and invocation.
- Servers can expose tools, resources and prompts.
- Domain semantics remain the implementation's responsibility.
- MCP does not provide a runtime or a sandbox.


# 5. Changes since November 2025

| Area | 2025-11-25 | 2026-07-28 |
| --- | --- | --- |
| Lifecycle | initialize and session context | Self-contained requests |
| HTTP | GET stream and optional sessions | POST request/response streams |
| Server requests | Independent callbacks | Multi-round input results |
| Features | Sampling, roots, logging | Deprecated; new code should avoid |
| Tasks | Experimental core feature | Optional extension |


# 6. Version and capability metadata

- Each request carries protocolVersion and clientCapabilities.
- server/discover reports supported versions and capabilities.
- Unsupported versions produce error -32022.
- Discovery metadata is self-reported, not verified identity.


# 7. Capabilities and interaction

| Capability | Methods | Typical use |
| --- | --- | --- |
| Tools | tools/list; tools/call | Invoke a domain operation |
| Resources | resources/list; resources/read | Read contextual content |
| Prompts | prompts/list; prompts/get | Retrieve a prompt template |
| Elicitation | InputRequiredResult | Request user input |


# 8. Tool contracts

- inputSchema defines accepted argument structure.
- outputSchema is optional; structured results must conform.
- Discovery can vary with request authorization.
- Schemas do not establish object-level authorization.


# 9. Copilot tool-call sequence



Editable diagram `toolflow`: see build.mjs for complete labeled shapes and arrows.

# 10. Standard transports

| Property | stdio | Streamable HTTP |
| --- | --- | --- |
| Deployment | Client-launched process | HTTP service endpoint |
| Framing | One JSON message per line | JSON or SSE response |
| Credentials | Process-supplied credentials | OAuth profile when supported |
| Primary concern | Host privileges and package trust | Network exposure and token policy |


# 11. stdio transport

- The client launches the server process.
- stdin and stdout carry newline-delimited JSON-RPC.
- stdout must contain only protocol messages.
- stderr can carry logs; output there is not itself failure.


# 12. Streamable HTTP

- A single endpoint accepts each request through POST.
- The client accepts application/json and text/event-stream.
- SSE can frame a response; it is not a separate current transport.
- The current core has no GET stream or protocol session.


# 13. Multi-round input flow

- Client sends a domain request.
- Server returns input_required with permitted input requests.
- Host obtains input through the supported interaction.
- Client repeats the request with inputResponses and requestState.


# 14. Optional capabilities and extensions

- Elicitation supports forms and URL-based interaction.
- Forms must not collect passwords, tokens or payment credentials.
- Tasks and MCP Apps are optional extensions.
- Roots and sampling are deprecated in the July release.


# 15. Authentication and authorization

| Question | Mechanism or policy |
| --- | --- |
| Who logged in? | Human authentication, often OIDC |
| Which software is acting? | OAuth client authentication, when applicable |
| What access was delegated? | Resource-bound token and scopes |
| Is this object accessible? | Server action, object and tenant policy |
| Was this action intended? | Host interaction and approval policy |


# 16. Separate authorization relationships



Editable diagram `boundaries`: see build.mjs for complete labeled shapes and arrows.

# 17. Authorization-code request flow

- 1  Client POST receives 401 and resource metadata location.
- 2  Client discovers the resource's authorization server.
- 3  Browser authorization code flow uses PKCE and resource.
- 4  Client retries with an MCP access token.
- 5  Server validates the token and authorizes the operation.


# 18. User-connected provider OAuth



Editable diagram `vault`: see build.mjs for complete labeled shapes and arrows.

# 19. On-behalf-of token exchange



Editable diagram `exchange`: see build.mjs for complete labeled shapes and arrows.

# 20. Tools specification responsibilities

| Server requirements: MUST | Client requirements: SHOULD |
| --- | --- |
| Validate tool inputs | Display inputs before calls |
| Enforce access controls | Request confirmation for sensitive calls |
| Apply rate limits | Validate results and apply timeouts |
| Sanitize tool outputs | Record tool use for audit |


# 21. Threat paths

| Input or boundary | Failure | Implementation control |
| --- | --- | --- |
| Tool text or results | Prompt injection | Treat content as untrusted |
| Metadata fetch | SSRF | Constrain egress and redirects |
| Proxy consent | Confused deputy | Bind consent to client |
| Workflow handle | Cross-user access | Bind state to principal |
| Bearer token | Unauthorized reuse | Protect, scope and expire |


# 22. Workload or service authority



Editable diagram `service`: see build.mjs for complete labeled shapes and arrows.

# 23. Scripts, Python and MCP

| Dimension | Scripts or Python REPL | MCP interface |
| --- | --- | --- |
| Contract | Library or CLI conventions | Standard discovery and schemas |
| Composition | Loops and joins in code | Host controls orchestration |
| Portability | Runtime and packages | Wire contract across languages |
| Security | Deployment and operation policy | Deployment and operation policy |


# 24. Composition and intermediate data

- Scripts support loops, joins, batching and local state.
- Code can invoke MCP tools through restricted bindings.
- Intermediate rows can remain outside model context.
- Measure end-to-end behavior under equivalent privileges.


# 25. Example: remediation ticket preparation

- Read an authorized asset inventory snapshot.
- Retrieve advisories and correlate versions in code.
- Retain asset IDs and evidence for review.
- Create tickets through a separately authorized write.


# 26. Nested tool authorization

- Generated code calls an allowlisted broker.
- The broker checks arguments, egress and write approvals.
- The MCP server enforces caller and object authorization.
- Direct credentials or unrestricted HTTP can bypass the broker.


# 27. Architecture selection

- Keep existing scripts for a bounded workflow that already works.
- Add MCP for a shared, discoverable host-to-service interface.
- Add code orchestration for joins and large intermediate data.
- Keep domain logic testable behind thin adapters.


# 28. Implementation review

- Pin supported protocol versions and optional capabilities.
- Test errors, retries, duplicate writes and malformed input.
- Test caller, object and tenant authorization independently.
- Audit package trust, secrets, egress and retention.


# 29. Discussion

- Which clients and protocol versions are deployed?
- Which operations need shared discovery?
- Where are object authorization and write approval enforced?
- Which measurements would justify a migration?


# 30. Appendix: 2025 release sequence

| Release | Selected changes |
| --- | --- |
| 2025-03-26 | Streamable HTTP replaces HTTP+SSE; OAuth framework |
| 2025-06-18 | Structured output; elicitation; OAuth resource-server model |
| 2025-11-25 | URL elicitation; experimental tasks; CIMD recommendation |
| 2026-07-28 | Stateless core; MRTR; subscriptions; feature deprecations |


# 31. Appendix: authorization extensions

- Client Credentials supports application identity without user interaction.
- Enterprise-Managed Authorization uses an IdP-issued ID-JAG.
- Both require explicit support; neither is a core default.
- Token validity and enforcement determine revocation behavior.


# 32. Appendix: primary source map

- Dated specification: modelcontextprotocol.io/specification/2026-07-28
- Versioning, transports, tools and authorization define core behavior.
- Dated changelogs establish the 2025 and 2026 deltas.
- Anthropic and Cloudflare articles describe code-orchestration patterns.


# 33. Appendix: HTTP request headers

```
POST /mcp HTTP/1.1
Host: example.com
Content-Type: application/json
Accept: application/json, text/event-stream
MCP-Protocol-Version: 2026-07-28
Mcp-Method: tools/call
Mcp-Name: get_weather
```


# 34. Appendix: JSON-RPC request body

```
{
  "jsonrpc": "2.0", "id": 1, "method": "tools/call",
  "params": {
    "name": "get_weather",
    "arguments": {"location": "Seattle, WA"},
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientCapabilities": {}
    }
  }
}
```


# 35. Appendix: completed tool result

```
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "resultType": "complete",
    "content": [{
      "type": "text",
      "text": "Example weather: 18 C."
    }],
    "isError": false
  }
}
```


# 36. Appendix: hybrid workflow pseudocode

```
assets = await inventory.list(scope="team-a")
advisory_rows = await advisory.lookup(packages_in(assets))
findings = correlate(assets, advisory_rows)
print(summarize(findings))

# Separate write through the policy broker:
await tickets.create(
    project="SEC", findings=approved_findings
)
```


# 37. Appendix: security requirement sources

| Source class | Examples | Implementation responsibility |
| --- | --- | --- |
| Core specification | Input checks; access control; limits | Server implements MUST rules |
| Transport and auth profile | Origin; token audience; PKCE | Apply rules for chosen binding |
| Official security guidance | SSRF; deputy; injection analysis | Assess relevant attack paths |
| Application and deployment | Tenant policy; egress; retention | Developer and operator configure |


# 38. Appendix: enforcement responsibilities

| Actor | Enforcement responsibility |
| --- | --- |
| Host and client | Input display, sensitive-action confirmation, PKCE |
| MCP server developer | Token validation and preserved delegated access |
| Authorization server | Token issuance, redirect checks, refresh handling |
| Upstream API | Its resource policy and separate credentials |
| Deployment operator | Origins, listeners, isolation, secrets, egress |


# 39. Appendix: object authorization example

- Caller has a valid token for the MCP server.
- delete_asset(asset_id="asset-42") satisfies the input schema.
- The backing service authorizes deletion of asset-42 for this caller.
- A different tenant's asset remains inaccessible.


# 40. Appendix: discovery and registration

- Use existing registration when available.
- Prefer advertised Client ID Metadata Documents.
- Dynamic Client Registration is a deprecated fallback.
- Client identifiers do not establish trust by themselves.


# 41. Appendix: token requirements

- Use resource indicators in authorization and token requests.
- Validate tokens for the intended MCP resource.
- Use bearer headers, never token query parameters.
- Use PKCE, secure storage and appropriate refresh rotation.


# 42. Appendix: local server deployment

- A configured startup command executes host code.
- Package provenance and dependency pinning need review.
- Limit inherited credentials, filesystem access and egress.
- Tool schemas cannot constrain code outside the tool handler.


# 43. Appendix: downstream credential choices

| Pattern | Authority at backing API | Credential handling |
| --- | --- | --- |
| Provider OAuth | Connected user and grant | Stored provider token |
| OBO / token exchange | Exchange-defined delegation | Resource-specific token B |
| Workload identity | Service or application | Short-lived workload token |
| API key | Configured account or project | Server-held key |


# 44. Appendix: result and failure handling

- A request identifies a method and arguments.
- A result can complete or request more input.
- Protocol errors differ from tool execution errors.
- A successful JSON-RPC envelope can contain isError: true.

