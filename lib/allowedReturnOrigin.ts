// Only ever redirect a customer back to an allow-listed merchant origin after payment — closes
// off this hosted pay page being usable as an open redirect once a charge succeeds.
export function isAllowedReturnUrl(url: string): boolean {
  const allowed = (process.env.ALLOWED_RETURN_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  try {
    const origin = new URL(url).origin;
    return allowed.includes(origin);
  } catch {
    return false;
  }
}
