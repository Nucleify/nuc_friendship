'use client'

import React from 'react'

import {
  AdButton,
  AdParagraph,
  NucFriendItem,
  type NucFriendshipObjectInterface,
} from 'nucleify'

import './_index.scss'

interface NucFriendshipRequestsListProps {
  requests: NucFriendshipObjectInterface[]
  onAccept: (senderId: number) => void
  onDeny: (senderId: number) => void
}

export const NucFriendshipRequestsList: React.FC<
  NucFriendshipRequestsListProps
> = ({ requests, onAccept, onDeny }) => {
  return (
    <div className="requests-list">
      {requests.length === 0 && (
        <div className="empty-state">
          <AdParagraph text="No requests found" />
        </div>
      )}
      {requests.map((friendship) => (
        <NucFriendItem
          key={friendship.id}
          friendship={friendship}
          actions={({ friendId }) => (
            <>
              <AdButton
                icon="prime:check"
                text
                rounded
                nuiType="main"
                onClick={() => onAccept(friendId)}
              />
              <AdButton
                icon="prime:times"
                text
                rounded
                severity="danger"
                onClick={() => onDeny(friendId)}
              />
            </>
          )}
        />
      ))}
    </div>
  )
}
