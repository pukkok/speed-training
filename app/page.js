import Link from "next/link";

export default function Home() {
  const linkData = [
    {name : '폴더트리', href : '/folder-tree'}
  ]


  return (
    <div className="bg-[#111] flex w-full h-screen items-center justify-center">
      {linkData.map(item => (
        <Link 
          key={item.name}
          className={`text-gray-200`}
          href={item.href}>{item.name}
        </Link>
      ))}
    </div>
  )
}
