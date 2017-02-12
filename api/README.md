### API Clean Architecture

# Adapters

Handles IO between the API Core and various application clients, such as HTTPS, WS, XMPP, SOAP etc etc.

# Core

Use cases interactors separated by commands and queries. Adapters etc will only need to require the executor to run use case interactors. Must only depend on the domain. All logic/implementation dependencies are injected by their caller (usually from code in the adapters, like a controller).  Easy to TDD and keep under 100% unit testing.

# Domain

JavaScript implementation of our domain (team, groups, playlist etc) and defined by plain object schema and provides composable/flexible data validation.  Must only depend on domain validation library.  Must be written in plain ES5 as this lib is isomorphic. Easy to TDD and keep under 100% unit testing as well.

# Lib

General helper functions (like authorization, config, errors etc) that aren't specific to any one service or domain.

# Persistence

Handles all database IO and provides an abstraction over all datastores - no specific knowledge of any database should leave this boundary.  Only depends on databases and should only be used by services and not require any services.

# Services

Provides a facade over the domain via the repository and should contain simple and composable logic to be used by use case interactors.

# External

All libraries related to external services (email, APN notifications, etc)

# Test

Test helper scripts like DB cleanup
