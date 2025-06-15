#!/bin/bash

echo "🔥 Firebase Emulator Starting..."

# 에뮬레이터 실행
firebase emulators:start --only firestore,auth
