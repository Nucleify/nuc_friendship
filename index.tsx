'use client'

import React, { useEffect } from 'react'

import {
  AdIcon,
  AdPopover,
  friendshipRequests,
  isMobile,
  NucFriendshipPopover,
  PositionType,
} from 'nucleify'

import './_index.scss'

interface NucFriendshipProps {
  position: PositionType
  variant?: 'default' | 'sidebar'
}

export const NucFriendship: React.FC<NucFriendshipProps> = ({
  position,
  variant = 'default',
}) => {
  const { loading, getAllFriendships } = friendshipRequests('next')

  useEffect(() => {
    getAllFriendships(true)
  }, [])

  if (loading) return null

  return (
    <AdPopover
      dismissable
      icon={variant === 'sidebar' ? undefined : 'prime:users'}
      position={position}
      popoverClass="friendship-popover"
      buttonText={
        variant === 'sidebar' ? undefined : isMobile() ? '' : 'Friends'
      }
      buttonClass="friendship-popover-toggle"
      renderTrigger={
        variant === 'sidebar'
          ? (toggle) => (
              <button
                type="button"
                className="nuc-sidebar-link"
                onClick={toggle}
              >
                <AdIcon icon="prime:users" size="1.25em" />
                <span>Friends</span>
              </button>
            )
          : undefined
      }
    >
      <NucFriendshipPopover />
    </AdPopover>
  )
}
