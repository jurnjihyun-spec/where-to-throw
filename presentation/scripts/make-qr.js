// 프로덕트 시연 링크 QR 코드를 빌드 전에 생성 (외부 API 사용 안 함)
import QRCode from 'qrcode';
import { writeFileSync } from 'node:fs';
const url = 'https://jurnjihyun-spec.github.io/where-to-throw/';
const svg = await QRCode.toString(url, { type: 'svg', margin: 1, color: { dark: '#16263d', light: '#ffffff' } });
writeFileSync(new URL('../public/qr-product.svg', import.meta.url), svg);
console.log('QR generated for', url);
