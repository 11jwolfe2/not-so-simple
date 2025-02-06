import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex justify-center space-x-6">
          <li>
            <Link href="/" className="text-gray-800 hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link href="#about" className="text-gray-800 hover:text-blue-600">
              About
            </Link>
          </li>
          <li>
            <Link href="#websites" className="text-gray-800 hover:text-blue-600">
              Websites
            </Link>
          </li>
          <li>
            <Link href="#invest" className="text-gray-800 hover:text-blue-600">
              Invest
            </Link>
          </li>
          <li>
            <Link href="#skills" className="text-gray-800 hover:text-blue-600">
              Skills
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

