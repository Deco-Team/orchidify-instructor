import useAuth from '~/auth/useAuth'

export default function Logout() {
  const { logout } = useAuth()

  const handleClick = () => {
    logout()
  }

  return <button onClick={handleClick}>Logout</button>
}
