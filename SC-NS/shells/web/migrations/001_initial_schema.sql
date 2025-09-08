-- Migration: 001_initial_schema.sql
-- Description: Sets up the initial database schema for users, chat sessions, and messages.
-- This schema is designed for PostgreSQL with the pgvector extension.

-- Enable the pgvector extension for vector similarity search.
-- This should be run by a superuser on the database.
CREATE EXTENSION IF NOT EXISTS vector;

-- Table: users
-- Stores user information, synced from Clerk.
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    external_id VARCHAR(255) UNIQUE NOT NULL, -- Clerk User ID
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index on external_id for efficient lookups
CREATE INDEX idx_users_external_id ON users(external_id);

-- Table: chat_sessions
-- Stores individual chat sessions belonging to a user.
CREATE TABLE chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index on user_id for efficient retrieval of a user's sessions
CREATE INDEX idx_chat_sessions_user_id ON chat_sessions(user_id);

-- Table: messages
-- Stores messages for each chat session.
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
    sender VARCHAR(50) NOT NULL CHECK (sender IN ('user', 'assistant')),
    content TEXT NOT NULL,
    embedding vector(1536), -- For pgvector similarity search
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index on session_id for efficient retrieval of messages in a session
CREATE INDEX idx_messages_session_id ON messages(session_id);

-- Optional: Add an index for vector similarity search.
-- Using IVFFlat for a balance of build time and search speed.
-- The number of lists is a parameter to tune; sqrt(number of rows) is a common starting point.
-- CREATE INDEX idx_messages_embedding ON messages USING ivfflat (embedding vector_l2_ops) WITH (lists = 100);
-- Or using HNSW for higher recall and faster build times, available in newer pgvector versions.
-- CREATE INDEX idx_messages_embedding ON messages USING hnsw (embedding vector_l2_ops);
