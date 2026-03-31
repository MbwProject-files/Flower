#!/bin/bash

echo "🔄 Initializing Flower Shop Database..."

# Run the schema SQL file
PGPASSWORD=postgres psql -U postgres -d Flower_Shop -f /app/database/schema.sql

if [ $? -eq 0 ]; then
    echo "✅ Database initialized successfully!"
else
    echo "❌ Database initialization failed!"
    exit 1
fi
