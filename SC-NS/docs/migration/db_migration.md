# Database Migration Plan: Convex to PostgreSQL
This document outlines the plan for a future migration from Convex to a self-hosted PostgreSQL database with the `pgvector` extension.

## Rationale
While Convex provides an excellent real-time backend for rapid development, a self-hosted PostgreSQL instance offers greater control, scalability, and the ability to use specialized extensions like `pgvector` for advanced AI-powered features like semantic search. This plan prepares for that future transition.

## Schema Mapping
The following section details the PostgreSQL schema and how it maps to the original Convex schema.

### `users` Table
Maps to the `users` table in Convex.

**PostgreSQL DDL:**
```
sql

CREATE TABLE users (    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),    external_id VARCHAR(255) UNIQUE NOT NULL, -- Clerk User ID    email VARCHAR(255) UNIQUE NOT NULL,    full_name VARCHAR(255),    image_url TEXT,    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());CREATE INDEX idx_users_external_id ON users(external_id);
```
**Mapping & Rationale:**-   
`id`: A standard `UUID` primary key.-   `external_id`: Maps to `clerkId` in Convex. This stores the immutable user ID from the Clerk authentication service. An index is created for fast lookups.-   
`created_at`: Uses `TIMESTAMPTZ` for timezone-aware timestamps.

### `chat_sessions` Table
Maps to the `chat_sessions` table in Convex.

**PostgreSQL DDL:**
```
sql

CREATE TABLE chat_sessions (    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,    title VARCHAR(255) NOT NULL,    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());CREATE INDEX idx_chat_sessions_user_id ON chat_sessions(user_id);

```

**Mapping & Rationale:**-   
`user_id`: A foreign key to `users.id`, ensuring referential integrity. 
`ON DELETE CASCADE` automatically cleans up sessions if a user is deleted.### `messages` TableMaps to the `messages` table in Convex.

**PostgreSQL DDL:**
```
sql

CREATE TABLE messages (    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),    session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,    sender VARCHAR(50) NOT NULL CHECK (sender IN ('user', 'assistant')),    content TEXT NOT NULL,    embedding vector(1536), -- For pgvector similarity search    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());CREATE INDEX idx_messages_session_id ON messages(session_id);
```
**Mapping & Rationale:**-   
`sender`: A `CHECK` constraint is used to ensure this field can only be 'user' or 'assistant'.-   
`embedding`: A `vector(1536)` column is included to store text embeddings for future semantic search capabilities. This requires the `pgvector` extension.

## Full Migration Script
The full, executable migration script can be found at `../migrations/001_initial_schema.sql`.
