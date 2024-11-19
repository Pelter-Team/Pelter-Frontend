// import React, { useState } from "react"

// const TagMenu = () => {
//   const [selectedTag, setSelectedTag] = useState("all")

//   const handleTagClick = (tag: string) => {
//     setSelectedTag(tag)
//   }

//   return (
//     <div className="flex gap-4 p-4">
//       <button
//         className={`px-4 py-2 rounded-full ${
//           selectedTag === "all"
//             ? "bg-blue-500 text-white"
//             : "bg-gray-200 hover:bg-gray-300"
//         }`}
//         onClick={() => handleTagClick("all")}
//       >
//         All
//       </button>
//       <button
//         className={`px-4 py-2 rounded-full ${
//           selectedTag === "dogs"
//             ? "bg-blue-500 text-white"
//             : "bg-gray-200 hover:bg-gray-300"
//         }`}
//         onClick={() => handleTagClick("dogs")}
//       >
//         Dogs
//       </button>
//       <button
//         className={`px-4 py-2 rounded-full ${
//           selectedTag === "cats"
//             ? "bg-blue-500 text-white"
//             : "bg-gray-200 hover:bg-gray-300"
//         }`}
//         onClick={() => handleTagClick("cats")}
//       >
//         Cats
//       </button>
//     </div>
//   )
// }

// // export default TagMenu
// import React from "react"

// const Tag = ({ selectedTag, onTagSelect, counts }) => {
//   const tags = [
//     { id: "all", label: "All" },
//     { id: "dogs", label: "Dogs" },
//     { id: "cats", label: "Cats" },
//   ]

//   return (
//     <div className="flex gap-4 items-center mb-6">
//       {tags.map((tag) => (
//         <button
//           key={tag.id}
//           onClick={() => onTagSelect(tag.id)}
//           className={`
//             px-4 py-2 rounded-full transition-all duration-200
//             ${
//               selectedTag === tag.id
//                 ? "bg-rose-500 text-white shadow-md"
//                 : "bg-gray-100 hover:bg-gray-200 text-gray-700"
//             }
//             flex items-center gap-2
//           `}
//         >
//           <span>{tag.label}</span>
//           {counts && (
//             <span
//               className={`
//               text-sm px-2 py-0.5 rounded-full
//               ${selectedTag === tag.id ? "bg-rose-400" : "bg-gray-200"}
//             `}
//             >
//               {counts[tag.id]}
//             </span>
//           )}
//         </button>
//       ))}
//     </div>
//   )
// }

// export default Tag
import React from "react"

interface TagProps {
  selectedTag: string
  onTagSelect: (tag: string) => void
  counts: Record<string, number>
}
interface TagCounts {
  [key: string]: number
  all: number
  dogs: number
  cats: number
}
const Tag: React.FC<TagProps> = ({ selectedTag, onTagSelect, counts }) => {
  const calculateCounts = (): TagCounts => {
    return {
      all: counts?.all || 0,
      dogs: counts?.dogs || 0,
      cats: counts?.cats || 0,
    }
  }

  const tags = [
    { id: "all", label: "All Pets" },
    { id: "dogs", label: "Dogs" },
    { id: "cats", label: "Cats" },
  ]

  const tagCounts = calculateCounts()

  return (
    <div className="flex gap-4 items-center mb-6">
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onTagSelect(tag.id)}
          className={`
            px-4 py-2 rounded-full transition-all duration-200
            ${
              selectedTag === tag.id
                ? "bg-[#B95F5F] text-white shadow-md"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }
            flex items-center gap-2
          `}
        >
          <span>{tag.label}</span>
          <span
            className={`
              text-sm px-2 py-0.5 rounded-full
              ${selectedTag === tag.id ? "bg-[#D88484]" : "bg-gray-200"}
            `}
          >
            {tagCounts[tag.id]}
          </span>
        </button>
      ))}
    </div>
  )
}

export default Tag
