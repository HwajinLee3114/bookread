import Link from "next/link";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";

const Header: React.FC = () => {
  const { isLoggedIn, userInfo } = useAuthStore();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("loginUserInfo");
    alert("로그아웃되었습니다");
    router.push("/login");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  return (
    <header className="flex_js_between">
      <div className="logo ver_align">
        <Link href="/">
          <Image
            src="/img/logo.png"
            alt="로고"
            width={85}
            height={15}
            objectFit="contain"
          />
        </Link>
      </div>
      {/* <nav className="nav ver_align">
        <ul>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contract">Contact</Link>
          </li>
        </ul>
      </nav> */}
      {isLoggedIn ? (
        <div className="g_flex gap_10">
          <p>{userInfo?.nickname}</p>
          <Image
            src="/img/sample.jpg"
            alt="로고"
            width={40}
            height={40}
            style={{ borderRadius: "50%" }}
            layout="cover"
            onClick={() => router.push("/book")}
          />
          <button className="g_btn" onClick={() => handleLogout()}>
            로그아웃
          </button>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </header>
  );
};

export default Header;
