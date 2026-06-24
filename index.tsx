'use client'

import React, { useEffect } from 'react'

import {
  AdPopover,
  friendshipRequests,
  isMobile,
  NucFriendshipPopover,
  PositionType,
} from 'nucleify'

import './_index.scss'

interface NucFriendshipProps {
  position: PositionType
}

export const NucFriendship: React.FC<NucFriendshipProps> = ({ position }) => {
  const { loading, getAllFriendships } = friendshipRequests('next')

  useEffect(() => {
    getAllFriendships(true)
  }, [])

  if (loading) return null

  return (
    <AdPopover
      dismissable
      icon="prime:users"
      position={position}
      popoverClass="friendship-popover"
      buttonText={isMobile() ? '' : 'Friends'}
      buttonClass="friendship-popover-toggle"
    >
      <NucFriendshipPopover />
    </AdPopover>
  )
}
