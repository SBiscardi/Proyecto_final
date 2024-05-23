import useUser from "../../lib/services/useUser";
import CircularProgress from '@mui/material/CircularProgress';

const UserInfo = () => {
  const user = useUser()

  return (
    <section className="p-6">
      <div className="flex flex-col items-center gap-4 text-center">
        {user ? (
          <>
            {user.photo && <img
              alt="Avatar"
              className="rounded-full"
              height="120"
              src="https://picsum.photos/120/120"
              style={{
                aspectRatio: "120/120",
                objectFit: "cover",
              }}
              width="120"
            />}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-300">{user.username}</h2>
              <p className="text-base text-gray-400">{user.email}</p>
            </div>
          </>
        ) : (
          <CircularProgress
            size={64}
            sx={{
              margin: "auto"
            }}
          />
        )}
      </div>
    </section>
  )
}

export default UserInfo;