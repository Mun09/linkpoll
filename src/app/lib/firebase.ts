import * as admin from "firebase-admin";

// 에뮬레이터 사용 여부를 환경 변수로 제어
const useEmulator = process.env.NODE_ENV === "development";

if (!admin.apps.length) {
  // 에뮬레이터 환경인지 확인
  if (useEmulator) {
    admin.initializeApp({ projectId: "linkpoll-8e6e3" }); // Firebase 프로젝트 ID 대체 가능
  } else {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT!;
    const serviceAccount = JSON.parse(serviceAccountString);
    serviceAccount.private_key = serviceAccount.private_key.replace(
      /\\n/g,
      "\n"
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}

const adminDb = admin.firestore();

if (!admin.apps.length && process.env.FIRESTORE_EMULATOR_HOST) {
  adminDb.settings({
    host: process.env.FIRESTORE_EMULATOR_HOST,
    ssl: false,
  });
}

export { adminDb };
