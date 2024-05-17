'use client'
import { User } from 'next-auth';
import UserItem from 'useritem';
export interface UserProfileProps {
  user: User
}
export const UserProfile = (props: UserProfileProps) => {
  const { user } = props
  const {name, email, image} = user
  return (
    <UserItem
      title={name}
      description={email}
      avatarUrl={image}
      width={ window.innerWidth } 
      onClick={(e:any) => console.log("User item clicked!", e)}
    />
  )
}