#!/bin/bash
# ============================================================
# KSD MONITOR - STOP SCRIPT (macOS / Linux)
# ============================================================

PORT=8090
PID=$(lsof -ti :$PORT)

if [ -z "$PID" ]; then
    echo "ℹ️  Tidak ada server KSD Monitor yang berjalan pada port $PORT."
else
    echo "🛑 Menghentikan server KSD Monitor (PID: $PID)..."
    kill -9 $PID
    echo "✅ Server berhasil dihentikan."
fi
