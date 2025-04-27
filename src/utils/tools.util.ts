/**
 * Generates a UUIDv7 string according to the IETF draft specification.
 * UUIDv7 uses a timestamp and random bytes for uniqueness and ordering.
 * @returns {string} A valid UUIDv7 string
 */
export function generateUUID(): string {
  const now = Date.now();
  const unixMillis = BigInt(now);
  const timeHex = unixMillis.toString(16).padStart(12, '0');

  // Generate 10 random bytes (80 bits)
  const randBytes = new Uint8Array(10);
  crypto.getRandomValues(randBytes);

  // Timestamp fields
  const timeLow = timeHex.slice(0, 8);
  const timeMid = timeHex.slice(8, 12);

  // Version and variant fields
  const timeHighAndVersion = (parseInt(randBytes[0].toString(16).padStart(2, '0'), 16) & 0x0fff | 0x7000).toString(16).padStart(4, '0');
  const clockSeqHiAndReserved = (randBytes[1] & 0x3f | 0x80).toString(16).padStart(2, '0');
  const clockSeqLow = randBytes[2].toString(16).padStart(2, '0');

  // Node field (6 bytes)
  const node = Array.from(randBytes.slice(3, 9)).map(b => b.toString(16).padStart(2, '0')).join('');

  return [
    timeLow,
    timeMid,
    timeHighAndVersion,
    clockSeqHiAndReserved + clockSeqLow,
    node
  ].join('-');
}


