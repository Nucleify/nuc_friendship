import type {
  FriendshipPopoverResults,
  NucFriendshipObjectInterface,
} from 'nucleify'

export function readFriendshipPopoverResults(
  results: FriendshipPopoverResults
): NucFriendshipObjectInterface[] {
  if (Array.isArray(results)) return results
  return results.value ?? []
}
