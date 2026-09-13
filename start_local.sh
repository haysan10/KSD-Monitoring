#!/bin/bash
# ============================================================
# KSD MONITOR - LOCAL LAUNCHER SCRIPT (macOS / Linux)
# ============================================================

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

PORT=8090

# Cek apakah port 8090 sudah digunakan
PID=$(lsof -ti :$PORT)
if [ ! -z "$PID" ]; then
    echo "⚠️  Port $PORT sudah berjalan oleh proses PID: $PID"
    echo "🌐 Aplikasi KSD Monitor aktif di: http://127.0.0.1:$PORT"
    echo "🔑 Admin Dashboard di: http://127.0.0.1:$PORT/_/"
    exit 0
fi

echo "🚀 Menjalankan KSD Monitor PocketBase server pada port $PORT..."
nohup ./pocketbase serve --http="127.0.0.1:$PORT" > "$DIR/pocketbase.log" 2>&1 &
NEW_PID=$!

sleep 2

if ps -p $NEW_PID > /dev/null; then
    echo "✅ KSD Monitor berhasil dijalankan! (PID: $NEW_PID)"
    echo "--------------------------------------------------------"
    echo "🌐 Web App URL        : http://127.0.0.1:$PORT"
    echo "📊 Admin Dashboard    : http://127.0.0.1:$PORT/_/"
    echo "📜 File Log           : $DIR/pocketbase.log"
    echo "--------------------------------------------------------"
    echo "Untuk mematikan server, jalankan: ./stop_local.sh"
else
    echo "❌ Gagal menjalankan server. Periksa file $DIR/pocketbase.log"
fi
