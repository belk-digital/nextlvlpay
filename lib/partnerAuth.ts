// Shared-secret auth for server-to-server calls between HelixBio and nextlvlpay, in both
// directions. Same "Bearer <secret>" convention HelixBio already uses for its own internal
// cron endpoints (see CRON_SECRET in that repo).
export function isAuthorizedPartnerRequest(req: Request): boolean {
  const authHeader = req.headers.get('authorization');
  const secret = process.env.NEXTLVLPAY_API_SECRET;
  return !!secret && authHeader === `Bearer ${secret}`;
}
