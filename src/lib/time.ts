/**
 * Pure function to format a timestamp into a concise relative time string.
 * Returns: "just now" | "{X}m ago" | "{X}h ago" | "{X}d ago"
 */
export function formatRelativeTime(timestamp: number, now: number = Date.now()): string {
  const diff = Math.max(0, now - timestamp);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) {
    return 'just now';
  }
  if (hours < 1) {
    return `${minutes}m ago`;
  }
  if (days < 1) {
    return `${hours}h ago`;
  }
  return `${days}d ago`;
}
