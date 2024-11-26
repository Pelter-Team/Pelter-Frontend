import { Button } from "antd"
import Link from "next/link"

export default function Custom404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl px-8 text-center">
        <div className="animate-bounce mb-8">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            Oops! Page not found
          </h2>

          <p className="text-gray-600 text-lg max-w-md mx-auto">
            The page youre looking for doesnt exist or has been moved.
          </p>

          <div className="flex justify-center gap-4">
            <Link href="/">
              <Button
                type="primary"
                size="large"
                className="shadow-md hover:scale-105 transition-all duration-300"
              >
                Back to Home
              </Button>
            </Link>
            <Button
              size="large"
              onClick={() => window.history.back()}
              className="shadow-md hover:scale-105 transition-all duration-300"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
