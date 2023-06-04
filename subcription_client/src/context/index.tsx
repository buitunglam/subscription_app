import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface User {
  data: {
    user: {
      id: string;
      email: string;
      stripeCustomerId: string;
    };
  } | null;
  error: string | null;
  loading: boolean;
}

const UserContext = createContext<[User, Dispatch<SetStateAction<User>>]>([
  {
    data: null,
    loading: true,
    error: null,
  },
  () => {},
]);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>({
    data: null,
    loading: true,
    error: null,
  });

  const token = localStorage.getItem("token");

  if (token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  const fetchUser = async () => {
    try {
      const { data: response } = await axios.get(
        "http://localhost:8080/auth/me"
      );
      if (response.data && response.data.user) {
        console.log("data....", response);
        setUser({
          data: {
            user: {
              id: response.data.user.id,
              email: response.data.user.email,
              stripeCustomerId: response.data.user.stripeCustomerId,
            },
          },
          loading: false,
          error: null,
        });
      } else {
        if (response.data && response.data.errors.length) {
          setUser({
            data: null,
            loading: false,
            error: response.data.errors[0].message,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setUser({
        data: null,
        loading: false,
        error: null,
      });
    }
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
