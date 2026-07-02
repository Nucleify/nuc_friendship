'use client'

import React, { useState } from 'react'

import {
  AdButton,
  AdInputText,
  friendshipRequests,
  useAddFriend,
  userRequests,
} from 'nucleify'

import './_index.scss'

export const NucFriendshipAddFriend: React.FC = () => {
  const friendship = friendshipRequests('next')
  const users = userRequests(undefined, 'next')

  const [searchEmail, setSearchEmail] = useState('')

  const { handleAddFriend: handleAddFriendFn } = useAddFriend({
    searchEmail,
    friendship,
    users,
  })

  async function handleAddFriend() {
    await handleAddFriendFn()
    setSearchEmail('')
  }

  return (
    <div className="add-friend">
      <div className="add-friend-input">
        <AdInputText
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          placeholder="User email"
          nuiType="main"
          className="search-input"
          onKeyUp={(e) => e.key === 'Enter' && handleAddFriend()}
        />
        <AdButton
          label="Invite"
          icon="prime:user-plus"
          nuiType="main"
          className="invite-button"
          loading={friendship.loading}
          onClick={handleAddFriend}
        />
      </div>
    </div>
  )
}
