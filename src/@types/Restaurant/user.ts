export type SessionInfo = {
  accessToken: string
  user: {
    id: string
    name: string
    username: string
    restaurantId: string
    isOwner: boolean
    createdAt: Date
  }
}
