export interface NucFriendshipObjectInterface {
  id: number
  friend: {
    id: number | string
    name: string
    email: string
    role: string
  }
  /** Zaproszenie przychodzące (recipient = ja); wyłączone z zakładki Requests jeśli false. */
  incoming?: boolean
  status: 'pending' | 'accepted' | 'denied' | 'blocked'
  created_at: string
  updated_at: string
}
