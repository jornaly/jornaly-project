import { Link } from "react-router";
import { pages } from "@/lib/sidebarItems";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 bg-gray-200 border border-gray-300 mb-2 z-20">
        <div className="container mx-auto">
          <Link to={"/"} className="hover:underline">
            Jornaly
          </Link>
        </div>
      </header>
      <main className="flex-grow p-2 mb-5 overflow-y-auto">{children}</main>
      <footer className="h-[150px] bg-gray-200 border border-gray-300 z-20">
        <div className="container mx-auto flex justify-center items-center h-full gap-5">
          {pages.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className="flex flex-col items-center p-2 rounded-md hover:bg-white hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              <img src={item.img} width={"50px"} height={"50px"} />
              <p>{item.title}</p>
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
