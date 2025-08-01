import Navbar from "../components/Navbar"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  // console.log("in main layout");
  
  return (

    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">{children}</main>
    </>
  )
}

export default MainLayout