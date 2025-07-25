import HomeButton from "@/components/HomeButton"
import AuthCheck from "@/components/AuthCheck"
import "@/app/globals.css"

export default async function Page({ params }) {
  // 1. Dynamically load the correct interactive post
  const { slug } = await params
  const getInteractivePost = () => {
    try {
      // this require path works, but I am not sure why and if it's the best way to do this
      // also unsure how the .default export works here
      return require(`../../posts/interactive/${slug}.js`).default
    } catch (error) {
      console.error("Failed to load post:", error)
      return null
    }
  }

  // 2. Get the component for the current slug
  const InteractiveComponent = getInteractivePost()

  // 3. Handle case where component doesn't exist
  if (!InteractiveComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">post not found</h1>
      </div>
    )
  }

  // 4. render the post with a consistent layout
  return (
    <AuthCheck>
      <main className="min-h-screen max-w-6xl mx-auto p-4 flex flex-col">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-sm mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <HomeButton></HomeButton>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-1 text-foreground md:ml-2">
                  {slug.replace("-", " ")}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <div>
          <h1 className="text-primary text-center italic">
            this page is a work in progress; this is a preview of the content.
            i’ll email you when it's complete!
          </h1>
        </div>
        {/* Interactive Component */}
        <div
          className=" border-2 border-[#706A50]/60 rounded-lg p-6 my-4
      flex-1 flex flex-col items-center justify-center shadow-[_0_3px_4px_#000000]"
        >
          <InteractiveComponent />
        </div>

        <div>
          {/* <h1 className="text-4xl text-foreground font-bold">amrita's lists</h1> */}
          <p className="text-gray-400 text-right italic p-4">
            last updated: july 21, 2025
          </p>
        </div>
      </main>
    </AuthCheck>
  )
}
